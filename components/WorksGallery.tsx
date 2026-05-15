"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Artwork } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import ArtworkModal from "./ArtworkModal";

export default function WorksGallery({ artworks, footer }: { artworks: Artwork[]; footer?: React.ReactNode }) {
  const [selected, setSelected] = useState<Artwork | null>(null);

  return (
    <>
      <div className="works-container">
        {artworks.length === 0 ? (
          <div style={{ padding: "20vh 5vw", fontFamily: "monospace" }}>
            Nessuna opera trovata — aggiungile da{" "}
            <a href="/studio" style={{ textDecoration: "underline" }}>
              /studio
            </a>
            .
          </div>
        ) : (
          artworks.map((artwork) => (
            <div className="box" key={artwork._id}>
              <button
                className="box-link"
                onClick={() => setSelected(artwork)}
                aria-label={`Visualizza ${artwork.title}`}
              >
                <div className={`img-wrap ${artwork.sizeClass}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(artwork.coverImage).width(800).auto("format").quality(80).url()}
                    alt={artwork.title}
                    loading="lazy"
                  />
                </div>
              </button>
            </div>
          ))
        )}

        <div style={{ padding: "200px 20px 20px 20px" }}>
          {footer}
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
