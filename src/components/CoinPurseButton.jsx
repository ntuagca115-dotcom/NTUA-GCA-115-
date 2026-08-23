import { motion } from "framer-motion";
import { GOOGLE_FORM_URL } from "../data";

export default function CoinPurseButton({ href = GOOGLE_FORM_URL }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="點擊填寫新生茶會表單"
      className="group relative inline-flex w-full max-w-[440px] flex-col items-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
    >
      <svg viewBox="0 0 440 188" className="h-auto w-full" aria-hidden>
        <circle cx="220" cy="22" r="14" fill="none" stroke="#111111" strokeWidth="5" />
        <rect x="213" y="34" width="14" height="12" rx="3" fill="#111111" />
        <rect x="204" y="42" width="32" height="16" rx="5" fill="#111111" />
        <ellipse cx="220" cy="108" rx="198" ry="68" fill="#111111" />
        <rect x="204" y="168" width="32" height="16" rx="5" fill="#111111" />
        <path
          d="M78 108 C 150 102, 290 102, 362 108"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="2"
          strokeLinecap="round"
          className="origin-center transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:scale-y-150"
          style={{ transformBox: "fill-box" }}
        />
        <path
          d="M78 108 C 150 114, 290 114, 362 108"
          fill="none"
          stroke="#2a2a2a"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0"
          className="transition-opacity duration-300 group-hover:opacity-100"
        />
        <text
          x="220"
          y="114"
          textAnchor="middle"
          fill="#ECEAAC"
          style={{
            fontFamily: '"Noto Sans TC", "Microsoft JhengHei", sans-serif',
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0.04em",
          }}
        >
          點擊填寫新生茶會表單 ↗
        </text>
      </svg>
    </motion.a>
  );
}
