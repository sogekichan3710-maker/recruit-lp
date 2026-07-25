# 採用LP - THE VIRGO FUKUOKA / REGINA

Next.js（App Router）+ TypeScript + Tailwind CSS + Framer Motion で実装した採用ランディングページです。

## セットアップ

```bash
npm install
npm run dev
```

`http://localhost:3000` で確認できます。

本番ビルド:

```bash
npm run build
npm run start
```

## ディレクトリ構成

```
app/
  layout.tsx      … フォント・SEOメタデータ
  page.tsx        … セクションの並び順のみを管理
  globals.css
components/
  Hero.tsx            … ①ファーストビュー（背景動画・キャッチコピー・CTA）
  WhyUs.tsx           … ②選ばれる理由（アイコンカード）
  StoreGallery.tsx    … ③店舗紹介（横スクロールギャラリー）
  PVSection.tsx       … ④店内PV
  FAQ.tsx             … ⑤FAQ（アコーディオン）
  ApplySection.tsx    … ⑥応募（最下部CTA）
  StickyApplyButton.tsx … 常時表示のLINE応募ボタン（モバイル下部固定／デスクトップ右下）
  Footer.tsx
  SectionHeading.tsx  … 共通の見出し（金のラインが伸びるシグネチャー演出）
  GoldButton.tsx      … 共通のCTAボタン
components/
  ApplyModalProvider.tsx … 面接予約モーダルの開閉状態（Context）
  ApplyModal.tsx          … 面接予約モーダル本体（入力→確認→完了／エラー画面）
lib/
  apply-types.ts      … 面接予約フォームのデータ型定義
  submit-application.ts … 送信処理（現時点はローカル保持のみ。将来API送信に差し替え）
  site-config.ts      … ★文言・画像パス・LINE URL などはすべてここで一元管理
public/
  videos/hero-virgo.mp4   … ファーストビュー背景動画
  videos/pv-regina.mp4    … 店内PVセクション動画
  images/virgo-01〜05.jpg … THE VIRGO FUKUOKA 店内写真
  images/regina-01〜04.jpg … REGINA 店内写真
```

## 差し替え方法

### 1. LINE応募URL・電話番号
`lib/site-config.ts` 冒頭の `SITE` を編集してください。

```ts
export const SITE = {
  lineUrl: "https://line.me/R/ti/p/@your_line_id", // ← ここを実際のLINE公式アカウントURLに
  ...
};
```

### 2. コピー文言
`HERO` / `WHY_US` / `STORES` / `PV` / `FAQS` の各オブジェクトのテキストを編集するだけで、
デザインを崩さずに文言を差し替えられます。

### 3. 画像・動画
`public/images/` `public/videos/` 内のファイルを差し替え、`site-config.ts` 内のパスも
合わせて更新してください。画像は縦横比 4:5 を想定したクロップになっているため、
差し替える画像も同程度の比率だと綺麗に収まります。

動画は元素材（21秒, 1280px幅, H.264）をそのまま流用しています。差し替える際は
ffmpeg 等で `-movflags +faststart` を付けてWeb用に最適化することを推奨します。

## 実装状況：採用管理アプリ（saiyou）と連携済みです

- 面接予約フォームの送信は、saiyouリポジトリの実際の `persons` / `applications` /
  `statusHistory` スキーマ・既存の人物登録／応募登録ロジックへ正式に取り込む
  公開API `POST /api/public/recruit-lp/apply`（saiyou側）へ送信します。
- **ブラウザから直接saiyouのAPIは呼び出しません。** 本LP自身のサーバー側
  Route Handler `app/api/apply/route.ts` が仲介し、共有APIキー
  （`RECRUIT_LP_API_KEY`、サーバー環境変数のみ）を付与してsaiyouへ転送します。
- 稼働させるには `.env.local.example` を参考に `SAIYOU_APPLY_API_URL` と
  `RECRUIT_LP_API_KEY` を設定してください（`RECRUIT_LP_API_KEY` はsaiyou側の
  同名環境変数と必ず同じ値にすること）。

## 面接・体験予約フローについて

「面接・体験予約」ボタンから開くモーダルは、次の4ステップです。

1. **入力**：①お名前 ②ふりがな ③生年月日 ④電話番号（必須。ハイフン有無どちらでも可）
   ⑤ご希望店舗（VIRGO / REGINA） ⑥面接希望日時（月〜土、19:00〜19:45スタートの15分刻み。
   日曜を選ぶとエラー表示）
