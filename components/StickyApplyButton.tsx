"use client";

import { MessageCircle } from "lucide-react";
import { SITE, STICKY_WAGE } from "@/lib/site-config";

export default function StickyApplyButton() {
  return (
    <>
      {/* モバイル：下部固定の全幅バー（時給訴求 + LINE応募） */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-gradient-to-b from-surface2/95 via-ink/95 to-ink/95 backdrop-blur-md sm:hidden">
        {/* 体入時給訴求バナー */}
        <div className="relative overflow-hidden border-b border-hairline px-4 pt-2.5 pb-2 text-center">
          <div className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-70" />
          <p className="text-[10px] leading-none text-ivory/70">
            {STICKY_WAGE.note}
          </p>
          <div className="mt-1.5 flex items-center justify-center gap-2">
            <span className="inline-flex items-center rounded-full border border-gold/50 bg-gold/10 px-2.5 py-0.5 text-[10px] font-medium tracking-wide text-gold-bright">
              {STICKY_WAGE.label}
            </span>
            <span className="font-display text-[26px] font-bold leading-none tracking-wide text-gold-bright drop-shadow-[0_0_14px_rgba(232,199,126,0.45)]">
              {STICKY_WAGE.amount}
              <span className="ml-0.5 text-sm font-medium">{STICKY_WAGE.unit}</span>
            </span>
          </div>
        </div>

        <div className="px-4 py-3">
          <a
            href={SITE.lineUrl}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-bright to-gold px-6 py-3.5 text-sm font-medium text-ink shadow-gold active:scale-[0.98]"
          >
            <MessageCircle size={17} strokeWidth={1.75} />
            LINEで応募する
          </a>
        </div>
      </div>

      {/* PC・タブレット：下部固定の横長バー（時給訴求 + LINE応募） */}
      <div className="fixed inset-x-0 bottom-0 z-50 hidden border-t border-hairline bg-gradient-to-b from-surface2/95 via-ink/95 to-ink/95 backdrop-blur-md sm:block">
        <div className="absolute inset-x-0 top-0 h-px bg-gold-line opacity-70" />
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-4 px-6 py-3.5 sm:justify-between lg:gap-6 lg:px-10 lg:py-4">
          <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
            <span className="inline-flex items-center whitespace-nowrap rounded-full border border-gold/50 bg-gold/10 px-3 py-1 text-xs font-medium tracking-wide text-gold-bright">
              {STICKY_WAGE.label}
            </span>
            <span className="whitespace-nowrap font-display text-2xl font-bold leading-none tracking-wide text-gold-bright drop-shadow-[0_0_14px_rgba(232,199,126,0.45)] lg:text-3xl">
              {STICKY_WAGE.amount}
              <span className="ml-1 text-sm font-medium lg:text-base">{STICKY_WAGE.unit}</span>
            </span>
            <span className="hidden whitespace-nowrap text-xs text-ivory/60 lg:inline">
              {STICKY_WAGE.note}
            </span>
          </div>

          <a
            href={SITE.lineUrl}
            className="flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-b from-gold-bright to-gold px-6 py-3 text-sm font-medium text-ink shadow-gold transition-transform hover:scale-105 lg:px-7 lg:py-3.5"
          >
            <MessageCircle size={17} strokeWidth={1.75} />
            LINEで応募する
          </a>
        </div>
      </div>
    </>
  );
}
