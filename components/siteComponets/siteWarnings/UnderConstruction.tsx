import Link from "next/link";
import { FaTools } from "react-icons/fa";

/**
 * UnderConstruction
 * -----------------
 * Generic placeholder page for routes that aren't built yet.
 */

interface UnderConstructionProps {
  title?: string;
  message?: string;
  homeHref?: string;
}

const ACCENT = "#fb226b";

export default function UnderConstruction({
  title = "Page Under Construction",
  message = "We're working hard to bring you this page. Please check back soon.",
  homeHref = "/",
}: UnderConstructionProps) {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-[#0c0714]">
      <div className="text-center max-w-md">
        <div
          className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "rgba(251,34,107,0.12)" }}
        >
          <FaTools className="w-6 h-6" style={{ color: ACCENT }} />
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          {title}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-white/60">{message}</p>

        <Link
          href={homeHref}
          className="inline-block mt-6 rounded-xl px-6 py-3 text-sm font-semibold text-white transition-colors"
          style={{ backgroundColor: ACCENT }}
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
