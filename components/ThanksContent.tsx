"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, MapPin, MessageCircle, ExternalLink, Copy, Check } from "lucide-react";
import { ApplyFormData, STORE_LABEL, STAFF_STORE_LABEL } from "@/lib/apply-types";
import { buildCancelMessage, formatJaDate, THANKS_STORAGE_KEY } from "@/lib/apply-format";
import { SITE, INTERVIEW_VENUE } from "@/lib/site-config";

// /entry からの送信直後はsessionStorageに直前の送信内容が入っているため、それを使って
// 「◯◯様、面接お待ちしております」のような個別化した完了表示にする。
// LINEやブックマークから/thanksへ直接アクセスした場合（sessionStorageが空）は、
// 個別の氏名・日時を前提としない一般的な完了メッセージのみを表示する。
export default function ThanksContent() {
  const [data, setData] = useState<ApplyFormData | null>(null);
  const [copied, setCopied] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(THANKS_STORAGE_KEY);
      if (raw) setData(JSON.parse(raw) as ApplyFormData);
    } catch {
      // sessionStorageが読めない・壊れている場合は一般的な完了表示にフォールバックする
    }
    setLoaded(true);
  }, []);

  const cancelMessage = buildCancelMessage(data);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cancelMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // クリップボードAPIが使えない環境では、下の文面表示から手動でコピーしてもらう
    }
  };

  // sessionStorageの読み取りが終わるまで、内容の出し分けが確定しないため何も表示しない
  if (!loaded) return null;

  const storeLabel = data?.jobType === "staff" ? STAFF_STORE_LABEL : STORE_LABEL;

  return (
    <div className="w-full max-w-lg rounded-3xl border border-hairline bg-surface px-6 py-8 shadow-card sm:px-8">
      <div className="mb-5 flex items-center gap-3 text-gold">
        <CheckCircle2 size={26} strokeWidth={1.5} />
        <p className="font-display text-lg sm:text-xl font-semibold text-ivory">予約完了です。</p>
      </div>

      <p className="text-sm text-ivory/90 leading-relaxed">
        {data?.name ? `${data.name} 様、` : ""}
        面接お待ちしております。
      </p>

      {data && (
        <p className="mt-2 text-xs text-muted leading-relaxed">
          {storeLabel[data.preferredStore]} ／ {formatJaDate(data.interviewDate)} {data.interviewTime}〜
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-hairline bg-ink p-4">
        <p className="mb-2 flex items-center gap-2 text-xs tracking-widest2 text-gold uppercase">
          <MapPin size={14} strokeWidth={1.75} />
          面接場所
        </p>
        <p className="text-sm text-ivory">{INTERVIEW_VENUE.name}</p>
        <p className="mt-1 text-xs text-muted leading-relaxed">{INTERVIEW_VENUE.address}</p>
        <p className="mt-1 text-xs text-muted">{INTERVIEW_VENUE.hours}</p>

        <div className="mt-3 overflow-hidden rounded-xl border border-hairline">
          <iframe
            title="面接会場マップ"
            src={INTERVIEW_VENUE.mapEmbedSrc}
            className="h-44 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <a
          href={INTERVIEW_VENUE.mapLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold hover:text-gold-bright"
        >
          Googleマップで開く
          <ExternalLink size={12} strokeWidth={1.75} />
        </a>
      </div>

      {data && (
        <div className="mt-6 rounded-2xl border border-hairline bg-ink p-4">
          <p className="mb-2 text-xs tracking-widest2 text-gold uppercase">面接をキャンセルする場合</p>
          <p className="mb-3 text-xs text-muted leading-relaxed">
            公式LINEに、下記の文面を送ってご連絡ください。
          </p>
          <pre className="whitespace-pre-wrap rounded-lg bg-surface2 p-3 font-sans text-xs text-ivory/90">
            {cancelMessage}
          </pre>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button
              onClick={handleCopy}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-gold/40 px-4 py-2.5 text-xs text-ivory/80 transition-colors hover:border-gold hover:text-ivory"
            >
              {copied ? <Check size={14} strokeWidth={1.75} /> : <Copy size={14} strokeWidth={1.75} />}
              {copied ? "コピーしました" : "文面をコピー"}
            </button>
            <a
              href={SITE.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-gradient-to-b from-gold-bright to-gold px-4 py-2.5 text-xs font-medium text-ink"
            >
              <MessageCircle size={14} strokeWidth={1.75} />
              LINEを開く
            </a>
          </div>
        </div>
      )}

      <Link
        href="/"
        className="mt-6 block w-full text-center text-xs text-muted underline underline-offset-2 hover:text-ivory"
      >
        ホームへ戻る
      </Link>
    </div>
  );
}