2. **確認**：入力内容を一覧表示し、「入力に戻る」で修正、「予約を確定する」で送信
3. **送信**：`lib/submit-application.ts` の `submitApplication()` が
   `app/api/apply/route.ts`（本LPのサーバー側）経由でsaiyouのAPIへ送信します。
   **saiyou側がAPI成功を返した場合のみ**完了画面へ進みます。失敗時はエラー画面
   （「送信できませんでした。時間を空けて再度お試しください。またはLINE応募をご利用ください。」）
   を表示し、予約完了扱いにはしません。
4. **完了**：「予約完了です。面接お待ちしております。」と共に、面接会場
   （現状 THE VIRGO FUKUOKA の住所）・地図・キャンセル方法を表示します。

### 送信データの形

`lib/apply-types.ts` で以下の形に整理しています（saiyou側 `src/types/recruitLp.ts` の
`RecruitLpApplyPayload` と一致）。`website` は非表示のハニーポット欄で、
ボット検知にのみ使用します。

```ts
type ApplyFormData = {
  name: string;
  furigana: string;
  birthDate: string;       // YYYY-MM-DD
  phone: string;            // ハイフン有無どちらでも可（保存時にsaiyou側で正規化）
  preferredStore: "virgo" | "regina";
  interviewDate: string;   // YYYY-MM-DD
  interviewTime: string;   // HH:mm
  source: "cast-lp";        // 応募チャネル（本LPはキャスト採用専用。saiyou側 RecruitLpChannel参照）
  website?: string;         // ハニーポット（非表示）
};
```

### 面接キャンセルの導線

完了画面とフッターの両方に、公式LINE（`SITE.lineUrl`）への導線を設置しています。
完了画面では、下記の文面を自動生成して画面に表示し、「文面をコピー」ボタンで
クリップボードにコピーできます（LINEの吹き出しへの自動入力は、LINE公式アカウントの
ベーシックIDが必要な `oaMessage` 形式の仕組みが必要なため、今回は
「コピーしてLINEに貼り付ける」方式にしています）。

```
面接予約キャンセル
お名前：（入力されたお名前）
面接日時：（予約された日時）
```

### ★導入前に確認してください

- 面接会場の住所は現状 THE VIRGO FUKUOKA のものを設定しています
  （`lib/site-config.ts` の `INTERVIEW_VENUE`）。REGINA希望者にも
  同一会場で面接を行う想定です。異なる場合は店舗ごとに出し分けるよう
  `ApplyModal.tsx` の `ConfirmationView` を調整してください。
- 公式LINE URLは `https://lin.ee/tJNd5ae` に統一済みです
  （「LINEで応募する」「面接キャンセル」「問い合わせ」「固定LINEボタン」すべて）。
  変更する場合は `lib/site-config.ts` の `SITE.lineUrl` のみ編集すれば
  全箇所に反映されます。

## 店舗写真の割り当てについて（修正済み）

初回納品時、写真の店舗振り分けが誤っていたため修正しました。
現在は以下の割り当てになっています。

- **THE VIRGO FUKUOKA**（`virgo-01`〜`05`）
- **REGINA**（`regina-01`〜`04`）

実際と異なる場合は `lib/site-config.ts` の `STORES` 配列内、
各店舗の `images` 配列を編集して入れ替えてください
（`public/images/` 内のファイル自体はそのまま使い回せます）。

## デザインについて

- **配色**: ほぼ黒（#0a0908）をベースに、白系のアイボリー文字、ゴールド（#c6a15b）のアクセント。
  写真そのものが主役になるよう、装飾は最小限に抑えています。
- **タイポグラフィ**: 見出しに明朝体（Shippori Mincho）、本文にゴシック体（Zen Kaku Gothic New）。
- **シグネチャー要素**: 各セクション見出しの下に、実店舗の間接照明（コーブライン）を
  イメージした金のラインが、スクロールに合わせて伸びる演出を共通で使用しています。
- **アニメーション**: フェードイン・浮き上がり程度に留め、表示速度を優先しています。
- **モバイル最優先**: LINE応募ボタンはモバイルでは画面下部に全幅固定、
  デスクトップでは右下にフローティング表示され、常にタップ可能です。
