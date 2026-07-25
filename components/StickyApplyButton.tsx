"use client";

import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site-config";

export default function StickyApplyButton() {
  return (
    <>
      {/* モバイル：下部固定の全幅バー */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-hairline bg-ink/85 px-4 py-3 backdrop-blur-md sm:hidden">
        <a
          href={SITE.lineUrl}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-bright to-gold px-6 py-3.5 text-sm font-medium text-ink shadow-gold active:scale-[0.98]"
        >
          <MessageCircle size={17} strokeWidth={1.75} />
          LINEで応募する
        </a>
      </div>

      {/* デスクトップ：右下フローティングボタン */}
      <div className="fixed bottom-6 right-6 z-50 hidden sm:block">
        <a
          href={SITE.lineUrl}
          className="flex items-center gap-2 rounded-full bg-gradient-to-b from-gold-bright to-gold px-6 py-3.5 text-sm font-medium text-ink shadow-gold transition-transform hover:scale-105"
        >
          <MessageCircle size={17} strokeWidth={1.75} />
          LINEで応募する
        </a>
      </div>
    </>
  );
}
