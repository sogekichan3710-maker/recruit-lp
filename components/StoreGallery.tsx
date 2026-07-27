"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { STORES } from "@/lib/site-config";

export default function StoreGallery() {
  return (
    <section className="relative bg-surface px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Our Stores"
        title="店舗紹介"
        desc="2つの空間、それぞれに異なる上質な世界観。"
      />

      <div className="mx-auto mt-14 flex max-w-6xl flex-col gap-16">
        {STORES.map((store, storeIdx) => (
          <motion.div
            key={store.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-5 flex items-baseline gap-3 px-1 sm:px-0">
              <span className="text-gold/60 font-display text-sm">
                {String(storeIdx + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-semibold text-ivory">
                {store.name}
              </h3>
              <span className="ml-auto hidden text-xs tracking-widest2 uppercase text-muted sm:inline">
                {store.tagline}
              </span>
            </div>
            <p className="mb-5 max-w-2xl px-1 text-sm text-muted leading-relaxed sm:px-0">
              {store.description}
            </p>

            {/* 横スクロール可能な写真ギャラリー */}
            <div className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-3.5 overflow-x-auto px-6 pb-2 sm:mx-0 sm:px-0">
              {store.images.map((img, i) => (
                <div
                  key={img.src}
                  className="relative aspect-[4/5] w-[72%] shrink-0 snap-start overflow-hidden rounded-2xl border border-hairline sm:w-[30%] sm:min-w-[280px]"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 72vw, 320px"
                    className="object-cover"
                    priority={storeIdx === 0 && i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
