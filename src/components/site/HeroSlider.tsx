"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

const slides = [
  {
    title: "Empowering Women in Agric-Food Systems",
    subtitle: "Training, market access, and enterprise support for sustainable livelihoods.",
    image: "/slides/slide-1.jpg",
  },
  {
    title: "Youth Innovation & Skills",
    subtitle: "Modern agribusiness skills, climate-smart practices, and digital inclusion.",
    image: "/slides/slide-2.jpg",
  },
  {
    title: "Resilient Communities",
    subtitle: "Inclusive value chains that strengthen food security and local economies.",
    image: "/slides/slide-3.jpg",
  },
];

export function HeroSlider() {
  return (
    <section className="relative overflow-hidden">
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        loop
        className="h-[520px]"
      >
        {slides.map((s) => (
          <SwiperSlide key={s.title}>
            <div
              className="h-[520px] bg-cover bg-center"
              style={{ backgroundImage: `url(${s.image})` }}
            >
              <div className="h-full bg-black/40">
                <div className="mx-auto flex h-full max-w-6xl items-center px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl"
                  >
                    <div className="inline-flex rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                      Tereto • Women & Youths in Agric-Food Systems
                    </div>
                    <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">
                      {s.title}
                    </h1>
                    <p className="mt-4 text-base text-white/85 md:text-lg">
                      {s.subtitle}
                    </p>

                    <div className="mt-7 flex gap-3">
                      <a
                        href="/interventions"
                        className="rounded-xl bg-tereto-green px-5 py-3 text-sm font-semibold text-white hover:opacity-90"
                      >
                        Explore Interventions
                      </a>
                      <a
                        href="/contact"
                        className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90"
                      >
                        Partner With Us
                      </a>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
