"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import GoldButton from "./GoldButton";
import { SITE } from "@/lib/site-config";

export default function ApplySection() {
  return (
    <section className="relative overflow-hidden bg-ink px-6 py-24 sm:py-32 text-center">
      <div className="pointer-events-none absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gold-line" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-[11px] sm:text-xs tracking-widest2 text-gold uppercase mb-5"
      >
        Entry
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-2xl sm:text-4xl font-semibold leading-relaxed text-ivory"
      >
        まずは、体験入店から。
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mx-auto mt-4 max-w-md text-sm sm:text-base text-muted leading-relaxed"
      >
        百聞は一見にしかず。まずは実際の空気感を、その目で確かめてください。
        ご質問だけでも、お気軽にどうぞ。
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10"
      >
        <GoldButton
          href={SITE.lineUrl}
          icon={MessageCircle}
          className="px-10 py-4 text-base"
        >
          LINEで今すぐ相談する
        </GoldButton>
      </motion.div>
    </section>
  );
}
