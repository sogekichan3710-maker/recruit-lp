"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowDown, CalendarCheck } from "lucide-react";
import GoldButton from "./GoldButton";
import { HERO, SITE } from "@/lib/site-config";
import { useApplyModal } from "./ApplyModalProvider";

export default function Hero() {
  const { openModal } = useApplyModal();
  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-ink">
      {/* 背景動画（実店舗PV） */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-70"
        src={HERO.videoSrc}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />
      {/* 可読性のための最小限のオーバーレイ（下部のみ） */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
      <div className="absolute inset-0 bg-ink/10" />

      <div className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-44 sm:pb-40 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[11px] sm:text-xs tracking-widest2 text-gold-bright uppercase mb-5"
        >
          {HERO.eyebrow}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="font-display text-3xl sm:text-5xl md:text-6xl font-semibold leading-[1.4] sm:leading-[1.35] text-ivory drop-shadow-[0_2px_20px_rgba(0,0,0,0.6)]"
        >
          {HERO.titleLines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-5 max-w-md text-sm sm:text-base text-ivory/80 leading-relaxed"
        >
          {HERO.subCopy}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-9 flex w-full max-w-sm flex-col gap-3.5 sm:max-w-none sm:flex-row sm:justify-center"
        >
          <GoldButton href={SITE.lineUrl} icon={MessageCircle} className="w-full sm:w-auto">
            LINEで応募する
          </GoldButton>
          <GoldButton
            onClick={openModal}
            variant="outline"
            icon={CalendarCheck}
            className="w-full sm:w-auto"
          >
            面接・体験予約
          </GoldButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 6, 0] }}
        transition={{ opacity: { delay: 1.2, duration: 0.6 }, y: { repeat: Infinity, duration: 2 } }}
        className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-gold/70"
      >
        <ArrowDown size={20} strokeWidth={1.5} />
      </motion.div>
    </section>
  );
}
