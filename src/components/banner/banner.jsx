"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const images = ["/banner1.jpg", "/banner2.jpg", "/banner3.jpg"];

export default function Banner() {
  const [index, setIndex] = useState(0);
  const [showBubbles, setShowBubbles] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setShowBubbles(true);

      // বাবল ১ সেকেন্ড পরে fade out হবে
      setTimeout(() => {
        setShowBubbles(false);
        setIndex((prev) => (prev + 1) % images.length);
      }, 1000);
    }, 3000); // মোট ৩ সেকেন্ডে একটার পর একটা ছবি

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <AnimatePresence>
        <motion.div
          key={index}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[index]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* Bubble Effect */}
          {showBubbles && (
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(25)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-4 h-4 bg-white/20 rounded-none"
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
