import type { Metadata } from "next";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import EntryForm from "@/components/EntryForm";

export const metadata: Metadata = {
  title: "面接・体験のご予約｜THE VIRGO FUKUOKA / REGINA",
  description:
    "THE VIRGO FUKUOKA・REGINAの面接・体験入店予約フォームです。お名前・ご連絡先・ご希望日時をご入力ください。",
};

export default function EntryPage() {
  return (
    <main className="min-h-[100svh] bg-ink px-6 pb-44 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto w-full max-w-lg">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1 text-xs text-muted hover:text-ivory"
        >
          <ChevronLeft size={14} strokeWidth={1.75} />
          LPに戻る
        </Link>

        <div className="rounded-3xl border border-hairline bg-surface px-6 py-8 sm:px-8 sm:shadow-card">
          <EntryForm />
        </div>
      </div>
    </main>
  );
}
