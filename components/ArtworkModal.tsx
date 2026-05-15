"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  const [zoom, setZoom] = useState(1);
  const zoomRef = useRef(1);
  const pinchRef = useRef({ dist: 0, startZoom: 1 });
  const lastTapRef = useRef(0);

  const allImages = [artwork.coverImage, ...(artwork.detailImages ?? [])];
  const hasSlideshow = allImages.length > 1;

  function applyZoom(v: number) {
    const clamped = Math.min(4, Math.max(1, v));
    zoomRef.current = clamped;
    setZoom(clamped);
  }

  const goNext = useCallback(
    () => { setSlideIndex((i) => (i + 1) % allImages.length); applyZoom(1); },
    [allImages.length]
  );

  const goPrev = useCallback(
    () => { setSlideIndex((i) => (i - 1 + allImages.length) % allImages.length); applyZoom(1); },
    [allImages.length]
  );

  // Scroll lock
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Keyboard
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, goNext, goPrev]);

  // Preload all images when modal opens
  useEffect(() => {
    allImages.forEach((img) => {
      const image = new window.Image();
      image.src = urlFor(img).width(1800).url();
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Pinch-to-zoom touch handlers
  useEffect(() => {
    function dist(e: TouchEvent) {
      const [a, b] = [e.touches[0], e.touches[1]];
      return Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
    }
    function onTouchStart(e: TouchEvent) {
      if (e.touches.length === 2) {
        pinchRef.current = { dist: dist(e), startZoom: zoomRef.current };
      }
    }
    function onTouchMove(e: TouchEvent) {
      if (e.touches.length !== 2) return;
      e.preventDefault();
      applyZoom(pinchRef.current.startZoom * (dist(e) / pinchRef.current.dist));
    }
    window.addEventListener("touchstart", onTouchStart);
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  const currentImageUrl = urlFor(allImages[slideIndex]).width(1800).url();

  const label = [
    `"${artwork.title}"`,
    artwork.technique,
    artwork.dimensions,
    artwork.year,
  ]
    .filter(Boolean)
    .join(", ");

  function handleDoubleTap(e: React.MouseEvent) {
    e.stopPropagation();
    applyZoom(zoomRef.current > 1 ? 1 : 2);
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (e.changedTouches.length !== 1) return;
    const now = Date.now();
    if (now - lastTapRef.current < 300) {
      e.stopPropagation();
      applyZoom(zoomRef.current > 1 ? 1 : 2);
    }
    lastTapRef.current = now;
  }

  return (
    <motion.div
      className="artwork-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.div
        drag={hasSlideshow && zoom === 1 ? "x" : false}
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
          cursor: zoom > 1 ? "zoom-out" : hasSlideshow ? "grab" : "zoom-in",
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
            <div
              style={{
                width: "100%",
                height: "100%",
                transform: `scale(${zoom})`,
                transition: zoom === 1 ? "transform 0.25s ease" : "none",
                transformOrigin: "center center",
              }}
              onDoubleClick={handleDoubleTap}
              onTouchEnd={handleTouchEnd}
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
            </div>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <p onClick={(e) => e.stopPropagation()}>{label}</p>

      <button className="artwork-close" onClick={onClose} aria-label="Chiudi">
        ✕
      </button>

      {hasSlideshow && zoom === 1 && (
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
