import type { Metadata } from "next";
import ThanksContent from "@/components/ThanksContent";

export const metadata: Metadata = {
  title: "ご応募ありがとうございます｜THE VIRGO FUKUOKA / REGINA",
  description: "面接・体験入店のご予約を受け付けました。",
};

export default function ThanksPage() {
  return (
    <main className="flex min-h-[100svh] w-full flex-col items-center bg-ink px-6 pb-32 pt-10 sm:pb-24 sm:pt-14">
      <ThanksContent />
    </main>
  );
}
