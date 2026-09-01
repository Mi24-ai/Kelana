import { useState } from "react";
import { X, ChevronLeft, ChevronRight, CreditCard, User, CheckCircle2 } from "lucide-react";
import { formatIDR, generateBookingCode } from "../lib/format";
import type { BookingKind } from "../types";
import StampBadge from "./StampBadge";

interface BookingWizardProps {
  kind: BookingKind;
  title: string;
  subtitle: string;
  summaryLines: { label: string; value: string }[];
  total: number;
  onClose: () => void;
}

const PREFIX: Record<BookingKind, string> = {
  flight: "FLY",
  train: "TRN",
  hotel: "HTL",
  guide: "GDE",
  villa: "VLA",
  camp: "CMP",
  bus: "BUS",
  solobox: "SBX",
};

export default function BookingWizard({ kind, title, subtitle, summaryLines, total, onClose }: BookingWizardProps) {
  const [step, setStep] = useState(0);
  const [fullName, setFullName] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [phone, setPhone] = useState("");
  const [code] = useState(() => generateBookingCode(PREFIX[kind]));

  const canProceedFromPassenger = fullName.trim().length > 2 && phone.trim().length >= 8;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--color-ink-900)]/60 backdrop-blur-sm md:items-center">
      <div className="heritage-frame animate-rise flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-[var(--color-parchment-50)] md:rounded-3xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-[var(--color-gold-300)] bg-[var(--color-indigo-800)] px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-wider text-[var(--color-gold-300)]">
              {step === 0 && "Langkah 1 dari 3 · Ringkasan"}
              {step === 1 && "Langkah 2 dari 3 · Data pemesan"}
              {step === 2 && "Langkah 3 dari 3 · Pembayaran"}
              {step === 3 && "Selesai"}
            </p>
            <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-parchment-50)]">{title}</h3>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 text-[var(--color-gold-300)] hover:bg-white/10" aria-label="Tutup">
            <X size={20} />
          </button>
        </div>

        {/* progress dots */}
        {step < 3 && (
          <div className="flex gap-1.5 px-5 pt-4">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-[var(--color-clay-500)]" : "bg-[var(--color-parchment-300)]"}`}
              />
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {step === 0 && (
            <div className="space-y-4">
              <p className="text-sm text-[var(--color-ink-500)]">{subtitle}</p>
              <div className="rounded-xl border border-[var(--color-gold-300)] bg-white p-4">
                {summaryLines.map((line) => (
                  <div key={line.label} className="flex justify-between border-b border-dashed border-[var(--color-parchment-300)] py-2 text-sm last:border-0">
                    <span className="text-[var(--color-ink-500)]">{line.label}</span>
                    <span className="tabular font-medium text-[var(--color-ink-700)]">{line.value}</span>
                  </div>
                ))}
                <div className="mt-2 flex justify-between pt-2 text-base font-semibold text-[var(--color-indigo-800)]">
                  <span>Total</span>
                  <span className="tabular">{formatIDR(total)}</span>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-indigo-800)]">
                <User size={18} />
                <p className="text-sm font-semibold">Data penumpang / pemesan utama</p>
              </div>
              <label className="block text-sm">
                <span className="mb-1 block text-[var(--color-ink-500)]">Nama lengkap (sesuai KTP)</span>
                <input
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Contoh: Muhammad Illafi Banyu Bening"
                  className="w-full rounded-lg border border-[var(--color-gold-300)] bg-white px-3 py-2.5 outline-none focus:border-[var(--color-indigo-700)]"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-[var(--color-ink-500)]">NIK / No. identitas</span>
                <input
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                  placeholder="Contoh; 9324918247294761"
                  className="w-full rounded-lg border border-[var(--color-gold-300)] bg-white px-3 py-2.5 outline-none focus:border-[var(--color-indigo-700)]"
                />
              </label>
              <label className="block text-sm">
                <span className="mb-1 block text-[var(--color-ink-500)]">Nomor HP aktif</span>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="081325785639"
                  className="w-full rounded-lg border border-[var(--color-gold-300)] bg-white px-3 py-2.5 outline-none focus:border-[var(--color-indigo-700)]"
                />
              </label>
              <p className="text-xs text-[var(--color-ink-300)]">E-tiket dan bukti pemesanan akan dikirim ke nomor ini.</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-[var(--color-indigo-800)]">
                <CreditCard size={18} />
                <p className="text-sm font-semibold">Pilih metode pembayaran</p>
              </div>
              {["QRIS", "Kartu Kredit/Debit", "Virtual Account Bank", "Dompet Digital"].map((method, i) => (
                <label
                  key={method}
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-[var(--color-gold-300)] bg-white px-4 py-3 has-[:checked]:border-[var(--color-clay-500)] has-[:checked]:bg-[var(--color-gold-100)]"
                >
                  <input type="radio" name="payment" defaultChecked={i === 0} className="accent-[var(--color-clay-500)]" />
                  <span className="text-sm font-medium text-[var(--color-ink-700)]">{method}</span>
                </label>
              ))}
              <div className="rounded-xl bg-[var(--color-emerald-700)]/10 p-3 text-xs text-[var(--color-emerald-700)]">
                Simulasi pembayaran: tidak ada transaksi nyata yang diproses pada prototipe ini.
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center gap-4 py-4 text-center">
              <StampBadge label="Terkonfirmasi" tone="clay" size={92} />
              <p className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-indigo-800)]">
                Pemesanan berhasil!
              </p>
              <p className="max-w-xs text-sm text-[var(--color-ink-500)]">
                Kode booking kamu adalah
              </p>
              <p className="tabular rounded-lg bg-[var(--color-indigo-800)] px-4 py-2 font-[var(--font-mono)] text-lg font-semibold tracking-widest text-[var(--color-gold-300)]">
                {code}
              </p>
              <p className="max-w-xs text-xs text-[var(--color-ink-300)]">
                Tunjukkan kode ini saat check-in. Detail lengkap juga dikirim ke {phone || "nomor HP kamu"}.
              </p>
            </div>
          )}
        </div>

        {/* footer actions */}
        <div className="flex gap-3 border-t border-[var(--color-gold-300)] bg-white px-5 py-4">
          {step > 0 && step < 3 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1 rounded-full border border-[var(--color-indigo-800)] px-4 py-2.5 text-sm font-medium text-[var(--color-indigo-800)]"
            >
              <ChevronLeft size={16} /> Kembali
            </button>
          )}
          {step < 2 && (
            <button
              disabled={step === 1 && !canProceedFromPassenger}
              onClick={() => setStep((s) => s + 1)}
              className="flex flex-1 items-center justify-center gap-1 rounded-full bg-[var(--color-clay-500)] px-4 py-2.5 text-sm font-semibold text-white disabled:opacity-40"
            >
              Lanjut <ChevronRight size={16} />
            </button>
          )}
          {step === 2 && (
            <button
              onClick={() => setStep(3)}
              className="flex flex-1 items-center justify-center gap-1 rounded-full bg-[var(--color-emerald-700)] px-4 py-2.5 text-sm font-semibold text-white"
            >
              <CheckCircle2 size={16} /> Bayar & Konfirmasi
            </button>
          )}
          {step === 3 && (
            <button
              onClick={onClose}
              className="flex-1 rounded-full bg-[var(--color-indigo-800)] px-4 py-2.5 text-sm font-semibold text-[var(--color-gold-300)]"
            >
              Selesai
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
