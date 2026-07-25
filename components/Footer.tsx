import { SITE } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-hairline bg-ink px-6 pb-44 pt-10 text-center sm:pb-28">
      <p className="font-display text-sm tracking-widest2 text-gold/80">
        {SITE.brandName}
      </p>
      <p className="mt-3 text-[11px] text-muted">
        © {new Date().getFullYear()} {SITE.brandName}. All Rights Reserved.
      </p>
      <a
        href={SITE.officialSiteUrl}
        className="mt-2 inline-block text-[11px] text-muted underline underline-offset-2 hover:text-gold"
      >
        公式サイトはこちら
      </a>
      <div className="mt-4">
        <a
          href={SITE.lineUrl}
          className="inline-block text-[11px] text-muted underline underline-offset-2 hover:text-gold"
        >
          面接予約のキャンセル・お問い合わせは公式LINEへ
        </a>
      </div>
    </footer>
  );
}
