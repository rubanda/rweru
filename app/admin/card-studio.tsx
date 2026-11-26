"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { CrescentMark } from "@/components/logo";
import "./card-studio.css";

const CRESCENT_PATH_1 =
  "M31.2 24.8C47.9 11.4 72.3 13.8 86.1 30.3C92.3 37.7 95.6 46.8 96.0 56.2C92.7 38.6 77.3 25.3 58.7 25.3C47.8 25.3 37.9 29.9 31.0 37.3C30.4 33.1 30.5 28.9 31.2 24.8Z";
const CRESCENT_PATH_2 =
  "M82.4 43.2C87.4 64.6 74.2 86.1 52.8 91.1C43.4 93.3 33.7 92.0 25.3 87.7C42.4 93.1 61.2 85.8 70.5 69.8C76.0 60.4 76.9 49.5 73.8 39.8C77.0 40.7 79.8 41.8 82.4 43.2Z";
const CRESCENT_PATH_3 =
  "M40.8 78.6C19.7 72.2 7.8 49.9 14.2 28.8C17.0 19.6 22.9 11.9 30.8 6.9C17.6 19.1 14.6 39.1 23.9 55.1C29.4 64.5 38.4 70.8 48.3 72.9C45.8 75.1 43.3 77.0 40.8 78.6Z";

const QR_SIZE = 29;

/**
 * Minimal, self-contained Byte-mode QR Encoder (Version 3-L: 29x29 modules).
 */
