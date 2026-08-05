import { ApplyFormData } from "./apply-types";

// ============================================================
// 面接予約フォームの送信処理
//
// 採用管理アプリ（saiyou）とはこのLPの自前のRoute Handler
// （app/api/apply/route.ts）経由で連携する。saiyouの公開APIを
// 呼び出すための共有APIキー（RECRUIT_LP_API_KEY）はサーバー環境変数のみに置き、
// ブラウザからは絶対に直接saiyouのAPIを叩かない（キーが露出するため）。
// ============================================================

export type SubmitResult = { success: true } | { success: false; error: string };

export async function submitApplication(
  data: ApplyFormData
): Promise<SubmitResult> {
  // jobType（希望職種）はLP内部のUI選択用フィールドで、saiyou側APIの契約には含まれない。
  // 希望職種はsourceへ反映済み（"cast-lp"/"staff-lp"）のため、送信時は除外する。
  const { jobType: _jobType, ...payload } = data;

  let res: Response;
  try {
    res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch {
    return { success: false, error: "通信エラーが発生しました。時間を空けて再度お試しください。" };
  }

  const json = (await res.json().catch(() => null)) as { error?: string } | null;
  if (!res.ok) {
    return { success: false, error: json?.error || `送信に失敗しました (${res.status})` };
  }

  return { success: true };
}
