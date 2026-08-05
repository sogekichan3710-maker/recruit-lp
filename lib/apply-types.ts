// 面接予約フォームで扱うデータの型
// 採用管理アプリ（saiyou）の /api/public/recruit-lp/apply が受け取るペイロードと一致させる
// （saiyou側 src/types/recruitLp.ts の RecruitLpApplyPayload を参照）。

// 希望職種。内部保存値はsaiyou側 PersonType（cast/staff）とそのまま一致させる
export type JobType = "cast" | "staff";

export const JOB_TYPE_LABEL: Record<JobType, string> = {
  cast: "キャスト",
  staff: "スタッフ",
};

// "either"（どちらでも可）はスタッフ応募専用の選択肢（キャスト応募のUIには出さない）
export type StoreChoice = "virgo" | "regina" | "either";

// キャスト応募の店舗ラベル（既存デザイン・既存文言。変更しない）
export const STORE_LABEL: Record<StoreChoice, string> = {
  virgo: "THE VIRGO FUKUOKA",
  regina: "REGINA",
  either: "どちらでも可",
};

// スタッフ応募の店舗ラベル（希望職種「スタッフ」選択時のみ使用）
export const STAFF_STORE_LABEL: Record<StoreChoice, string> = {
  virgo: "THE VIRGO",
  regina: "THE VIRGO REGINA",
  either: "どちらでも可",
};

// キャスト応募で表示する店舗選択肢（既存デザイン・既存文言のまま変更しない）
export const CAST_STORE_CHOICES: StoreChoice[] = ["virgo", "regina"];
// スタッフ応募で表示する店舗選択肢
export const STAFF_STORE_CHOICES: StoreChoice[] = ["virgo", "regina", "either"];

/** 応募チャネル。希望職種の選択に応じてLP側で自動的に決定する（saiyou側 RecruitLpChannel参照） */
export type ApplySource = "cast-lp" | "staff-lp";

export const JOB_TYPE_TO_SOURCE: Record<JobType, ApplySource> = {
  cast: "cast-lp",
  staff: "staff-lp",
};

export type ApplyFormData = {
  /** 希望職種。未選択状態を許すため、フォーム入力中は空文字を取り得る */
  jobType: JobType | "";
  name: string;
  furigana: string;
  birthDate: string; // YYYY-MM-DD
  phone: string; // ハイフン有無どちらでも可（保存時にsaiyou側で正規化される）
  preferredStore: StoreChoice;
  interviewDate: string; // YYYY-MM-DD（月〜土のみ）
  interviewTime: string; // HH:mm（19:00〜20:00の間）
  /** 応募チャネル。希望職種（jobType）から自動的に決まる（saiyou側 RecruitLpChannel参照） */
  source: ApplySource;
  /** ハニーポット欄。画面には表示せず、値が入っていればボット送信とみなす */
  website?: string;
};
