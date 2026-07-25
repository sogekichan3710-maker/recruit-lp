"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { PV } from "@/lib/site-config";

export default function PVSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (playing) {
      v.pause();
    } else {
      v.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  return (
    <section className="relative bg-ink px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="Movie" title={PV.title} desc={PV.desc} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto mt-12 max-w-3xl overflow-hidden rounded-2xl border border-hairline shadow-card"
      >
        <video
          ref={videoRef}
          className="aspect-video w-full bg-surface object-cover"
          src={PV.videoSrc}
          poster={PV.poster}
          muted={muted}
          playsInline
          loop
          onClick={togglePlay}
        />

        <button
          onClick={togglePlay}
          aria-label={playing ? "動画を一時停止" : "動画を再生"}
          className="absolute inset-0 flex items-center justify-center bg-ink/0 transition-colors hover:bg-ink/10"
        >
          {!playing && (
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/60 bg-ink/50 text-gold backdrop-blur-sm">
              <Play size={26} strokeWidth={1.5} className="ml-1" />
            </span>
          )}
        </button>

        <div className="absolute bottom-3 right-3 flex gap-2">
          <button
            onClick={togglePlay}
            aria-label={playing ? "一時停止" : "再生"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-ivory backdrop-blur-sm"
          >
            {playing ? (
              <Pause size={15} strokeWidth={1.5} />
            ) : (
              <Play size={15} strokeWidth={1.5} />
            )}
          </button>
          <button
            onClick={toggleMute}
            aria-label={muted ? "ミュート解除" : "ミュート"}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-ink/60 text-ivory backdrop-blur-sm"
          >
            {muted ? (
              <VolumeX size={15} strokeWidth={1.5} />
            ) : (
              <Volume2 size={15} strokeWidth={1.5} />
            )}
          </button>
        </div>
      </motion.div>
    </section>
  );
}
