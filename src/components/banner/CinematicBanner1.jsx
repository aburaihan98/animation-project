"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import b1 from "../../assets/banner/b1.jpg";
import b2 from "../../assets/banner/b2.jpg";
import b3 from "../../assets/banner/b3.jpg";

const banners = [
  {
    img: b1,
    title: "Welcome to Our Brand",
    subtitle: "We create digital magic.",
    cta: "Get Started",
  },
  {
    img: b2,
    title: "Innovation Meets Creativity",
    subtitle: "Turning your ideas into reality.",
    cta: "Learn More",
  },
  {
    img: b3,
    title: "Your Vision, Our Design",
    subtitle: "Design that inspires and performs.",
    cta: "Explore Now",
  },
];

export default function CinematicBanner1() {
  const [index, setIndex] = useState(0);
  const [showPieces, setShowPieces] = useState(false);

  const rows = 2;
  const cols = 5;
  const pieces = Array.from({ length: rows * cols }, (_, i) => i);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowPieces(true);
      setTimeout(() => {
        setShowPieces(false);
        setIndex((prev) => (prev + 1) % banners.length);
      }, 1300);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const getPieceOrder = (i) => {
    const row = Math.floor(i / cols);
    const col = i % cols;
    const centerRow = (rows - 1) / 2;
    const centerCol = (cols - 1) / 2;
    return Math.hypot(row - centerRow, col - centerCol);
  };

  const nextIndex = (index + 1) % banners.length;

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden">
      {/* Current image normal */}
      {!showPieces && (
        <Image
          src={banners[index].img}
          alt={banners[index].title}
          fill
          className="object-cover absolute inset-0 z-0"
          priority
        />
      )}

      {/* Exploding pieces */}
      {showPieces && (
        <>
          {/* Next image background */}
          <Image
            src={banners[nextIndex].img}
            alt={banners[nextIndex].title}
            fill
            className="object-cover absolute inset-0 z-0"
            priority
          />
          {/* Pieces of current image - zoom out to back */}
          <div
            className="absolute inset-0 grid z-10"
            style={{
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gridTemplateRows: `repeat(${rows}, 1fr)`,
              gap: "4px",
            }}
          >
            {pieces
              .map((piece) => ({ piece, order: getPieceOrder(piece) }))
              .sort((a, b) => a.order - b.order)
              .map(({ piece }, i) => {
                const row = Math.floor(piece / cols);
                const col = piece % cols;
                const delay = i * 0.05;

                return (
                  <motion.div
                    key={piece}
                    className="relative w-full h-full overflow-hidden"
                    initial={{ opacity: 1, scale: 1, z: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 0.3,
                      z: -1000,
                    }}
                    transition={{ duration: 1, delay, ease: "easeInOut" }}
                    style={{
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <Image
                      src={banners[index].img}
                      alt={`${banners[index].title}-${piece}`}
                      fill
                      style={{
                        objectFit: "cover",
                        objectPosition: `${(col / (cols - 1)) * 100}% ${
                          (row / (rows - 1)) * 100
                        }%`,
                      }}
                    />
                  </motion.div>
                );
              })}
          </div>
        </>
      )}

      {/* Text Overlay */}
      <motion.div
        key={index}
        initial={{ y: -50, opacity: 0 }}
        animate={
          showPieces
            ? {
                y: 50,
                opacity: 0,
                transition: { duration: 1, ease: "easeInOut" },
              }
            : {
                y: 0,
                opacity: 1,
                transition: { duration: 0.8, ease: "easeOut" },
              }
        }
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20 space-y-4 sm:space-y-5"
      >
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-2xl">
          {banners[index].title}
        </h1>
        <p className="text-sm sm:text-base md:text-lg opacity-90">
          {banners[index].subtitle}
        </p>
        <button className="mt-2 sm:mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition">
          {banners[index].cta}
        </button>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-2 z-20">
        {banners.map((_, i) => (
          <div
            key={i}
            className="w-10 h-[3px] bg-white/30 overflow-hidden rounded-full"
          >
            {i === index && (
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
}
