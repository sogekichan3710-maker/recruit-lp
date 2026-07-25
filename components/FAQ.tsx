"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { FAQS } from "@/lib/site-config";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative bg-surface px-6 py-20 sm:py-28">
      <SectionHeading eyebrow="FAQ" title="よくある質問" />

      <div className="mx-auto mt-12 max-w-2xl divide-y divide-hairline">
        {FAQS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="py-1">
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="flex items-baseline gap-3">
                  <span className="font-display text-gold/70 text-sm">Q</span>
                  <span className="text-sm sm:text-base text-ivory leading-relaxed">
                    {item.q}
                  </span>
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 text-gold"
                >
                  <Plus size={18} strokeWidth={1.5} />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="flex gap-3 pb-5 pl-1 text-xs sm:text-sm leading-relaxed text-muted">
                      <span className="font-display text-gold-bright/70 text-sm shrink-0">
                        A
                      </span>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
