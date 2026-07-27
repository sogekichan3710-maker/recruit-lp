"use client";

import { motion } from "framer-motion";
import {
  TrendingUp,
  Users,
  Car,
  ShieldCheck,
  GraduationCap,
  Award,
  LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { WHY_US } from "@/lib/site-config";

const ICONS: Record<string, LucideIcon> = {
  TrendingUp,
  Users,
  Car,
  ShieldCheck,
  GraduationCap,
  Award,
};

export default function WhyUs() {
  return (
    <section className="relative bg-ink px-6 py-20 sm:py-28">
      <SectionHeading
        eyebrow="Why Us"
        title="選ばれる理由"
        desc="高還元・働きやすさ・教育体制。ヴァルゴが選ばれる理由があります。"
      />

      <div className="mx-auto mt-14 grid max-w-5xl grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-5">
        {WHY_US.map((item, i) => {
          const Icon = ICONS[item.icon];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              whileHover={{ y: -4 }}
              className="group rounded-2xl border border-hairline bg-surface/60 p-5 sm:p-6 text-left transition-colors duration-300 hover:border-gold/40 hover:bg-surface2"
            >
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  <Icon size={18} strokeWidth={1.5} />
                </div>
                <span className="font-display text-[10px] sm:text-xs tracking-wide text-gold-bright uppercase">
                  {item.rank}
                </span>
              </div>
              <h3 className="font-display text-[15px] sm:text-lg font-semibold text-ivory leading-snug">
                {item.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
