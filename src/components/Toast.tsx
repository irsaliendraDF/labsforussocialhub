"use client";

import { createContext, useCallback, useContext, useRef, useState } from "react";

const ToastCtx = createContext<(msg: string) => void>(() => {});

export function useToast() {
  return useContext(ToastCtx);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [msg, setMsg] = useState("");
  const [show, setShow] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const push = useCallback((m: string) => {
    setMsg(m);
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 1600);
  }, []);

  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div id="toast" className={show ? "show" : ""} role="status" aria-live="polite">
        {msg}
      </div>
    </ToastCtx.Provider>
  );
}
