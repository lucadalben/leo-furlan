"use client";

import { useState, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Artwork } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import ArtworkModal from "./ArtworkModal";
import Footer from "./Footer";

type SortMode = "manual" | "recent" | "oldest";

const SORT_OPTIONS: { key: SortMode; label: string }[] = [
  { key: "manual", label: "Manuale" },
  { key: "recent", label: "Più recenti" },
  { key: "oldest", label: "Più vecchie" },
];

export default function WorksGallery({ artworks }: { artworks: Artwork[] }) {
  const [selected, setSelected] = useState<Artwork | null>(null);
  const [sortMode, setSortMode] = useState<SortMode>("manual");

  const sorted = useMemo(() => {
    const arr = [...artworks];
    if (sortMode === "recent") return arr.sort((a, b) => b.year - a.year);
    if (sortMode === "oldest") return arr.sort((a, b) => a.year - b.year);
    return arr;
  }, [artworks, sortMode]);

  return (
    <>
      <div className="works-container">
        <div className="sort-bar">
          {SORT_OPTIONS.map(({ key, label }) => (
            <button
              key={key}
              className={`sort-btn${sortMode === key ? " sort-btn--active" : ""}`}
              onClick={() => setSortMode(key)}
            >
              {label}
            </button>
          ))}
        </div>

        {artworks.length === 0 ? (
          <div style={{ padding: "20vh 5vw", fontFamily: "monospace" }}>
            Nessuna opera trovata — aggiungile da{" "}
            <a href="/studio" style={{ textDecoration: "underline" }}>
              /studio
            </a>
            .
          </div>
        ) : (
          sorted.map((artwork) => (
            <div className="box" key={artwork._id}>
              <button
                className="box-link"
                onClick={() => setSelected(artwork)}
                aria-label={`Visualizza ${artwork.title}`}
              >
                <div className={`img-wrap ${artwork.sizeClass}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(artwork.coverImage).width(1200).url()}
                    alt={artwork.title}
                    loading="lazy"
                  />
                </div>
                <span className="box-title">{artwork.title}</span>
              </button>
            </div>
          ))
        )}

        <div style={{ padding: "200px 20px 20px 20px" }}>
          <Footer />
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ArtworkModal
            artwork={selected}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
