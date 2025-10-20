"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock data for demo
const banners = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop",
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=500&fit=crop",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&h=500&fit=crop",
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=500&fit=crop",
  },
];

const GridBanner2 = () => {
  const [index, setIndex] = useState(0);
  const [showPieces, setShowPieces] = useState(false);
  const [nextIndex, setNextIndex] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate next index first
      const next = (index + 1) % banners.length;
      setNextIndex(next);

      // Show explosion
      setShowPieces(true);

      // After explosion completes, switch to next image
      setTimeout(() => {
        setShowPieces(false);
        setIndex(next);
      }, 1300);
    }, 4000);

    return () => clearInterval(interval);
  }, [index]);

  const pieces = Array.from({ length: 9 }, (_, i) => i);

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden">
      {/* Background Layer - Next Image (shows during explosion) */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${banners[nextIndex].image})`,
        }}
      />

      {/* Foreground Layer - Current Image with Explosion Effect */}
      <AnimatePresence mode="wait">
        {!showPieces && (
          <motion.div
            key={index}
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${banners[index].image})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </AnimatePresence>

      {/* Explosion Pieces */}
      {showPieces && (
        <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 z-10">
          {pieces.map((piece, i) => {
            const randomX = (Math.random() - 0.5) * 500;
            const randomY = (Math.random() - 0.5) * 500;
            const randomRotate = Math.random() * 180 - 90;

            return (
              <motion.div
                key={i}
                className="w-full h-full"
                style={{
                  backgroundImage: `url(${banners[index].image})`,
                  backgroundSize: "300% 300%",
                  backgroundPosition: `${(i % 3) * 50}% ${
                    Math.floor(i / 3) * 50
                  }%`,
                }}
                initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                animate={{
                  opacity: 0,
                  scale: 0.5,
                  x: randomX,
                  y: randomY,
                  rotate: randomRotate,
                }}
                transition={{
                  duration: 1.2,
                  delay: (i % 3) * 0.08 + Math.floor(i / 3) * 0.08,
                  ease: "easeOut",
                }}
              />
            );
          })}
        </div>
      )}

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-4 z-30">
        {banners.map((_, i) => (
          <div
            key={i}
            className="w-10 h-[3px] bg-white/30 overflow-hidden rounded-full"
          >
            {i === index && !showPieces && (
              <motion.div
                className="h-full bg-white"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 3.7, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GridBanner2;
