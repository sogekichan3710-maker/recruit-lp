// 面接予約フォームで扱うデータの型
// 採用管理アプリ（saiyou）の /api/public/recruit-lp/apply が受け取るペイロードと一致させる
// （saiyou側 src/types/recruitLp.ts の RecruitLpApplyPayload を参照）。

export type StoreChoice = "virgo" | "regina";

export const STORE_LABEL: Record<StoreChoice, string> = {
  virgo: "THE VIRGO FUKUOKA",
  regina: "REGINA",
};

export type ApplyFormData = {
  name: string;
  furigana: string;
  birthDate: string; // YYYY-MM-DD
  phone: string; // ハイフン有無どちらでも可（保存時にsaiyou側で正規化される）
  preferredStore: StoreChoice;
  interviewDate: string; // YYYY-MM-DD（月〜土のみ）
  interviewTime: string; // HH:mm（19:00〜20:00の間）
  /** 応募チャネル。本LPはキャスト採用専用のため常に"cast-lp"（saiyou側 RecruitLpChannel参照） */
  source: "cast-lp";
  /** ハニーポット欄。画面には表示せず、値が入っていればボット送信とみなす */
  website?: string;
};
