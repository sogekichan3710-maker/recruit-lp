// ============================================================
// サイト全体の設定・コンテンツを一元管理するファイル
// 応募URL・画像・動画・コピー文言はすべてここを編集すれば反映されます
// ============================================================

export const SITE = {
  brandName: "THE VIRGO FUKUOKA / REGINA",
  // 公式LINE URL（応募・面接キャンセル・問い合わせ・固定ボタン、すべてここに統一）
  lineUrl: "https://lin.ee/tJNd5ae",
  telUrl: "tel:0000000000", // ★電話番号に差し替えてください
  officialSiteUrl: "#", // ★既存公式ホームページURLに差し替えてください
};

// 面接会場情報（現状THE VIRGO FUKUOKAの住所を案内先として使用）
export const INTERVIEW_VENUE = {
  name: "THE VIRGO FUKUOKA",
  address: "福岡県福岡市博多区中洲3-6-7 ギャラリー山本ビル2階",
  mapEmbedSrc:
    "https://www.google.com/maps?q=" +
    encodeURIComponent("福岡県福岡市博多区中洲3-6-7 ギャラリー山本ビル2階") +
    "&output=embed",
  mapLinkUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("福岡県福岡市博多区中洲3-6-7 ギャラリー山本ビル2階"),
  hours: "面接受付：月〜土 19:00〜20:00（日曜定休）",
};

// 下部固定CTA上部に表示する体入時給訴求（Sticky CTA専用）
export const STICKY_WAGE = {
  note: "未経験でも安心・高待遇でお迎えします",
  label: "体入時給",
  amount: "10,000",
  unit: "円以上",
};

export const HERO = {
  eyebrow: "FUKUOKA PREMIUM LOUNGE RECRUIT",
  titleLines: ["上質な空間で、", "新しい私に、出会う。"],
  subCopy:
    "THE VIRGO FUKUOKA / REGINA ─ 福岡随一のラグジュアリー空間で働く、特別な選択。",
  videoSrc: "/videos/hero-virgo.mp4", // ★背景動画（差し替え可）
};

export const WHY_US = [
  {
    icon: "Sparkles",
    title: "未経験、大歓迎",
    desc: "在籍の9割以上が未経験スタート。安心の研修体制があります。",
  },
  {
    icon: "TrendingUp",
    title: "業界トップクラスの高収入",
    desc: "頑張りがそのまま還元される、明瞭な高還元バック制度。",
  },
  {
    icon: "Car",
    title: "送迎あり",
    desc: "安全な帰り道も、当店がしっかりサポートします。",
  },
  {
    icon: "ShieldCheck",
    title: "ノルマ・罰金なし",
    desc: "余計なプレッシャーのない、健全な環境で働けます。",
  },
  {
    icon: "HeartHandshake",
    title: "サポート充実",
    desc: "スタッフが日々の悩みや不安に寄り添います。",
  },
  {
    icon: "CalendarCheck",
    title: "週1日〜自由出勤",
    desc: "学業やプライベートと両立できるシフト制。",
  },
] as const;

export type StoreImage = { src: string; alt: string };

export const STORES: {
  slug: string;
  name: string;
  enName: string;
  tagline: string;
  description: string;
  images: StoreImage[];
}[] = [
  {
    slug: "virgo",
    name: "THE VIRGO FUKUOKA",
    enName: "VIRGO",
    tagline: "モダン×ラグジュアリー",
    description:
      "黒を基調にした洗練された空間に、光のラインが浮かぶモダンラグジュアリーな社交場。",
    images: [
      { src: "/images/virgo-01.jpg", alt: "THE VIRGO FUKUOKA 店内 1" },
      { src: "/images/virgo-02.jpg", alt: "THE VIRGO FUKUOKA 店内 2" },
      { src: "/images/virgo-03.jpg", alt: "THE VIRGO FUKUOKA 店内 3" },
      { src: "/images/virgo-04.jpg", alt: "THE VIRGO FUKUOKA 店内 4" },
      { src: "/images/virgo-05.jpg", alt: "THE VIRGO FUKUOKA 店内 5" },
    ],
  },
  {
    slug: "regina",
    name: "REGINA",
    enName: "REGINA",
    tagline: "クラシック×気品",
    description:
      "シャンデリアが煌めく、赤と金が織りなすクラシカルで気品ある特別な空間。",
    images: [
      { src: "/images/regina-01.jpg", alt: "REGINA 店内 1" },
      { src: "/images/regina-02.jpg", alt: "REGINA 店内 2" },
      { src: "/images/regina-03.jpg", alt: "REGINA 店内 3" },
      { src: "/images/regina-04.jpg", alt: "REGINA 店内 4" },
    ],
  },
];

export const PV = {
  title: "店内の雰囲気を、動画で。",
  desc: "言葉より雄弁な、空間の空気感をご覧ください。",
  videoSrc: "/videos/pv-regina.mp4", // ★店内PV（差し替え可）
  poster: "/images/regina-04.jpg",
};

export const FAQS = [
  {
    q: "未経験でも大丈夫ですか？",
    a: "はい、大丈夫です。在籍スタッフの9割以上が未経験からのスタートです。接客の基本からしっかりお教えしますので、安心してご応募ください。",
  },
  {
    q: "学歴・経験は必要ですか？",
    a: "一切不要です。学歴や過去の経験よりも、人柄とやる気を大切にしています。",
  },
  {
    q: "掛け持ち・Wワークは可能ですか？",
    a: "可能です。週1日・1日3時間程度からのご相談も承っています。学業やお仕事との両立も可能です。",
  },
  {
    q: "送迎や寮はありますか？",
    a: "送迎ありです。遠方にお住まいの方には、お部屋に関するご相談も可能ですので、お気軽にお申し付けください。",
  },
  {
    q: "年齢確認や身分証は必要ですか？",
    a: "面接時に、年齢確認のため身分証のご提示をお願いしております。",
  },
  {
    q: "まずは何をすればいいですか？",
    a: "下のLINEボタンから、お気軽にメッセージをください。まずは体験入店だけでも大歓迎です。",
  },
];
