"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Artwork } from "@/lib/sanity/queries";
import { urlFor } from "@/lib/sanity/image";

interface Props {
  artwork: Artwork;
  onClose: () => void;
}

export default function ArtworkModal({ artwork, onClose }: Props) {
  const [slideIndex, setSlideIndex] = useState(0);

  const allImages = [artwork.coverImage, ...(artwork.detailImages ?? [])];
  const hasSlideshow = allImages.length > 1;

  const goNext = useCallback(
    () => setSlideIndex((i) => (i + 1) % allImages.length),
    [allImages.length]
  );

  const goPrev = useCallback(
    () => setSlideIndex((i) => (i - 1 + allImages.length) % allImages.length),
    [allImages.length]
  );

  // Blocca lo scroll della pagina sottostante mentre il modal è aperto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Tastiera: ESC chiude, frecce cambiano slide
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  const currentImageUrl = urlFor(allImages[slideIndex]).width(2400).url();

  const label = [
    `"${artwork.title}"`,
    artwork.technique,
    artwork.dimensions,
    artwork.year,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <motion.div
      className="artwork-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      {/* Contenitore immagine: swipe touch + animazione cambio slide */}
      <motion.div
        drag={hasSlideshow ? "x" : false}
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.12}
        onDragEnd={(_, info) => {
          if (info.offset.x < -60) goNext();
          if (info.offset.x > 60) goPrev();
        }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100vw",
          height: "97vh",
          cursor: hasSlideshow ? "grab" : "default",
          touchAction: "pan-y",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={slideIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={currentImageUrl}
              alt={artwork.title}
              fill
              style={{ objectFit: "contain" }}
              priority
              sizes="100vw"
              draggable={false}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <p onClick={(e) => e.stopPropagation()}>{label}</p>

      <button className="artwork-close" onClick={onClose} aria-label="Chiudi">
        ✕
      </button>

      {hasSlideshow && (
        <div className="slide-buttons" onClick={(e) => e.stopPropagation()}>
          <button className="prev" onClick={goPrev} aria-label="Precedente">
            &#10094;
          </button>
          <button className="next" onClick={goNext} aria-label="Successiva">
            &#10095;
          </button>
        </div>
      )}
    </motion.div>
  );
}
