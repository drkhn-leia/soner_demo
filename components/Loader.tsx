"use client";
import * as React from "react";
import Image from "next/image";
import styles from "./loader.module.css";
import { lockBodyScroll, unlockBodyScroll } from "@/app/_utils/scroll-lock";

const MIN_DELAY = 1000; // ms

export default function Loader() {
  const [visible, setVisible] = React.useState(true);
  const [exit, setExit] = React.useState(false);

  const minDoneRef = React.useRef(false);
  const readyRef = React.useRef(false);

  React.useEffect(() => {
    if (visible) {
      lockBodyScroll();
      return () => unlockBodyScroll();
    }
  }, [visible]);

  // 1) Minimum gecikme
  React.useEffect(() => {
    const t = window.setTimeout(() => {
      minDoneRef.current = true;
      maybeExit();
    }, MIN_DELAY);
    return () => window.clearTimeout(t);
  }, []);

  // 2) “Hazır” sinyali (ThemeProvider’dan)
  React.useEffect(() => {
    const onReady = () => {
      readyRef.current = true;
      maybeExit();
    };
    window.addEventListener("theme:ready", onReady, { once: true });
    return () => window.removeEventListener("theme:ready", onReady);
  }, []);

  function maybeExit() {
    if (minDoneRef.current && readyRef.current) {
      setExit(true); // eşzamanlı: paneller translate + root & brand opacity fade
      window.setTimeout(() => setVisible(false), 650); // CSS süresiyle uyumlu
    }
  }

  if (!visible) return null;

  return (
    <div
      className={[styles.root, exit ? styles.rootExit : ""].join(" ")}
      aria-hidden
    >
      {/* Üst-Alt paneller */}
      <div
        className={[styles.panel, styles.top, exit ? styles.topExit : ""].join(
          " "
        )}
      />
      <div
        className={[
          styles.panel,
          styles.bottom,
          exit ? styles.bottomExit : "",
        ].join(" ")}
      />

      {/* Orta logo */}
      <div
        className={[
          styles.brand,
          exit ? styles.brandExit : styles.brandPulse,
        ].join(" ")}
      >
        <Image
          src="/nost.png"
          alt="Loading"
          width={96}
          height={96}
          priority
          className={styles.brandImg}
        />
      </div>
    </div>
  );
}
