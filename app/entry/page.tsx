import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ApplyForm from "@/components/ApplyForm";

export const metadata: Metadata = {
  title: "面接・体験のご予約｜THE VIRGO FUKUOKA / REGINA",
  description:
    "THE VIRGO FUKUOKA / REGINAの面接・体験入店予約フォームです。希望職種（キャスト／スタッフ）を選択のうえ、必要事項をご入力ください。",
};

export default function EntryPage() {
  return (
    <main className="flex min-h-[100svh] w-full flex-col items-center bg-ink px-6 pb-32 pt-10 sm:pb-24 sm:pt-14">
      <div className="w-full max-w-lg">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-muted hover:text-ivory"
        >
          <ArrowLeft size={14} strokeWidth={1.75} />
          ホームへ戻る
        </Link>
      </div>
      <ApplyForm />
    </main>
  );
}
