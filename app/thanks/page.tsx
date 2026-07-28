import type { Metadata } from "next";
import ThanksView from "@/components/ThanksView";

export const metadata: Metadata = {
  title: "予約完了｜THE VIRGO FUKUOKA / REGINA",
  description: "面接・体験入店のご予約を受け付けました。",
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main className="min-h-[100svh] bg-ink px-6 pb-44 pt-10 sm:pb-24 sm:pt-14">
      <div className="mx-auto w-full max-w-lg">
        <div className="rounded-3xl border border-hairline bg-surface px-6 py-8 sm:px-8 sm:shadow-card">
          <ThanksView />
        </div>
      </div>
    </main>
  );
}
