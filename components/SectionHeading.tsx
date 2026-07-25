"use client";

import { motion } from "framer-motion";

type Props = {
  eyebrow: string;
  title: string;
  desc?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  desc,
  align = "center",
}: Props) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <p className="text-[11px] sm:text-xs tracking-widest2 text-gold uppercase mb-3">
        {eyebrow}
      </p>
      {/* シグネチャー要素：店内の間接照明（コーブライニング）を象った金のラインが
          スクロールに合わせて左右に広がる */}
      <motion.div
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: align === "center" ? 64 : 48, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className={`h-[2px] bg-gold-line mb-5 ${
          align === "center" ? "mx-auto" : ""
        }`}
      />
      <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-ivory">
        {title}
      </h2>
      {desc && (
        <p className="mt-4 text-sm sm:text-base text-muted max-w-xl mx-auto leading-relaxed">
          {desc}
        </p>
      )}
    </div>
  );
}
