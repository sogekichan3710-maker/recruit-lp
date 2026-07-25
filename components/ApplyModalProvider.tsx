"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import ApplyModal from "./ApplyModal";

type ApplyModalContextValue = {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
};

const ApplyModalContext = createContext<ApplyModalContextValue | null>(null);

export function ApplyModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // モーダル表示中は背面スクロールを止める
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <ApplyModalContext.Provider
      value={{
        isOpen,
        openModal: () => setIsOpen(true),
        closeModal: () => setIsOpen(false),
      }}
    >
      {children}
      <ApplyModal />
    </ApplyModalContext.Provider>
  );
}

export function useApplyModal() {
  const ctx = useContext(ApplyModalContext);
  if (!ctx) {
    throw new Error("useApplyModal は ApplyModalProvider の内側で使用してください");
  }
  return ctx;
}
