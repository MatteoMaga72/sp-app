'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Check,
  Home,
  Calendar,
  Camera,
  Clock,
  CreditCard,
  Zap,
  Droplets,
  ChevronRight,
  Building2,
  Sparkles,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FormData {
  currentAddress: string;
  lastDay: { month: string; day: string; year: string };
  newAddress: string;
  propertyType: string;
  moveInDate: { month: string; day: string; year: string };
  sameUtilities: boolean;
  transferGiro: boolean;
}

const initialForm: FormData = {
  currentAddress: '18 Everton Rd Singapore 089374',
  lastDay: { month: '03', day: '31', year: '2026' },
  newAddress: '',
  propertyType: '',
  moveInDate: { month: '04', day: '01', year: '2026' },
  sameUtilities: true,
  transferGiro: true,
};

const steps = ['Current Home', 'New Home', 'GIRO Transfer', 'Confirm'];
const months = ['01','02','03','04','05','06','07','08','09','10','11','12'];
const days = Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, '0'));
const propertyTypes = ['HDB', 'Condo', 'Landed', 'Commercial'];

const monthNames: Record<string, string> = {
  '01':'Jan','02':'Feb','03':'Mar','04':'Apr','05':'May','06':'Jun',
  '07':'Jul','08':'Aug','09':'Sep','10':'Oct','11':'Nov','12':'Dec',
};

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MovingPage() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [slideDir, setSlideDir] = useState<'left' | 'right'>('left');
  const [animating, setAnimating] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState<
    { id: number; left: number; delay: number; color: string; size: number }[]
  >([]);

  const canProceed = (): boolean => {
    if (step === 0) return true;
    if (step === 1) return form.newAddress.trim().length > 0 && form.propertyType.length > 0;
    if (step === 2) return true;
    return true;
  };

  const goNext = () => {
    if (!canProceed()) return;
    if (step < 3) {
      setSlideDir('left');
      setAnimating(true);
      setTimeout(() => {
        setStep((s) => s + 1);
        setAnimating(false);
      }, 200);
    }
  };

  const goBack = () => {
    if (step > 0) {
      setSlideDir('right');
      setAnimating(true);
      setTimeout(() => {
        setStep((s) => s - 1);
        setAnimating(false);
      }, 200);
    }
  };

  const handleSubmit = () => {
    setSubmitted(true);
    // Generate confetti
    const colors = ['#00BFA5', '#FF6D00', '#4CAF50', '#F44336', '#2196F3', '#FFD600'];
    setConfettiPieces(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 6 + Math.random() * 6,
      }))
    );
  };

  const formatDate = (d: { month: string; day: string; year: string }) =>
    `${d.day} ${monthNames[d.month] || d.month} ${d.year}`;

  /* ---------------------------------------------------------------- */
  /*  Success Screen                                                   */
  /* ---------------------------------------------------------------- */
  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-sp-gray relative overflow-hidden">
        {/* confetti */}
        {confettiPieces.map((p) => (
          <div
            key={p.id}
            className="absolute animate-confetti-fall"
            style={{
              left: `${p.left}%`,
              top: -20,
              width: p.size,
              height: p.size,
              background: p.color,
              borderRadius: p.size > 9 ? '50%' : '2px',
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}

        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-sp-green flex items-center justify-center mb-5 shadow-lg animate-bounce-once">
            <Check size={40} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-sp-dark mb-2">Application Submitted!</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your moving request has been received.</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Track it in your Services page.</p>

          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm dark:shadow-gray-900/30 p-4 w-full max-w-sm text-left mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles size={16} className="text-sp-teal" />
              <span className="text-sm font-semibold text-sp-dark">Summary</span>
            </div>
            <div className="space-y-2 text-xs text-gray-600 dark:text-gray-300">
              <div className="flex justify-between">
                <span className="text-gray-400">Close</span>
                <span className="font-medium text-sp-dark">{form.currentAddress.split(' Singapore')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Last day</span>
                <span className="font-medium text-sp-dark">{formatDate(form.lastDay)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Open</span>
                <span className="font-medium text-sp-dark">{form.newAddress || '---'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Move-in</span>
                <span className="font-medium text-sp-dark">{formatDate(form.moveInDate)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">GIRO</span>
                <span className="font-medium text-sp-dark">{form.transferGiro ? 'Transferred (DBS)' : 'Not transferred'}</span>
              </div>
            </div>
          </div>

          <Link
            href="/utilities"
            className="bg-sp-teal text-white font-semibold text-sm px-8 py-3.5 rounded-xl shadow-lg active:scale-95 transition-transform"
          >
            Back to Services
          </Link>
        </div>

        <style>{`
          @keyframes confetti-fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
          }
          .animate-confetti-fall {
            animation: confetti-fall 2.5s ease-in forwards;
          }
          @keyframes bounce-once {
            0% { transform: scale(0); }
            50% { transform: scale(1.2); }
            70% { transform: scale(0.9); }
            100% { transform: scale(1); }
          }
          .animate-bounce-once {
            animation: bounce-once 0.6s ease-out forwards;
          }
        `}</style>
      </div>
    );
  }

  /* ---------------------------------------------------------------- */
  /*  Wizard                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <div className="flex flex-col min-h-screen bg-sp-gray">
      {/* -------- Header -------- */}
      <div className="bg-white dark:bg-gray-900 px-4 pt-12 pb-4 sticky top-0 z-30 shadow-sm dark:shadow-gray-900/30">
        <div className="flex items-center gap-3 mb-5">
          {step === 0 ? (
            <Link href="/utilities" className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-90 transition-transform">
              <ArrowLeft size={22} className="text-sp-dark" />
            </Link>
          ) : (
            <button onClick={goBack} className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-90 transition-transform">
              <ArrowLeft size={22} className="text-sp-dark" />
            </button>
          )}
          <h1 className="text-lg font-bold text-sp-dark">Moving House</h1>
        </div>

        {/* Step indicator */}
        <div className="flex items-center justify-between px-2">
          {steps.map((label, i) => {
            const done = i < step;
            const current = i === step;
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors duration-300
                      ${done ? 'bg-sp-green text-white' : ''}
                      ${current ? 'bg-sp-teal text-white ring-4 ring-sp-teal/20' : ''}
                      ${!done && !current ? 'bg-gray-200 dark:bg-gray-600 text-gray-400' : ''}
                    `}
                  >
                    {done ? <Check size={14} /> : i + 1}
                  </div>
                  <span className={`text-[9px] mt-1 text-center leading-tight ${current ? 'text-sp-teal font-semibold' : 'text-gray-400'}`}>
                    {label}
                  </span>
                </div>
                {i < 3 && (
                  <div className={`flex-1 h-0.5 mx-1.5 rounded transition-colors duration-300 ${done ? 'bg-sp-green' : 'bg-gray-200 dark:bg-gray-600'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* -------- Step Content -------- */}
      <div className="flex-1 px-4 pt-5 pb-28 overflow-y-auto">
        <div
          className={`transition-all duration-200 ${
            animating
              ? slideDir === 'left'
                ? 'opacity-0 -translate-x-6'
                : 'opacity-0 translate-x-6'
              : 'opacity-100 translate-x-0'
          }`}
        >
          {step === 0 && <Step1 form={form} setForm={setForm} />}
          {step === 1 && <Step2 form={form} setForm={setForm} />}
          {step === 2 && <Step3 form={form} setForm={setForm} />}
          {step === 3 && <Step4 form={form} formatDate={formatDate} />}
        </div>
      </div>

      {/* -------- Bottom Button -------- */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-700 px-4 py-4 z-30" style={{ maxWidth: 430, margin: '0 auto' }}>
        {step < 3 ? (
          <button
            onClick={goNext}
            disabled={!canProceed()}
            className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-150 active:scale-[0.98]
              ${canProceed() ? 'bg-sp-teal text-white shadow-lg shadow-sp-teal/30' : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'}
            `}
          >
            Continue
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="w-full py-3.5 rounded-xl font-semibold text-sm bg-sp-teal text-white shadow-lg shadow-sp-teal/30 active:scale-[0.98] transition-transform"
          >
            Submit Application
          </button>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  STEP 1 - Current Home                                              */
/* ================================================================== */

function Step1({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-sp-dark">Your Current Home</h2>

      {/* Address card */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-sp-teal-light flex items-center justify-center">
            <Home size={20} className="text-sp-teal" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sp-dark">{form.currentAddress}</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="flex items-center gap-1 text-xs text-sp-green">
                <Zap size={12} /> Electricity
              </span>
              <span className="flex items-center gap-1 text-xs text-sp-green">
                <Droplets size={12} /> Water
              </span>
              <Check size={12} className="text-sp-green" />
            </div>
          </div>
        </div>
      </div>

      {/* Date picker */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-sp-teal" />
          <p className="text-sm font-semibold text-sp-dark">Last day at this address</p>
        </div>
        <div className="flex gap-2">
          <select
            value={form.lastDay.month}
            onChange={(e) => setForm((f) => ({ ...f, lastDay: { ...f.lastDay, month: e.target.value } }))}
            className="flex-1 bg-sp-gray rounded-lg px-3 py-2.5 text-sm text-sp-dark border-0 outline-none"
          >
            {months.map((m) => (
              <option key={m} value={m}>{monthNames[m]}</option>
            ))}
          </select>
          <select
            value={form.lastDay.day}
            onChange={(e) => setForm((f) => ({ ...f, lastDay: { ...f.lastDay, day: e.target.value } }))}
            className="flex-1 bg-sp-gray rounded-lg px-3 py-2.5 text-sm text-sp-dark border-0 outline-none"
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={form.lastDay.year}
            onChange={(e) => setForm((f) => ({ ...f, lastDay: { ...f.lastDay, year: e.target.value } }))}
            className="w-24 bg-sp-gray rounded-lg px-3 py-2.5 text-sm text-sp-dark border-0 outline-none"
          >
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
      </div>

      {/* Meter reading */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4">
        <p className="text-sm font-semibold text-sp-dark mb-1">Final meter reading</p>
        <p className="text-xs text-gray-400 mb-3">Submit a photo of your meter (optional)</p>
        <button className="w-full flex items-center justify-center gap-2 bg-sp-gray rounded-xl py-4 border-2 border-dashed border-gray-300 dark:border-gray-600 active:bg-gray-200 dark:active:bg-gray-600 transition-colors">
          <Camera size={20} className="text-gray-400" />
          <span className="text-sm text-gray-400">Tap to upload photo</span>
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  STEP 2 - New Home                                                  */
/* ================================================================== */

function Step2({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-sp-dark">Your New Home</h2>

      {/* Address */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4">
        <p className="text-sm font-semibold text-sp-dark mb-2">New address</p>
        <input
          type="text"
          placeholder="Search address..."
          value={form.newAddress}
          onChange={(e) => setForm((f) => ({ ...f, newAddress: e.target.value }))}
          className="w-full bg-sp-gray rounded-lg px-4 py-3 text-sm text-sp-dark placeholder:text-gray-400 dark:placeholder:text-gray-500 border-0 outline-none focus:ring-2 focus:ring-sp-teal/30"
        />
      </div>

      {/* Property Type */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Building2 size={16} className="text-sp-teal" />
          <p className="text-sm font-semibold text-sp-dark">Property type</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {propertyTypes.map((pt) => (
            <button
              key={pt}
              onClick={() => setForm((f) => ({ ...f, propertyType: pt }))}
              className={`py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                ${form.propertyType === pt
                  ? 'bg-sp-teal text-white shadow-md shadow-sp-teal/20'
                  : 'bg-sp-gray text-sp-dark hover:bg-gray-200 dark:hover:bg-gray-600'
                }
              `}
            >
              {pt}
            </button>
          ))}
        </div>
      </div>

      {/* Move-in date */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={16} className="text-sp-teal" />
          <p className="text-sm font-semibold text-sp-dark">Move-in date</p>
        </div>
        <div className="flex gap-2">
          <select
            value={form.moveInDate.month}
            onChange={(e) => setForm((f) => ({ ...f, moveInDate: { ...f.moveInDate, month: e.target.value } }))}
            className="flex-1 bg-sp-gray rounded-lg px-3 py-2.5 text-sm text-sp-dark border-0 outline-none"
          >
            {months.map((m) => (
              <option key={m} value={m}>{monthNames[m]}</option>
            ))}
          </select>
          <select
            value={form.moveInDate.day}
            onChange={(e) => setForm((f) => ({ ...f, moveInDate: { ...f.moveInDate, day: e.target.value } }))}
            className="flex-1 bg-sp-gray rounded-lg px-3 py-2.5 text-sm text-sp-dark border-0 outline-none"
          >
            {days.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
          <select
            value={form.moveInDate.year}
            onChange={(e) => setForm((f) => ({ ...f, moveInDate: { ...f.moveInDate, year: e.target.value } }))}
            className="w-24 bg-sp-gray rounded-lg px-3 py-2.5 text-sm text-sp-dark border-0 outline-none"
          >
            <option value="2026">2026</option>
            <option value="2027">2027</option>
          </select>
        </div>
      </div>

      {/* Same utilities toggle */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-sp-dark">Same utilities</p>
          <p className="text-xs text-gray-400">Electricity &amp; Water</p>
        </div>
        <button
          onClick={() => setForm((f) => ({ ...f, sameUtilities: !f.sameUtilities }))}
          className={`w-12 h-7 rounded-full relative transition-colors duration-200 ${form.sameUtilities ? 'bg-sp-teal' : 'bg-gray-300 dark:bg-gray-600'}`}
        >
          <div
            className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${
              form.sameUtilities ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </button>
      </div>
    </div>
  );
}

/* ================================================================== */
/*  STEP 3 - GIRO Transfer                                            */
/* ================================================================== */

function Step3({ form, setForm }: { form: FormData; setForm: React.Dispatch<React.SetStateAction<FormData>> }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-sp-dark">GIRO Transfer</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-sp-teal-light flex items-center justify-center">
            <CreditCard size={20} className="text-sp-teal" />
          </div>
          <div>
            <p className="text-sm font-semibold text-sp-dark">Transfer your GIRO automatically?</p>
            <p className="text-xs text-gray-400 mt-0.5">Current bank: DBS ****1234</p>
          </div>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-between bg-sp-gray rounded-xl px-4 py-3 mb-3">
          <span className="text-sm text-sp-dark">Yes, transfer to new address</span>
          <button
            onClick={() => setForm((f) => ({ ...f, transferGiro: !f.transferGiro }))}
            className={`w-12 h-7 rounded-full relative transition-colors duration-200 ${form.transferGiro ? 'bg-sp-teal' : 'bg-gray-300 dark:bg-gray-600'}`}
          >
            <div
              className={`absolute top-0.5 w-6 h-6 rounded-full bg-white shadow transition-transform duration-200 ${
                form.transferGiro ? 'translate-x-5' : 'translate-x-0.5'
              }`}
            />
          </button>
        </div>

        {form.transferGiro && (
          <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-3 flex items-start gap-2">
            <Sparkles size={14} className="text-blue-500 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 dark:text-blue-300">Your existing GIRO arrangement will be transferred seamlessly to your new address.</p>
          </div>
        )}

        {!form.transferGiro && (
          <button className="text-sm text-sp-teal font-medium flex items-center gap-1 mt-1">
            Set up new GIRO instead <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
}

/* ================================================================== */
/*  STEP 4 - Confirmation                                              */
/* ================================================================== */

function Step4({ form, formatDate }: { form: FormData; formatDate: (d: { month: string; day: string; year: string }) => string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-sp-dark">Confirm Details</h2>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 overflow-hidden">
        {/* Close */}
        <div className="p-4 border-b border-gray-50 dark:border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Close Account</p>
          <p className="text-sm font-semibold text-sp-dark">{form.currentAddress}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Last day: {formatDate(form.lastDay)}</p>
        </div>
        {/* Open */}
        <div className="p-4 border-b border-gray-50 dark:border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Open Account</p>
          <p className="text-sm font-semibold text-sp-dark">{form.newAddress || '---'}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">Move-in: {formatDate(form.moveInDate)}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Property: {form.propertyType}</p>
        </div>
        {/* GIRO */}
        <div className="p-4 border-b border-gray-50 dark:border-gray-700">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">GIRO</p>
          <p className="text-sm font-semibold text-sp-dark">
            {form.transferGiro ? 'Transferred from DBS ****1234' : 'Not transferring'}
          </p>
        </div>
        {/* Processing */}
        <div className="p-4 bg-sp-teal-light/50">
          <div className="flex items-center gap-2">
            <Clock size={14} className="text-sp-teal" />
            <p className="text-xs text-sp-teal font-semibold">Estimated processing: 1-2 business days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
