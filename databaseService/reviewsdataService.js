const fs = require("fs/promises");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");
const { loadEnvConfig } = require("@next/env");

const TABLE_NAME = "review";
const BATCH_SIZE = 500;

loadEnvConfig(process.cwd());

async function populateReviews(filePath = path.join(__dirname, "review.json")) {
  console.log(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL environment variable.");
  }

  if (!supabaseKey) {
    throw new Error(
      "Set SUPABASE_SERVICE_ROLE_KEY or SUPABASE_ANON_KEY in the environment.",
    );
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log(`[reviews] Reading JSON file: ${filePath}`);

  let reviews;
  try {
    reviews = JSON.parse(await fs.readFile(filePath, "utf8"));
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error(`Invalid JSON in ${filePath}: ${error.message}`);
    }

    throw error;
  }

  if (!Array.isArray(reviews)) {
    throw new Error("Invalid JSON structure: expected an array of reviews.");
  }

  const invalidReviewIndex = reviews.findIndex(
    (review) =>
      !review ||
      typeof review !== "object" ||
      Array.isArray(review) ||
      typeof review.reviewSlug !== "string" ||
      review.reviewSlug.trim() === "",
  );

  if (invalidReviewIndex !== -1) {
    throw new Error(
      `Invalid review at index ${invalidReviewIndex}: each review must have a non-empty reviewSlug.`,
    );
  }

  const slugs = reviews.map((review) => review.reviewSlug);
  if (new Set(slugs).size !== slugs.length) {
    throw new Error("Invalid review data: reviewSlug values must be unique.");
  }

  if (reviews.length === 0) {
    console.log("[reviews] No reviews found. Nothing to import.");
    return { success: true, inserted: 0, total: 0 };
  }

  let inserted = 0;
  for (let i = 0; i < reviews.length; i += BATCH_SIZE) {
    const batch = reviews.slice(i, i + BATCH_SIZE);
    console.log(
      `[reviews] Inserting rows ${i + 1}-${i + batch.length} of ${reviews.length}...`,
    );

    const { error } = await supabase.from(TABLE_NAME).insert(batch);
    if (error) {
      throw new Error(
        `Supabase insert failed for rows ${i + 1}-${i + batch.length}: ${error.message}`,
      );
    }

    inserted += batch.length;
  }

  console.log(`[reviews] Import complete. ${inserted} reviews inserted.`);
  return { success: true, inserted, total: reviews.length };
}

async function main() {
  try {
    const filePath = process.argv[2]
      ? path.resolve(process.argv[2])
      : undefined;
    const result = await populateReviews(filePath);
    console.log("Import result:", result);
  } catch (error) {
    console.error("[reviews] Import failed:", error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { populateReviews };