function generateQrMatrix(text: string): number[][] {
  const DATA_CW = 55;
  const ECC_CW = 15;

  const EXP = new Uint8Array(512);
  const LOG = new Uint8Array(256);
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];

  const gfMul = (a: number, b: number) =>
    a === 0 || b === 0 ? 0 : EXP[LOG[a] + LOG[b]];

  const getGenPoly = (deg: number) => {
    let poly = [1];
    for (let i = 0; i < deg; i++) {
      const next = new Array(poly.length + 1).fill(0);
      const factor = EXP[i];
      for (let j = 0; j < poly.length; j++) {
        next[j] ^= poly[j];
        next[j + 1] ^= gfMul(poly[j], factor);
      }
      poly = next;
    }
    return poly;
  };

  const computeECC = (data: Uint8Array, eccLen: number) => {
    const gen = getGenPoly(eccLen);
    const res = new Uint8Array(data.length + eccLen);
    res.set(data);
    for (let i = 0; i < data.length; i++) {
      const coef = res[i];
      if (coef !== 0) {
        for (let j = 0; j < gen.length; j++) {
          res[i + j] ^= gfMul(gen[j], coef);
        }
      }
    }
    return res.slice(data.length);
  };

  const bytes = new TextEncoder().encode(text);
  const bits: number[] = [];
  const pushBits = (val: number, len: number) => {
    for (let i = len - 1; i >= 0; i--) bits.push((val >>> i) & 1);
  };

  pushBits(0b0100, 4);
  pushBits(bytes.length, 8);
  for (const b of bytes) pushBits(b, 8);

  const maxBits = DATA_CW * 8;
  pushBits(0, Math.min(4, maxBits - bits.length));
  while (bits.length % 8 !== 0) bits.push(0);

  let padToggle = true;
  while (bits.length < maxBits) {
    pushBits(padToggle ? 0xec : 0x11, 8);
    padToggle = !padToggle;
  }

  const codewords = new Uint8Array(DATA_CW);
  for (let i = 0; i < DATA_CW; i++) {
    let v = 0;
    for (let b = 0; b < 8; b++) v = (v << 1) | bits[i * 8 + b];
    codewords[i] = v;
  }

  const ecc = computeECC(codewords, ECC_CW);
  const fullStream = new Uint8Array(DATA_CW + ECC_CW);
  fullStream.set(codewords);
  fullStream.set(ecc, DATA_CW);

  const grid = Array.from({ length: QR_SIZE }, () =>
    new Array<number>(QR_SIZE).fill(-1)
  );
  const isFunc = Array.from({ length: QR_SIZE }, () => new Uint8Array(QR_SIZE));

  const setFunc = (r: number, c: number, val: boolean | number) => {
    if (r >= 0 && r < QR_SIZE && c >= 0 && c < QR_SIZE) {
      grid[r][c] = val ? 1 : 0;
      isFunc[r][c] = 1;
    }
  };

  const drawFinder = (r0: number, c0: number) => {
    for (let r = -1; r <= 7; r++) {
      for (let c = -1; c <= 7; c++) {
        const inOuter = r >= 0 && r <= 6 && c >= 0 && c <= 6;
        const onBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const inCore = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        setFunc(r0 + r, c0 + c, inOuter && (onBorder || inCore));
      }
    }
  };

  drawFinder(0, 0);
  drawFinder(0, QR_SIZE - 7);
  drawFinder(QR_SIZE - 7, 0);

  for (let r = -2; r <= 2; r++) {
    for (let c = -2; c <= 2; c++) {
      const isDark = Math.max(Math.abs(r), Math.abs(c)) !== 1;
      setFunc(22 + r, 22 + c, isDark);
    }
  }

  for (let i = 8; i < QR_SIZE - 8; i++) {
    setFunc(6, i, i % 2 === 0);
    setFunc(i, 6, i % 2 === 0);
  }

  setFunc(QR_SIZE - 8, 8, 1);
  for (let i = 0; i < 9; i++) {
    if (!isFunc[8][i]) setFunc(8, i, 0);
    if (!isFunc[i][8]) setFunc(i, 8, 0);
  }
  for (let i = 0; i < 8; i++) {
    setFunc(8, QR_SIZE - 1 - i, 0);
    setFunc(QR_SIZE - 1 - i, 8, 0);
  }

  let bitIdx = 0;
  const totalBits = fullStream.length * 8;
  let upward = true;

  for (let right = QR_SIZE - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let step = 0; step < QR_SIZE; step++) {
      const r = upward ? QR_SIZE - 1 - step : step;
      for (let dx = 0; dx < 2; dx++) {
        const c = right - dx;
        if (!isFunc[r][c]) {
          let bit = 0;
          if (bitIdx < totalBits) {
            bit = (fullStream[bitIdx >>> 3] >>> (7 - (bitIdx & 7))) & 1;
            bitIdx++;
          }
          if ((r + c) % 2 === 0) bit ^= 1;
          grid[r][c] = bit;
        }
      }
    }
    upward = !upward;
  }

  const fmtBits = [1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0];
  const fmtCoords1 = [
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
    [8, 5],
    [8, 7],
    [8, 8],
    [7, 8],
    [5, 8],
    [4, 8],
    [3, 8],
    [2, 8],
    [1, 8],
    [0, 8],
  ];
  const fmtCoords2 = [
    [QR_SIZE - 1, 8],
    [QR_SIZE - 2, 8],
    [QR_SIZE - 3, 8],
    [QR_SIZE - 4, 8],
    [QR_SIZE - 5, 8],
    [QR_SIZE - 6, 8],
    [QR_SIZE - 7, 8],
    [8, QR_SIZE - 8],
    [8, QR_SIZE - 7],
    [8, QR_SIZE - 6],
    [8, QR_SIZE - 5],
    [8, QR_SIZE - 4],
    [8, QR_SIZE - 3],
    [8, QR_SIZE - 2],
    [8, QR_SIZE - 1],
  ];
  for (let i = 0; i < 15; i++) {
    grid[fmtCoords1[i][0]][fmtCoords1[i][1]] = fmtBits[i];
    grid[fmtCoords2[i][0]][fmtCoords2[i][1]] = fmtBits[i];
  }

  return grid;
}

const DEFAULTS = {
  name: "Moise Muhire",
  title: "Founder",
  phone: "+250 78X XXX XXX",
  showPhone: true,
  email: "moise@rwerusynapse.rw",
  location: "Kigali, Rwanda",
  mission: "Focused software for commerce and operations.",
};

