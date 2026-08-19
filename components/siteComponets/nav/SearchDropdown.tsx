"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { IoSearch, IoGameController } from "react-icons/io5";

/**
 * SearchDropdown
 * --------------
 * Reusable search input that shows a filtered dropdown of matching
 * games as the user types. Each result links to /games/[game-slug].
 */

interface Game {
  slug: string;
  name: string;
}

// Mock data — replace with real games list or wire up to an API call
const MOCK_GAMES: Game[] = [
  { slug: "sweet-bonanza-1000", name: "Sweet Bonanza 1000" },
  { slug: "gates-of-olympus", name: "Gates of Olympus" },
  { slug: "out-of-the-woods", name: "Out of the Woods" },
  { slug: "wanted-dead-or-a-wild", name: "Wanted Dead or a Wild" },
  { slug: "big-bass-bonanza", name: "Big Bass Bonanza" },
  { slug: "starlight-princess", name: "Starlight Princess" },
  { slug: "book-of-dead", name: "Book of Dead" },
];

interface SearchDropdownProps {
  games?: Game[];
  placeholder?: string;
  maxResults?: number;
  className?: string;
}

export default function SearchDropdown({
  games = MOCK_GAMES,
  placeholder = "Search slots, providers...",
  maxResults = 6,
  className = "",
}: SearchDropdownProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const results = query.trim()
    ? games
        .filter((game) =>
          game.name.toLowerCase().includes(query.trim().toLowerCase())
        )
        .slice(0, maxResults)
    : [];

  return (
    <div ref={ref} className={`relative w-full ${className}`}>
      <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5">
        <IoSearch className="w-4 h-4 text-white/40 shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="bg-transparent text-sm text-white placeholder-white/40 outline-none w-full"
        />
      </div>

      {isOpen && query.trim() && (
        <ul className="absolute z-30 mt-2 w-full max-h-72 overflow-y-auto rounded-xl border border-white/10 bg-[#150b1e] shadow-xl">
          {results.length > 0 ? (
            results.map((game) => (
              <li key={game.slug}>
                <Link
                  href={`/games/${game.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 hover:bg-white/10 transition-colors"
                >
                  <span className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 shrink-0">
                    <IoGameController className="w-4 h-4 text-white/60" />
                  </span>
                  <span className="text-sm text-white truncate">
                    {game.name}
                  </span>
                </Link>
              </li>
            ))
          ) : (
            <li className="px-3 py-3 text-sm text-white/40">
              No games found for &quot;{query}&quot;
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
