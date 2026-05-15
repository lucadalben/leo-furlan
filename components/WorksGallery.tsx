"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Artwork } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";
import ArtworkModal from "./ArtworkModal";
import Footer from "./Footer";

export default function WorksGallery({ artworks }: { artworks: Artwork[] }) {
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
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={urlFor(artwork.coverImage).width(1200).url()}
                  alt={artwork.title}
                  className={artwork.sizeClass}
                  loading="lazy"
                />
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
