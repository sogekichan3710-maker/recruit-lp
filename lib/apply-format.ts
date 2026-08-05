import { ApplyFormData } from "./apply-types";

export function formatJaDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  const weekday = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${weekday})`;
}

export function buildCancelMessage(data: ApplyFormData | null) {
  const name = data?.name || "（お名前）";
  const when = data
    ? `${formatJaDate(data.interviewDate)} ${data.interviewTime}〜`
    : "（面接日時）";
  return `面接予約キャンセル\nお名前：${name}\n面接日時：${when}`;
}

// /entry送信完了時に、送信内容を/thanksへ引き継ぐためだけに使うキー（サーバーへは送信しない）
export const THANKS_STORAGE_KEY = "recruit-lp:lastApplication";
