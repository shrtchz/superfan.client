/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ArrowLeft } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

export default function ForgotPassword() {
  const { contactType: storeContactType, contact: storeContact } = useAuthStore();
  const [step, setStep] = useState<"contact" | "code">("contact");
  // Initialize directly with store values
  const [contactType, setContactType] = useState<'email' | 'phone'>(storeContactType);
  const [inputValue, setInputValue] = useState(storeContact);

  const [otp, setOtp] = useState(Array(6).fill(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const params = useParams();
  const locale = params.locale as string;
  
  const t = useTranslations('ForgotPassword');

  // Initialize the ref array
  useEffect(() => {
    inputsRef.current = inputsRef.current.slice(0, 6);
  }, []);

  const formatPhoneNumber = (phone: string): string => {
    // Remove all non-digit characters
    const cleaned = phone.replace(/\D/g, '');
    
    // Format based on the pattern in your image: +234 811 1834 330
    if (cleaned.startsWith('234') && cleaned.length >= 10) {
      const rest = cleaned.slice(3);
      return `+234 (0) ${rest.slice(0, 3)} ${rest.slice(3, 7)} ${rest.slice(7, 10)}`;
    } else if (cleaned.startsWith('0') && cleaned.length >= 10) {
      const rest = cleaned.slice(1);
      return `+234 (0) ${rest.slice(0, 3)} ${rest.slice(3, 7)} ${rest.slice(7, 10)}`;
    }
    
    // Return original if doesn't match expected format
    return phone;
  };

  const getDisplayContact = (): string => {
    if (contactType === 'phone') {
      return formatPhoneNumber(inputValue);
    }
    return inputValue;
  };

  const handleSendCode = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue) return;
    setStep("code");
    setTimeout(() => inputsRef.current[0]?.focus(), 60);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const next = [...otp];
    next[index] = value;
    setOtp(next);
    if (value && index < inputsRef.current.length - 1) inputsRef.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") inputsRef.current[index - 1]?.focus();
      else {
        const next = [...otp];
        next[index] = "";
        setOtp(next);
      }
    }
  };

  // Proper ref callback function
  const setInputRef = (index: number) => (el: HTMLInputElement | null) => {
    inputsRef.current[index] = el;
  };

  const renderContactCard = () => (
    <form onSubmit={handleSendCode} className="w-full max-w-md">
      <div className="flex mb-4 gap-4 items-center">
        <Link href={`/${locale}/sign-in`}>
          <ArrowLeft className="cursor-pointer" size={20} />
        </Link>
        <h3 className="text-xl font-medium text-gray-900">{t('resetPassword')}</h3>
      </div>

      <p className="mt-1 text-sm text-gray-500">
        {t('enterContact', { contactType: t(contactType) })}{" "}
        <span className="font-semibold">{t('weWillSendCode')}</span>
      </p>

      <label className="mt-6 block relative">
        <input
          aria-label={contactType === "phone" ? t('phoneNumber') : t('emailAddress')}
          type={contactType === "phone" ? "tel" : "email"}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={contactType === "phone" ? t('phoneNumber') : t('emailAddress')}
          className="w-full rounded-xl border border-gray-200 px-4 py-4 pr-14 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200"
        />
        <button
          type="submit"
          aria-label={t('sendCode')}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-10 w-10 rounded-full bg-white shadow-md flex items-center justify-center border border-gray-200"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M13 6l6 6-6 6" stroke="#111827" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </label>
    </form>
  );

  const renderCodeScreen = () => {
    const displayContact = getDisplayContact();

    return (
      <div className="w-full max-w-md">
        <div>
          <div className="flex gap-2 items-center justify-center relative">
            <button onClick={() => setStep("contact")} aria-label={t('back')} className="rounded-md p-2 text-gray-700 hover:bg-gray-50 absolute left-0">
              <ArrowLeft size={20} />
            </button>
            <h3 className="text-xl font-medium text-gray-900">{t('enterCode')}</h3>
          </div>

          <div className="mt-4 flex justify-center items-center gap-3">
            <div className="px-4 py-2 rounded-full font-medium text-gray-900 border border-gray-100 text-sm">
              {displayContact}
            </div>
          </div>

          <p className="mt-4 text-sm text-center text-gray-900">
            {t.rich('ifContactMatches', {
              contact: displayContact,
              strong: (chunks) => <span className="font-medium">{chunks}</span>
            })}
          </p>

          <div className="mt-6 grid grid-cols-6 gap-2">
            {otp.map((d, i) => (
              <input
                key={i}
                ref={setInputRef(i)}
                value={d}
                onChange={(e) => handleOtpChange(i, e.target.value.trim())}
                onKeyDown={(e) => handleOtpKeyDown(i, e)}
                maxLength={1}
                inputMode="numeric"
                className="h-14 w-14 rounded-lg border border-gray-200 text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            ))}
          </div>

          <div className="mt-4 text-sm text-center">
            <button type="button" className="text-gray-400 font-medium">
              {t('noCodeReceived')}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-md bg-white rounded-2xl shadow-lg p-6 md:p-8">
      {step === "contact" ? renderContactCard() : renderCodeScreen()}
    </div>
  );
}