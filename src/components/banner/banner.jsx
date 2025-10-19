"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

import b1 from "../../assets/banner/b1.jpg";
import b2 from "../../assets/banner/b2.jpg";
import b3 from "../../assets/banner/b3.jpg";

const images = [b1, b2, b3];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowBubbles(true);

      setTimeout(() => {
        setShowBubbles(false);
        setIndex((prev) => (prev + 1) % images.length);
      }, 1000);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] lg:h-[500px] xl:h-[650px] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 w-full h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 5 }}
        >
          {/* Background Image */}
          <Image
            src={images[index]}
            alt={`banner-${index}`}
            fill
            className="object-cover"
            priority
          />

          {/* Bubble Effect */}
          {showBubbles && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 md:w-4 md:h-4 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    bottom: "0%",
                  }}
                  initial={{ opacity: 1, y: 0 }}
                  animate={{
                    y: -Math.random() * 300 - 100,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 1.5,
                    delay: Math.random() * 0.5,
                    ease: "easeOut",
                  }}
                />
              ))}
            </div>
          )}

          {/* Optional Text Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center z-10 px-4">
            <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold">
              Welcome to Our Website
            </h1>
            <p className="text-white/80 mt-2 sm:text-lg md:text-xl">
              Discover our latest collection
            </p>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Learn More
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
