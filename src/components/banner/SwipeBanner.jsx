"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

import b1 from "../../assets/banner/b1.jpg";
import b2 from "../../assets/banner/b2.jpg";
import b3 from "../../assets/banner/b3.jpg";

const images = [b1, b2, b3];

const banners = [
  {
    img: images[0],
    title: "Welcome to Our Brand",
    subtitle: "We create digital magic.",
    cta: "Get Started",
  },
  {
    img: images[1],
    title: "Innovation Meets Creativity",
    subtitle: "Turning your ideas into reality.",
    cta: "Learn More",
  },
  {
    img: images[2],
    title: "Your Vision, Our Design",
    subtitle: "Design that inspires and performs.",
    cta: "Explore Now",
  },
];

export default function SwipeBanner() {
  const [index, setIndex] = useState(0);
  const [showPieces, setShowPieces] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bgX = useTransform(mouseX, [0, 1], [-20, 20]);
  const bgY = useTransform(mouseY, [0, 1], [-20, 20]);
  const textX = useTransform(mouseX, [0, 1], [-10, 10]);
  const textY = useTransform(mouseY, [0, 1], [-10, 10]);

  const pieces = Array.from({ length: 9 });

  // Auto slide
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

  // Drag/swipe handler
  const handleDragEnd = (event, info) => {
    const offset = info.offset.x;
    if (offset < -50) {
      setShowPieces(true);
      setTimeout(() => {
        setShowPieces(false);
        setIndex((prev) => (prev + 1) % banners.length);
      }, 300);
    } else if (offset > 50) {
      setShowPieces(true);
      setTimeout(() => {
        setShowPieces(false);
        setIndex((prev) => (prev - 1 + banners.length) % banners.length);
      }, 300);
    }
  };

  return (
    <motion.div
      className="relative w-full h-[250px] sm:h-[350px] md:h-[500px] overflow-hidden cursor-grab"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
      }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      {/* Background */}
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${banners[index].img.src})`,
            x: bgX,
            y: bgY,
          }}
          initial={{ opacity: 0, scale: 1 }}
          animate={{ opacity: 1, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {showPieces && (
            <div className="absolute inset-0 grid grid-cols-3 grid-rows-3">
              {pieces.map((_, i) => {
                const randomX = (Math.random() - 0.5) * 400;
                const randomY = (Math.random() - 0.5) * 400;
                const randomRotate = Math.random() * 120 - 60;
                return (
                  <motion.div
                    key={i}
                    className="w-full h-full"
                    style={{
                      backgroundImage: `url(${banners[index].img.src})`,
                      backgroundSize: "300% 300%",
                      backgroundPosition: `${(i % 3) * 50}% ${
                        Math.floor(i / 3) * 50
                      }%`,
                    }}
                    initial={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: 0 }}
                    animate={{
                      opacity: 0,
                      scale: 0.6,
                      x: randomX,
                      y: randomY,
                      rotate: randomRotate,
                    }}
                    transition={{
                      duration: 1.2,
                      delay: (i % 3) * 0.1 + Math.floor(i / 3) * 0.1,
                      ease: "easeOut",
                    }}
                  />
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Text + CTA */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4 z-20"
        style={{ x: textX, y: textY }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            className="space-y-4 sm:space-y-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-2xl sm:text-3xl md:text-5xl font-bold drop-shadow-2xl"
            >
              {banners[index].title}
            </motion.h1>

            <motion.p
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg opacity-90"
            >
              {banners[index].subtitle}
            </motion.p>

            <motion.button
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.3)",
              }}
              className="mt-2 sm:mt-4 px-6 py-2 bg-white text-black font-semibold rounded-lg transition"
            >
              {banners[index].cta}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-2 pb-2 z-30">
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 pointer-events-none" />
    </motion.div>
  );
}
