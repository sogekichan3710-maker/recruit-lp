"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ChevronLeft } from "lucide-react";
import { submitApplication } from "@/lib/submit-application";
import { ApplyFormData, StoreChoice, STORE_LABEL } from "@/lib/apply-types";
import { SITE } from "@/lib/site-config";

const TIME_OPTIONS = ["19:00", "19:15", "19:30", "19:45"];

function isMonToSat(dateStr: string) {
  if (!dateStr) return false;
  const day = new Date(`${dateStr}T00:00:00`).getDay();
  return day !== 0;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function formatJaDate(dateStr: string) {
  if (!dateStr) return "";
  const d = new Date(`${dateStr}T00:00:00`);
  const weekday = ["日", "月", "火", "水", "木", "金", "土"][d.getDay()];
  return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日(${weekday})`;
}

type Step = "form" | "confirm" | "submitting" | "error";

const emptyForm: ApplyFormData = {
  name: "",
  furigana: "",
  birthDate: "",
  phone: "",
  preferredStore: "virgo",
  interviewDate: "",
  interviewTime: TIME_OPTIONS[0],
  source: "cast-lp",
  website: "",
};

// 電話番号のゆるい形式チェック（保存時の正規化はsaiyou側で行うため、ここでは大まかな桁数のみ確認）
function isLikelyPhone(value: string) {
  const digits = value.replace(/[^\d０-９]/g, "");
  return digits.length >= 10 && digits.length <= 11;
}

// /thanks ページへ完了内容を引き継ぐためのセッションストレージキー
export const THANKS_STORAGE_KEY = "recruit-lp-apply-result";

export default function EntryForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<ApplyFormData>(emptyForm);
  const [dateError, setDateError] = useState("");

  const minDate = useMemo(() => todayStr(), []);

  const update = (patch: Partial<ApplyFormData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleDateChange = (value: string) => {
    update({ interviewDate: value });
    setDateError(
      value && !isMonToSat(value)
        ? "日曜日は定休日です。月〜土の日付をお選びください。"
        : ""
    );
  };

  const canProceed =
    form.name.trim() &&
    form.furigana.trim() &&
    form.birthDate &&
    isLikelyPhone(form.phone) &&
    form.interviewDate &&
    !dateError &&
    form.interviewTime;

  const handleConfirmSubmit = async () => {
    setStep("submitting");
    const result = await submitApplication(form);
    if (result.success) {
      try {
        sessionStorage.setItem(THANKS_STORAGE_KEY, JSON.stringify(form));
      } catch {
        // セッションストレージが使えない環境でも、完了画面はフォールバック表示になるだけなので送信自体は継続する
      }
      router.push("/thanks");
    } else {
      console.error("[recruit-lp] 面接予約の送信に失敗しました", result.error);
      setStep("error");
    }
  };

  return (
    <div className="mx-auto w-full max-w-lg">
      {step === "form" && (
        <FormView
          form={form}
          update={update}
          dateError={dateError}
          onDateChange={handleDateChange}
          minDate={minDate}
          canProceed={!!canProceed}
          onNext={() => setStep("confirm")}
        />
      )}
      {step === "confirm" && (
        <ConfirmStepView
          form={form}
          onBack={() => setStep("form")}
          onSubmit={handleConfirmSubmit}
        />
      )}
      {step === "submitting" && <SubmittingView />}
      {step === "error" && <ErrorView onRetry={() => setStep("confirm")} />}
    </div>
  );
}

function FormView({
  form,
  update,
  dateError,
  onDateChange,
  minDate,
  canProceed,
  onNext,
}: {
  form: ApplyFormData;
  update: (patch: Partial<ApplyFormData>) => void;
  dateError: string;
  onDateChange: (v: string) => void;
  minDate: string;
  canProceed: boolean;
  onNext: () => void;
}) {
  const inputClass =
    "w-full rounded-xl border border-hairline bg-ink px-4 py-3 text-base text-ivory placeholder:text-muted/60 outline-none transition-colors focus:border-gold/60";

  return (
    <div>
      <p className="text-[11px] tracking-widest2 text-gold uppercase mb-2">Interview Entry</p>
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-ivory">
        面接・体験のご予約
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
        体験入店は面接後のご案内となります。まずは面接のご予約にお進みください。
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (canProceed) onNext();
        }}
        className="mt-6 flex flex-col gap-5"
      >
        <div>
          <label className="mb-1.5 block text-xs text-muted">① お名前</label>
          <input
            className={inputClass}
            placeholder="お名前（例：福岡 花子）"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">② ふりがな</label>
          <input
            className={inputClass}
            placeholder="ふりがな（例：ふくおか はなこ）"
            value={form.furigana}
            onChange={(e) => update({ furigana: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">③ 生年月日</label>
          <input
            type="date"
            className={inputClass}
            value={form.birthDate}
            max={minDate}
            onChange={(e) => update({ birthDate: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">④ 電話番号</label>
          <input
            type="tel"
            inputMode="tel"
            className={inputClass}
            placeholder="例：090-1234-5678（ハイフンなしでも可）"
            value={form.phone}
            onChange={(e) => update({ phone: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">⑤ ご希望店舗</label>
          <div className="grid grid-cols-2 gap-3">
            {(["virgo", "regina"] as StoreChoice[]).map((s) => (
              <button
                type="button"
                key={s}
                onClick={() => update({ preferredStore: s })}
                className={`rounded-xl border px-4 py-3 text-sm font-medium tracking-wide transition-colors ${
                  form.preferredStore === s
                    ? "border-gold bg-gold/10 text-gold-bright"
                    : "border-hairline text-muted hover:border-gold/40"
                }`}
              >
                {STORE_LABEL[s]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">
            ⑥ 面接希望日時（月〜土 19:00〜20:00）
          </label>
          <div className="grid grid-cols-2 gap-3">
            <input
              type="date"
              className={inputClass}
              value={form.interviewDate}
              min={minDate}
              onChange={(e) => onDateChange(e.target.value)}
              required
            />
            <select
              className={inputClass}
              value={form.interviewTime}
              onChange={(e) => update({ interviewTime: e.target.value })}
            >
              {TIME_OPTIONS.map((t) => (
                <option key={t} value={t}>
                  {t}〜
                </option>
              ))}
            </select>
          </div>
          {dateError && <p className="mt-1.5 text-xs text-red-400">{dateError}</p>}
        </div>

        {/* ハニーポット：人には見えない位置に配置し、ボットが自動入力した場合のみ検知する */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">ウェブサイト</label>
          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website ?? ""}
            onChange={(e) => update({ website: e.target.value })}
          />
        </div>

        <button
          type="submit"
          disabled={!canProceed}
          className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-bright to-gold px-7 py-3.5 text-sm font-medium text-ink shadow-gold transition-all active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40"
        >
          入力内容を確認する
        </button>
      </form>
    </div>
  );
}

function ConfirmStepView({
  form,
  onBack,
  onSubmit,
}: {
  form: ApplyFormData;
  onBack: () => void;
  onSubmit: () => void;
}) {
  const rows: [string, string][] = [
    ["お名前", form.name],
    ["ふりがな", form.furigana],
    ["生年月日", form.birthDate],
    ["電話番号", form.phone],
    ["ご希望店舗", STORE_LABEL[form.preferredStore]],
    ["面接希望日時", `${formatJaDate(form.interviewDate)} ${form.interviewTime}〜`],
  ];

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1 text-xs text-muted hover:text-ivory"
      >
        <ChevronLeft size={14} strokeWidth={1.75} />
        入力に戻る
      </button>

      <p className="text-[11px] tracking-widest2 text-gold uppercase mb-2">Confirm</p>
      <h3 className="font-display text-xl sm:text-2xl font-semibold text-ivory">
        入力内容のご確認
      </h3>
      <p className="mt-2 text-xs sm:text-sm text-muted leading-relaxed">
        以下の内容で面接予約を送信します。よろしければ「予約を確定する」を押してください。
      </p>

      <dl className="mt-6 divide-y divide-hairline rounded-xl border border-hairline bg-ink">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 px-4 py-3">
            <dt className="shrink-0 text-xs text-muted">{label}</dt>
            <dd className="text-right text-sm text-ivory">{value}</dd>
          </div>
        ))}
      </dl>

      <button
        onClick={onSubmit}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-b from-gold-bright to-gold px-7 py-3.5 text-sm font-medium text-ink shadow-gold transition-all active:scale-[0.97]"
      >
        予約を確定する
      </button>
    </div>
  );
}

function SubmittingView() {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 size={28} className="animate-spin text-gold" />
      <p className="mt-4 text-sm text-muted">送信しています…</p>
    </div>
  );
}

function ErrorView({ onRetry }: { onRetry: () => void }) {
  return (
    <div className="py-6 text-center">
      <p className="font-display text-lg font-semibold text-ivory">送信できませんでした。</p>
      <p className="mt-2 text-sm text-muted leading-relaxed">
        時間を空けて再度お試しください。
        <br />
        またはLINE応募をご利用ください。
      </p>
      <div className="mt-6 flex flex-col items-center gap-3">
        <button
          onClick={onRetry}
          className="rounded-full bg-gradient-to-b from-gold-bright to-gold px-7 py-3 text-sm font-medium text-ink shadow-gold"
        >
          もう一度試す
        </button>
        <a
          href={SITE.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-muted underline underline-offset-2 hover:text-ivory"
        >
          LINEで応募する
        </a>
      </div>
    </div>
  );
}
