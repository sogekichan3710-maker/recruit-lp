"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ChevronLeft } from "lucide-react";
import { submitApplication } from "@/lib/submit-application";
import { THANKS_STORAGE_KEY } from "@/lib/apply-format";
import {
  ApplyFormData,
  STORE_LABEL,
  STAFF_STORE_LABEL,
  CAST_STORE_CHOICES,
  STAFF_STORE_CHOICES,
  JobType,
  JOB_TYPE_LABEL,
  JOB_TYPE_TO_SOURCE,
} from "@/lib/apply-types";
import { formatJaDate } from "@/lib/apply-format";
import { SITE } from "@/lib/site-config";

const JOB_TYPE_OPTIONS: JobType[] = ["cast", "staff"];

const TIME_OPTIONS = ["19:00", "19:15", "19:30", "19:45"];

function isMonToSat(dateStr: string) {
  if (!dateStr) return false;
  const day = new Date(`${dateStr}T00:00:00`).getDay();
  return day !== 0;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

type Step = "form" | "confirm" | "submitting" | "error";

const emptyForm: ApplyFormData = {
  jobType: "",
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

// /entry ページのコンテンツ本体（面接・体験予約フォーム）。
// 旧ApplyModalの入力・確認・送信ロジックをそのまま引き継ぎ、モーダル表示（背景・閉じるボタン）だけを外している。
// 送信成功後は /thanks へ遷移する（完了表示はapp/thanks側・components/ThanksContent.tsxが担当）。
export default function ApplyForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("form");
  const [form, setForm] = useState<ApplyFormData>(emptyForm);
  const [dateError, setDateError] = useState("");

  const minDate = useMemo(() => todayStr(), []);

  const update = (patch: Partial<ApplyFormData>) =>
    setForm((prev) => ({ ...prev, ...patch }));

  const handleJobTypeChange = (value: JobType) => {
    setForm((prev) => ({
      ...prev,
      jobType: value,
      source: JOB_TYPE_TO_SOURCE[value],
      // 「どちらでも可」はスタッフ専用の選択肢のため、キャストへ切り替えた際は既定の店舗へ戻す
      preferredStore:
        value === "cast" && prev.preferredStore === "either" ? "virgo" : prev.preferredStore,
    }));
  };

  const handleDateChange = (value: string) => {
    update({ interviewDate: value });
    setDateError(
      value && !isMonToSat(value)
        ? "日曜日は定休日です。月〜土の日付をお選びください。"
        : ""
    );
  };

  // 希望職種以外の必須項目が揃っているか（送信ボタンの活性・非活性はこちらで判定する）。
  // 希望職種はここに含めない：未選択のままボタンを非活性にしてしまうと、送信を試みても
  // クリックイベント自体が発火せず「希望職種を選択してください」のエラーを出す機会がなくなるため。
  const otherFieldsFilled =
    form.name.trim() &&
    form.furigana.trim() &&
    form.birthDate &&
    isLikelyPhone(form.phone) &&
    form.interviewDate &&
    !dateError &&
    form.interviewTime;

  const canProceed = !!form.jobType && !!otherFieldsFilled;

  const handleConfirmSubmit = async () => {
    setStep("submitting");
    const result = await submitApplication(form);
    if (result.success) {
      try {
        sessionStorage.setItem(THANKS_STORAGE_KEY, JSON.stringify(form));
      } catch {
        // sessionStorageが使えない環境でも、送信自体は成功しているため完了ページへは進む
      }
      router.push("/thanks");
    } else {
      console.error("[recruit-lp] 面接予約の送信に失敗しました", result.error);
      setStep("error");
    }
  };

  return (
    <div className="w-full max-w-lg rounded-3xl border border-hairline bg-surface px-6 py-8 shadow-card sm:px-8">
      {step === "form" && (
        <FormView
          form={form}
          update={update}
          onJobTypeChange={handleJobTypeChange}
          dateError={dateError}
          onDateChange={handleDateChange}
          minDate={minDate}
          canProceed={!!canProceed}
          submitEnabled={!!otherFieldsFilled}
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
  onJobTypeChange,
  dateError,
  onDateChange,
  minDate,
  canProceed,
  submitEnabled,
  onNext,
}: {
  form: ApplyFormData;
  update: (patch: Partial<ApplyFormData>) => void;
  onJobTypeChange: (value: JobType) => void;
  dateError: string;
  onDateChange: (v: string) => void;
  minDate: string;
  canProceed: boolean;
  submitEnabled: boolean;
  onNext: () => void;
}) {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const inputClass =
    "w-full rounded-xl border border-hairline bg-ink px-4 py-3 text-base text-ivory placeholder:text-muted/60 outline-none transition-colors focus:border-gold/60";

  const storeChoices = form.jobType === "staff" ? STAFF_STORE_CHOICES : CAST_STORE_CHOICES;
  const storeLabel = form.jobType === "staff" ? STAFF_STORE_LABEL : STORE_LABEL;

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
          setSubmitAttempted(true);
          if (canProceed) onNext();
        }}
        className="mt-6 flex flex-col gap-5"
      >
        <div>
          <label className="mb-1.5 block text-xs text-muted">① 希望職種</label>
          <div className="grid grid-cols-2 gap-3">
            {JOB_TYPE_OPTIONS.map((jt) => (
              <button
                type="button"
                key={jt}
                onClick={() => onJobTypeChange(jt)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium tracking-wide transition-colors ${
                  form.jobType === jt
                    ? "border-gold bg-gold/10 text-gold-bright"
                    : "border-hairline text-muted hover:border-gold/40"
                }`}
              >
                {JOB_TYPE_LABEL[jt]}
              </button>
            ))}
          </div>
          {submitAttempted && !form.jobType && (
            <p className="mt-1.5 text-xs text-red-400">希望職種を選択してください</p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">② お名前</label>
          <input
            className={inputClass}
            placeholder="お名前（例：福岡 花子）"
            value={form.name}
            onChange={(e) => update({ name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">③ ふりがな</label>
          <input
            className={inputClass}
            placeholder="ふりがな（例：ふくおか はなこ）"
            value={form.furigana}
            onChange={(e) => update({ furigana: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">④ 生年月日</label>
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
          <label className="mb-1.5 block text-xs text-muted">⑤ 電話番号</label>
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
          <label className="mb-1.5 block text-xs text-muted">⑥ ご希望店舗</label>
          <div className="grid grid-cols-2 gap-3">
            {storeChoices.map((s) => (
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
                {storeLabel[s]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs text-muted">
            ⑦ 面接希望日時（月〜土 19:00〜20:00）
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
          disabled={!submitEnabled}
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
  const storeLabel = form.jobType === "staff" ? STAFF_STORE_LABEL : STORE_LABEL;
  const rows: [string, string][] = [
    ["希望職種", form.jobType ? JOB_TYPE_LABEL[form.jobType] : ""],
    ["お名前", form.name],
    ["ふりがな", form.furigana],
    ["生年月日", form.birthDate],
    ["電話番号", form.phone],
    ["ご希望店舗", storeLabel[form.preferredStore]],
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
