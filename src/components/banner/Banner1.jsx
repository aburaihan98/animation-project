"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";

import b1 from "../../assets/banner/b1.jpg";
import b2 from "../../assets/banner/b2.jpg";
import b3 from "../../assets/banner/b3.jpg";

const images = [b1, b2, b3];

export default function Banner1() {
  return (
    <div className="w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[500px] xl:h-[650px] overflow-hidden relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 2000 }}
        pagination={{ clickable: true }}
        speed={2000}
        loop
        className="w-full h-full"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <motion.div
              className="relative w-full h-full overflow-hidden"
              initial={{ scale: 1 }}
              animate={{ scale: 1 }}
            >
              <Image
                src={img}
                alt={`banner-${index}`}
                fill
                className="object-cover"
                priority
              />

              {/* Bubble Animation */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 md:w-4 md:h-4 bg-white/10 absolute"
                    animate={{ y: [0, -100], opacity: [1, 0] }}
                    transition={{
                      duration: 2,
                      delay: Math.random() * 2,
                      repeat: Infinity,
                    }}
                    style={{
                      left: `${Math.random() * 100}%`,
                      bottom: "0%",
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
