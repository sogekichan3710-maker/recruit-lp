import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ============================================================
// LP自身のサーバー側プロキシ。ブラウザ→ここ→saiyouの公開API、の順で送信する。
// saiyouの共有APIキー（RECRUIT_LP_API_KEY）はサーバー環境変数にのみ置き、
// ブラウザ側のJSバンドルには一切含めない（NEXT_PUBLIC_を付けないこと）。
//
// 必要な環境変数：
//   SAIYOU_APPLY_API_URL … saiyou側エンドポイントの絶対URL
//     （例: https://saiyou.example.com/api/public/recruit-lp/apply）
//   RECRUIT_LP_API_KEY   … saiyou側の同名環境変数と同じ値
// ============================================================

export async function POST(request: Request) {
  const apiUrl = process.env.SAIYOU_APPLY_API_URL;
  const apiKey = process.env.RECRUIT_LP_API_KEY;

  if (!apiUrl || !apiKey) {
    console.error("[recruit-lp] SAIYOU_APPLY_API_URL または RECRUIT_LP_API_KEY が未設定です");
    return NextResponse.json(
      { error: "現在この機能はご利用いただけません。LINEよりお問い合わせください。" },
      { status: 500 }
    );
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "送信内容を読み取れませんでした。" }, { status: 400 });
  }

  let upstream: Response;
  try {
    upstream = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-recruit-lp-api-key": apiKey,
      },
      body: JSON.stringify(body),
      // このRoute Handlerは常に最新状態で採用管理アプリへ送信する（キャッシュ厳禁）
      cache: "no-store",
    });
  } catch (e) {
    console.error("[recruit-lp] saiyou APIへの接続に失敗しました", e);
    return NextResponse.json(
      { error: "送信できませんでした。時間を空けて再度お試しください。またはLINE応募をご利用ください。" },
      { status: 502 }
    );
  }

  const json = (await upstream.json().catch(() => null)) as { error?: string } | null;

  if (!upstream.ok) {
    return NextResponse.json(
      {
        error:
          json?.error ||
          "送信できませんでした。時間を空けて再度お試しください。またはLINE応募をご利用ください。",
      },
      { status: upstream.status }
    );
  }

  return NextResponse.json({ ok: true });
}