export function CardStudio() {
  const [studioDark, setStudioDark] = useState(false);
  const [stock, setStock] = useState<"obsidian" | "cotton">("obsidian");
  const [showCrops, setShowCrops] = useState(false);

  const [name, setName] = useState(DEFAULTS.name);
  const [title, setTitle] = useState(DEFAULTS.title);
  const [phone, setPhone] = useState(DEFAULTS.phone);
  const [showPhone, setShowPhone] = useState(DEFAULTS.showPhone);
  const [email, setEmail] = useState(DEFAULTS.email);
  const [location, setLocation] = useState(DEFAULTS.location);
  const [mission, setMission] = useState(DEFAULTS.mission);

  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const qrGrid = useMemo(() => generateQrMatrix("https://rwerusynapse.rw"), []);

  const displayName = name.trim() || DEFAULTS.name;
  const displayTitle = title.trim() || DEFAULTS.title;
  const displayEmail = email.trim() || DEFAULTS.email;
  const displayPhone = phone.trim();
  const displayLocation = location.trim() || DEFAULTS.location;
  const displayMission = mission.trim() || DEFAULTS.mission;

  function showToast(msg: string) {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3200);
  }

  function resetDefaults() {
    setName(DEFAULTS.name);
    setTitle(DEFAULTS.title);
    setPhone(DEFAULTS.phone);
    setShowPhone(DEFAULTS.showPhone);
    setEmail(DEFAULTS.email);
    setLocation(DEFAULTS.location);
    setMission(DEFAULTS.mission);
    showToast("Reset card fields to default executive details.");
  }

  async function copyLogoSVG() {
    const svgCode = `<svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path d="${CRESCENT_PATH_1}" fill="#111827"/>\n  <path d="${CRESCENT_PATH_2}" fill="#111827"/>\n  <path d="${CRESCENT_PATH_3}" fill="#111827"/>\n</svg>`;
    try {
      await navigator.clipboard.writeText(svgCode);
      showToast(
        "Copied RweruSynapse Crescent SVG — paste directly in Canva or Figma!"
      );
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = svgCode;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      showToast(
        "Copied RweruSynapse Crescent SVG — paste directly in Canva or Figma!"
      );
    }
  }

  function downloadCardPNG(side: "front" | "back") {
    const width = 1050;
    const height = 600;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isObsidian = stock === "obsidian";
    const bgColor = isObsidian ? "#101115" : "#F6F5F0";
    const inkPrimary = isObsidian ? "#F4F4F6" : "#111318";
    const inkMuted = isObsidian
      ? "rgba(244, 244, 246, 0.62)"
      : "rgba(17, 19, 24, 0.62)";
    const inkSubtle = isObsidian
      ? "rgba(244, 244, 246, 0.42)"
      : "rgba(17, 19, 24, 0.42)";

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = isObsidian
      ? "rgba(255,255,255,0.025)"
      : "rgba(0,0,0,0.025)";
    for (let x = 0; x < width; x += 6) {
      for (let y = 0; y < height; y += 6) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }

    if (showCrops) {
      ctx.strokeStyle = inkSubtle;
      ctx.lineWidth = 2;
      const m = 24;
      const len = 24;
      ctx.beginPath();
      ctx.moveTo(m, m + len);
      ctx.lineTo(m, m);
      ctx.lineTo(m + len, m);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - m - len, m);
      ctx.lineTo(width - m, m);
      ctx.lineTo(width - m, m + len);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(m, height - m - len);
      ctx.lineTo(m, height - m);
      ctx.lineTo(m + len, height - m);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(width - m - len, height - m);
      ctx.lineTo(width - m, height - m);
      ctx.lineTo(width - m, height - m - len);
      ctx.stroke();
    }

    const drawCrescent = (cx: number, cy: number, size: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      const scale = size / 100;
      ctx.scale(scale, scale);
      ctx.fillStyle = inkPrimary;
      ctx.fill(new Path2D(CRESCENT_PATH_1));
      ctx.fill(new Path2D(CRESCENT_PATH_2));
      ctx.fill(new Path2D(CRESCENT_PATH_3));
      ctx.restore();
    };

    const pad = 72;

    if (side === "front") {
      drawCrescent(pad, pad, 52);
      ctx.fillStyle = inkPrimary;
      ctx.font = "700 22px Inter, sans-serif";
      ctx.textBaseline = "middle";
      ctx.fillText("R W E R U S Y N A P S E", pad + 72, pad + 27);

      ctx.strokeStyle = isObsidian
        ? "rgba(255,255,255,0.2)"
        : "rgba(17,19,24,0.2)";
      ctx.lineWidth = 2;
      ctx.strokeRect(width - pad - 68, pad + 6, 68, 38);
      ctx.fillStyle = inkMuted;
      ctx.font = '500 18px "JetBrains Mono", monospace';
      ctx.textAlign = "center";
      ctx.fillText("R/S", width - pad - 34, pad + 26);

      ctx.textAlign = "left";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = inkPrimary;
      ctx.font = "700 46px Inter, sans-serif";
      ctx.fillText(displayName, pad, height - pad - 36);

      ctx.fillStyle = inkMuted;
      ctx.font = "500 24px Inter, sans-serif";
      ctx.fillText(displayTitle, pad, height - pad);

      ctx.textAlign = "right";
      ctx.font = '400 21px "JetBrains Mono", monospace';
      let yCursor = height - pad;

      ctx.fillStyle = inkSubtle;
      ctx.fillText(displayLocation, width - pad, yCursor);
      yCursor -= 32;

      ctx.fillStyle = inkMuted;
      ctx.fillText("rwerusynapse.rw", width - pad, yCursor);
      yCursor -= 32;

      if (showPhone && displayPhone.length > 0) {
        ctx.fillStyle = inkPrimary;
        ctx.fillText(`WA ${displayPhone}`, width - pad, yCursor);
        yCursor -= 32;
      }

      ctx.fillStyle = inkPrimary;
      ctx.fillText(displayEmail, width - pad, yCursor);
    } else {
      ctx.textBaseline = "top";
      ctx.fillStyle = inkSubtle;
      ctx.font = '500 18px "JetBrains Mono", monospace';
      ctx.textAlign = "left";
      ctx.fillText("R / S   S T U D I O", pad, pad);
      ctx.textAlign = "right";
      ctx.fillText("E S T .   K I G A L I", width - pad, pad);

      const emblemSize = 112;
      drawCrescent((width - emblemSize) / 2, 168, emblemSize);

      ctx.textAlign = "center";
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = inkPrimary;
      ctx.font = "700 26px Inter, sans-serif";
      ctx.fillText("R W E R U S Y N A P S E", width / 2, 330);

      ctx.fillStyle = inkMuted;
      ctx.font = "400 22px Inter, sans-serif";
      ctx.fillText(displayMission, width / 2, 372);

      ctx.textAlign = "left";
      ctx.fillStyle = inkSubtle;
      ctx.font = '500 17px "JetBrains Mono", monospace';
      ctx.fillText("SCAN TO CONNECT", pad, height - pad - 34);
      ctx.fillStyle = inkPrimary;
      ctx.font = '500 22px "JetBrains Mono", monospace';
      ctx.fillText("rwerusynapse.rw", pad, height - pad);

      const qrSize = 96;
      const qrX = width - pad - qrSize - 14;
      const qrY = height - pad - qrSize - 10;

      ctx.fillStyle = isObsidian
        ? "rgba(255,255,255,0.08)"
        : "rgba(17,19,24,0.05)";
      ctx.fillRect(qrX - 12, qrY - 12, qrSize + 24, qrSize + 24);

      const cell = qrSize / QR_SIZE;
      ctx.fillStyle = inkPrimary;
      for (let r = 0; r < QR_SIZE; r++) {
        for (let c = 0; c < QR_SIZE; c++) {
          if (qrGrid[r][c] === 1) {
            ctx.fillRect(
              qrX + c * cell,
              qrY + r * cell,
              Math.ceil(cell),
              Math.ceil(cell)
            );
          }
        }
      }
    }

    const link = document.createElement("a");
    link.download = `RweruSynapse-MoiseMuhire-${side}-${stock}-300dpi.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    showToast(`Downloaded 300 DPI ${side.toUpperCase()} card PNG!`);
  }

  const stockClass = stock === "obsidian" ? "stock-obsidian" : "stock-cotton";

  return (
    <div
      className={
        studioDark
          ? "dark min-h-screen flex flex-col bg-[#0A0B0E] text-neutral-100 transition-colors"
          : "min-h-screen flex flex-col bg-[#F7F7F5] text-neutral-900 transition-colors"
      }
    >
      {/* Toast Notification */}
      <div
        className={`no-print fixed bottom-6 right-6 z-50 transition-all duration-300 pointer-events-none ${
          toastMsg ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0"
        }`}
      >
        <div className="bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs sm:text-sm font-medium border border-neutral-800 dark:border-neutral-200">
          <svg
            className="w-4 h-4 text-emerald-400 dark:text-emerald-600 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>{toastMsg ?? ""}</span>
        </div>
      </div>

      {/* Top Studio Bar */}
      <header className="no-print w-full border-b border-[#E4E4E0] dark:border-[#222631] bg-[#F7F7F5]/85 dark:bg-[#0A0B0E]/85 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center p-1.5 shadow-xs hover:opacity-85 transition-opacity"
              title="Back to RweruSynapse"
            >
              <CrescentMark className="w-full h-full" />
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <span className="font-bold tracking-tight">RWERUSYNAPSE</span>
              <span className="text-neutral-300 dark:text-neutral-700">/</span>
              <span className="text-neutral-500 dark:text-neutral-400 hidden sm:inline">
                Executive Print Identity
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <button
              type="button"
              onClick={copyLogoSVG}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white dark:bg-[#12141A] border border-[#E4E4E0] dark:border-[#222631] hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
              title="Copy RweruSynapse Crescent SVG for Canva or Figma"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
              <span className="hidden md:inline">Copy Logo SVG</span>
              <span className="md:hidden">SVG</span>
            </button>

            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:opacity-90 transition-opacity shadow-xs cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              <span>Print / Save PDF</span>
            </button>

            <button
              type="button"
              onClick={() => setStudioDark((prev) => !prev)}
              className="p-2 rounded-xl bg-white dark:bg-[#12141A] border border-[#E4E4E0] dark:border-[#222631] text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              title="Toggle Studio Light/Dark UI"
            >
              {studioDark ? (
                <svg
                  className="w-4 h-4 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="grow max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        {/* Top Control Strip */}
        <div className="no-print flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-[#12141A] border border-[#E4E4E0] dark:border-[#222631] rounded-2xl p-4 sm:px-6 shadow-2xs">
          <div className="space-y-0.5">
            <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Card Stock &amp; Finish
            </div>
            <div className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Standard 3.5&quot; × 2&quot; (85mm × 55mm) • 600 GSM Cotton / Matte
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-[#E4E4E0] dark:border-[#222631]">
              <button
                type="button"
                onClick={() => setStock("obsidian")}
                className={
                  stock === "obsidian"
                    ? "px-3.5 py-1.5 rounded-lg text-xs font-medium bg-neutral-900 text-white shadow-xs transition-all cursor-pointer"
                    : "px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer"
                }
              >
                Obsidian Matte Black
              </button>
              <button
                type="button"
                onClick={() => setStock("cotton")}
                className={
                  stock === "cotton"
                    ? "px-3.5 py-1.5 rounded-lg text-xs font-medium bg-white text-neutral-900 shadow-xs transition-all cursor-pointer"
                    : "px-3.5 py-1.5 rounded-lg text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all cursor-pointer"
                }
              >
                Architectural Warm White
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowCrops((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-white dark:bg-[#12141A] border border-[#E4E4E0] dark:border-[#222631] hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors cursor-pointer"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  showCrops
                    ? "bg-emerald-500"
                    : "bg-neutral-300 dark:bg-neutral-700"
                }`}
              />
              <span>Print Crop Marks</span>
            </button>
          </div>
        </div>

        {/* Front & Back Business Card Stage */}
        <section
          className={`print-sheet grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 items-start justify-items-center ${
            showCrops ? "show-crops" : ""
          }`}
        >
          {/* Front Face */}
          <div className="w-full max-w-[540px] space-y-3">
            <div className="no-print flex items-center justify-between px-1">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                01 — Front Face
              </span>
              <button
                type="button"
                onClick={() => downloadCardPNG("front")}
                className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Download PNG (300 DPI)
              </button>
            </div>

            <div
              className={`business-card ${stockClass} p-6 sm:p-8 flex flex-col justify-between select-none`}
            >
              <span className="crop-mark top-2 left-2 border-t border-l border-current opacity-40" />
              <span className="crop-mark top-2 right-2 border-t border-r border-current opacity-40" />
              <span className="crop-mark bottom-2 left-2 border-b border-l border-current opacity-40" />
              <span className="crop-mark bottom-2 right-2 border-b border-r border-current opacity-40" />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 shrink-0">
                    <CrescentMark className="w-full h-full" />
                  </div>
                  <span className="font-bold tracking-[0.22em] text-[11px] sm:text-xs">
                    RWERUSYNAPSE
                  </span>
                </div>

                <div
                  className={`px-2 py-0.5 rounded border text-[10px] font-mono tracking-wider opacity-75 ${
                    stock === "obsidian"
                      ? "border-white/15"
                      : "border-neutral-900/15"
                  }`}
                >
                  R/S
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pt-4">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight leading-none">
                    {displayName}
                  </h2>
                  <p className="text-xs sm:text-[13px] font-medium opacity-65 tracking-wide">
                    {displayTitle}
                  </p>
                </div>

                <div className="space-y-1 text-[11px] sm:text-xs font-mono sm:text-right opacity-85 leading-snug">
                  <div>{displayEmail}</div>
                  {showPhone && displayPhone.length > 0 && (
                    <div className="flex sm:justify-end items-center gap-1.5">
                      <span className="opacity-50 text-[10px]">WA</span>
                      <span>{displayPhone}</span>
                    </div>
                  )}
                  <div className="opacity-75">rwerusynapse.rw</div>
                  <div className="opacity-55 text-[10px] sm:text-[11px]">
                    {displayLocation}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Back Face */}
          <div className="w-full max-w-[540px] space-y-3">
            <div className="no-print flex items-center justify-between px-1">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                02 — Back Face
              </span>
              <button
                type="button"
                onClick={() => downloadCardPNG("back")}
                className="text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white underline underline-offset-4 cursor-pointer"
              >
                Download PNG (300 DPI)
              </button>
            </div>

            <div
              className={`business-card ${stockClass} p-6 sm:p-8 flex flex-col justify-between select-none`}
            >
              <span className="crop-mark top-2 left-2 border-t border-l border-current opacity-40" />
              <span className="crop-mark top-2 right-2 border-t border-r border-current opacity-40" />
              <span className="crop-mark bottom-2 left-2 border-b border-l border-current opacity-40" />
              <span className="crop-mark bottom-2 right-2 border-b border-r border-current opacity-40" />

              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono tracking-[0.25em] uppercase opacity-45">
                  R/S STUDIO
                </span>
                <span className="text-[10px] font-mono opacity-45">
                  EST. KIGALI
                </span>
              </div>

              <div className="my-auto flex flex-col items-center text-center px-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 mb-2.5">
                  <CrescentMark className="w-full h-full" />
                </div>
                <div className="font-bold tracking-[0.26em] text-xs sm:text-sm">
                  RWERUSYNAPSE
                </div>
                <p className="text-[11px] sm:text-xs opacity-65 mt-1.5 max-w-[290px] leading-relaxed">
                  {displayMission}
                </p>
              </div>

              <div className="flex items-end justify-between pt-2">
                <div className="space-y-0.5">
                  <div className="text-[10px] font-mono uppercase tracking-widest opacity-45">
                    Scan to connect
                  </div>
                  <div className="text-xs font-mono font-medium tracking-tight opacity-85">
                    rwerusynapse.rw
                  </div>
                </div>

                <div
                  className={
                    stock === "obsidian"
                      ? "p-1.5 rounded-lg bg-white/10 border border-white/15 backdrop-blur-xs"
                      : "p-1.5 rounded-lg bg-neutral-900/5 border border-neutral-900/12"
                  }
                  title="Scannable QR Code → https://rwerusynapse.rw"
                >
                  <svg
                    viewBox="0 0 29 29"
                    shapeRendering="crispEdges"
                    className="w-10 h-10 sm:w-11 sm:h-11 block"
                  >
                    {qrGrid.map((row, r) =>
                      row.map((cell, c) =>
                        cell === 1 ? (
                          <rect
                            key={`${r}-${c}`}
                            x={c}
                            y={r}
                            width={1}
                            height={1}
                            fill="currentColor"
                          />
                        ) : null
                      )
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Live Inline Text Customizer Panel */}
        <section className="no-print bg-white dark:bg-[#12141A] border border-[#E4E4E0] dark:border-[#222631] rounded-2xl p-6 sm:p-8 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 mb-6 border-b border-[#E4E4E0] dark:border-[#222631]">
            <div>
              <h3 className="text-base font-bold tracking-tight">
                Live Card Customizer
              </h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                Edit your details below—updates render instantly on both card
                faces and PNG exports.
              </p>
            </div>
            <button
              type="button"
              onClick={resetDefaults}
              className="text-xs font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-white self-start sm:self-auto cursor-pointer"
            >
              Reset to Default
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="space-y-1.5">
              <label
                htmlFor="input-name"
                className="block text-xs font-medium text-neutral-600 dark:text-neutral-400"
              >
                Full Name
              </label>
              <input
                id="input-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F7F7F5] dark:bg-[#0A0B0E] border border-[#E4E4E0] dark:border-[#222631] focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="input-title"
                className="block text-xs font-medium text-neutral-600 dark:text-neutral-400"
              >
                Title / Role
              </label>
              <input
                id="input-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F7F7F5] dark:bg-[#0A0B0E] border border-[#E4E4E0] dark:border-[#222631] focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="input-phone"
                  className="block text-xs font-medium text-neutral-600 dark:text-neutral-400"
                >
                  WhatsApp / Phone
                </label>
                <label className="inline-flex items-center gap-1.5 text-[11px] text-neutral-500 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={showPhone}
                    onChange={(e) => setShowPhone(e.target.checked)}
                    className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
                  />
                  <span>Show on card</span>
                </label>
              </div>
              <input
                id="input-phone"
                type="text"
                value={phone}
                placeholder="+250 788 000 000"
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-sm font-mono bg-[#F7F7F5] dark:bg-[#0A0B0E] border border-[#E4E4E0] dark:border-[#222631] focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="input-email"
                className="block text-xs font-medium text-neutral-600 dark:text-neutral-400"
              >
                Direct Email
              </label>
              <input
                id="input-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-sm font-mono bg-[#F7F7F5] dark:bg-[#0A0B0E] border border-[#E4E4E0] dark:border-[#222631] focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="input-location"
                className="block text-xs font-medium text-neutral-600 dark:text-neutral-400"
              >
                City &amp; Country
              </label>
              <input
                id="input-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F7F7F5] dark:bg-[#0A0B0E] border border-[#E4E4E0] dark:border-[#222631] focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="input-mission"
                className="block text-xs font-medium text-neutral-600 dark:text-neutral-400"
              >
                Back Card Mission Line
              </label>
              <input
                id="input-mission"
                type="text"
                value={mission}
                onChange={(e) => setMission(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl text-sm bg-[#F7F7F5] dark:bg-[#0A0B0E] border border-[#E4E4E0] dark:border-[#222631] focus:outline-none focus:border-neutral-900 dark:focus:border-white transition-colors"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="no-print border-t border-[#E4E4E0] dark:border-[#222631] py-6 mt-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>RWERUSYNAPSE (R/S) — Kigali, Rwanda</span>
          <span>
            Print Tip: Use <strong>Download PNG (300 DPI)</strong> for local
            print shops in Kigali or <strong>Print / Save PDF</strong> for
            instant proof sheets.
          </span>
        </div>
      </footer>
    </div>
  );
}
