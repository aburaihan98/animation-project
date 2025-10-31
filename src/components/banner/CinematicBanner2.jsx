"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

import b1 from "../../assets/banner/b1.jpg";
import b2 from "../../assets/banner/b2.jpg";
import b3 from "../../assets/banner/b3.jpg";

const banners = [
  { img: b1, title: "Innovation in Technology" },
  { img: b2, title: "Building the Future" },
  { img: b3, title: "Excellence in Design" },
];

export default function TeamBDBanner2() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Grid tiles positions - centered
  const tiles = [
    { row: 1, col: 2, size: "medium" },
    { row: 1, col: 4, size: "small" },
    { row: 1, col: 5, size: "medium" },
    { row: 2, col: 1, size: "small" },
    { row: 2, col: 3, size: "medium" },
    { row: 2, col: 5, size: "small" },
    { row: 2, col: 6, size: "medium" },
    { row: 3, col: 2, size: "medium" },
    { row: 3, col: 4, size: "small" },
    { row: 3, col: 5, size: "small" },
  ];

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-900">
      {/* Animated circular tech background */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20">
        <motion.div
          className="absolute w-96 h-96 border-4 border-teal-400/30 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute w-[500px] h-[500px] border-2 border-teal-500/20 rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-4 bg-teal-400/40 top-0 left-1/2"
              style={{
                transform: `rotate(${i * 30}deg) translateY(-250px)`,
                transformOrigin: "0 250px",
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* Animated grid tiles - centered */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full max-w-5xl h-full grid grid-cols-6 grid-rows-4 gap-4 p-8">
          <AnimatePresence mode="wait">
            {tiles.map((tile, idx) => (
              <motion.div
                key={`${currentIndex}-${idx}`}
                className={`relative rounded-lg overflow-hidden shadow-2xl ${
                  tile.size === "medium"
                    ? "col-span-2 row-span-2"
                    : "col-span-1 row-span-1"
                }`}
                style={{
                  gridColumn: tile.col,
                  gridRow: tile.row,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.8,
                  delay: idx * 0.1,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={banners[currentIndex].img}
                  alt={banners[currentIndex].title}
                  fill
                  className="object-cover"
                  style={{
                    objectPosition: `${(idx * 20) % 100}% ${(idx * 30) % 100}%`,
                  }}
                />
                <div className="absolute inset-0 bg-teal-600/20 mix-blend-overlay" />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Text overlay - left side */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ duration: 0.8 }}
        className="absolute left-8 top-1/2 -translate-y-1/2 z-20 max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-1 bg-red-500" />
            <span className="text-white/80 text-sm tracking-widest">
              {String(currentIndex + 1).padStart(2, "0")} /{" "}
              {String(banners.length).padStart(2, "0")}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
            {banners[currentIndex].title}
          </h1>
        </div>
      </motion.div>

      {/* Navigation dots - right side */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-4 z-20">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className="group relative"
          >
            <div
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                idx === currentIndex
                  ? "bg-red-500 scale-125"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
            {idx === currentIndex && (
              <motion.div
                className="absolute inset-0 border-2 border-red-500 rounded-full"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Decorative text on left edge */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 -rotate-90 origin-left">
        <div className="text-white/20 text-xs tracking-[0.3em] font-light whitespace-nowrap">
          INNOVATION • TECHNOLOGY • EXCELLENCE
        </div>
      </div>
    </div>
  );
}
