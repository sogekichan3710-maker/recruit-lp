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
  eyebrow: "FUKUOKA PREMIUM CABARET RECRUIT",
  titleLines: [
    "ヴァルゴだから",
    "実現できる、",
    "圧倒的な還元率と",
    "集客力。",
  ],
  subCopyLines: [
    "THE VIRGO / THE VIRGO REGINA",
    "福岡最大級の高級キャバクラで、",
    "高収入も働きやすさも妥協しない選択を。",
  ],
  videoSrc: "/videos/hero-virgo.mp4", // ★背景動画（差し替え可）
};

export const WHY_US = [
  {
    icon: "TrendingUp",
    rank: "給率 No.1",
    title: "中洲でも比較できない高還元率",
    desc: "頑張った分がそのまま給与へ反映される、高還元システム。売上だけでなく、一人ひとりの努力を正当に評価します。",
  },
  {
    icon: "Users",
    rank: "定着率 No.1",
    title: "長く働ける環境があります",
    desc: "働きやすさを第一に考えた店舗運営。キャスト同士・スタッフとの関係も良く、退店率の低さが自慢です。",
  },
  {
    icon: "ShieldCheck",
    rank: "ノルマ・罰金なし",
    title: "自分らしく働ける環境",
    desc: "ノルマ・罰金・過度なプレッシャーはありません。安心して自分のペースで成長できる環境です。",
  },
  {
    icon: "GraduationCap",
    rank: "サポート体制",
    title: "研修・教育マニュアル完備",
    desc: "未経験でも安心。接客・指名獲得・売上アップまで、一人ひとりに合わせた教育体制を整えています。",
  },
  {
    icon: "Car",
    rank: "無料送迎あり",
    title: "遠方エリアまで対応",
    desc: "営業終了後は無料送迎を実施。0:30〜4:00まで、遠方エリアも安心して帰宅できます。",
  },
  {
    icon: "Award",
    rank: "未経験・学生歓迎",
    title: "未経験からトップキャストへ",
    desc: "未経験スタートから月収200万円以上を達成したキャストも在籍。学生・Wワークの方も安心して始められる教育環境があります。",
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
    name: "THE VIRGO",
    enName: "VIRGO",
    tagline: "モダン×ラグジュアリー",
    description:
      "黒とネイビーを基調とした洗練された空間。ネイビーとゴールドが織りなす高級感あふれる店内で、THE VIRGOを代表するラグジュアリーなVIP空間です。",
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
    name: "THE VIRGO REGINA",
    enName: "REGINA",
    tagline: "クラシック×気品",
    description:
      "赤とゴールドを基調とした華やかな空間。特別感と上質さを兼ね備えた店内で、THE VIRGO REGINAを代表するラグジュアリーなVIP空間です。",
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
    q: "未経験でも本当に稼げますか？",
    a: "はい。中洲でも比較できない高還元システムで、頑張った分がそのまま給与へ反映されます。未経験スタートから月収200万円以上を達成したキャストも在籍。研修も充実しているので、初めての方でも安心して一歩を踏み出せます。",
  },
  {
    q: "学生・Wワークでも働けますか？",
    a: "可能です。学業や本業との両立を前提にしたシフト相談に対応しており、無理なく自分のペースで始められます。まずは週1日からのスタートも歓迎しています。",
  },
  {
    q: "ノルマや罰金はありますか？",
    a: "一切ありません。ノルマ・罰金・過度なプレッシャーのない環境で、安心して自分らしく成長していただけます。焦らず、自分のペースで着実にステップアップしていけます。",
  },
  {
    q: "無料送迎はどこまで対応していますか？",
    a: "営業終了後、0:30〜4:00の時間帯で無料送迎を実施しています。福岡市内はもちろん、遠方エリアにお住まいの方も安心してご帰宅いただけます。夜遅い時間のひとりでの帰り道も心配いりません。",
  },
  {
    q: "お酒が苦手でも大丈夫ですか？",
    a: "問題ございません。無理な飲酒を強いることはなく、会話や雰囲気づくりを楽しんでいただければ大丈夫です。体調やペースを最優先にした、無理のない接客スタイルで働いていただけます。",
  },
  {
    q: "応募から体験入店までの流れを教えてください。",
    a: "まずはLINEから気軽にご連絡ください。その後、簡単な面談・店舗見学を経て、体験入店にご案内します。研修・教育マニュアルも完備しているので、未経験の方もひとりで悩まず安心してスタートできます。",
  },
  {
    q: "アフターの送りはありますか？",
    a: "はい、無料送迎をご利用いただけます。営業終了後は無料送迎を行っており、福岡市内はもちろん遠方エリアまで幅広く対応。終電後でも安心して働いていただけます。",
  },
  {
    q: "ドレスの制限はありますか？",
    a: "基本的な規定はありますが、自由度の高いスタイルで働けます。店舗の雰囲気に合ったドレスであれば問題ありません。未経験の方には、ドレス選びやヘアスタイルまで丁寧にサポートします。",
  },
  {
    q: "お客様のタイプはどういった方が多いでしょうか？",
    a: "経営者・会社役員・医師・士業など、落ち着いた大人のお客様が中心です。接待や会食でご利用いただくことも多く、安心して接客できる環境づくりを大切にしています。",
  },
];
