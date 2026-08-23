import { motion } from "framer-motion";
import { CARDS } from "../data";
import { cardCandidates } from "../lib/media";
import SmartImg from "./SmartImg";

function FlapFace({ inner = false }) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${inner ? "kraft-inner" : "kraft"}`}
      style={{
        clipPath: "url(#envelope-flap)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transform: inner ? "rotateX(180deg)" : "none",
      }}
    >
      <div className="paper-fiber absolute inset-0 opacity-35" />
    </div>
  );
}

export default function EnvelopeScene({ opened, onOpen }) {
  return (
    <motion.button
      type="button"
      onClick={onOpen}
      className="scene-3d flex min-h-[100svh] w-full cursor-pointer flex-col items-center justify-center px-6 pt-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <svg width="0" height="0" className="absolute">
        <defs>
          <clipPath id="envelope-flap" clipPathUnits="objectBoundingBox">
            <path d="M0,0 H1 V0.07 C1,0.07 0.97,0.7 0.535,0.84 L0.552,0.93 C0.552,0.93 0.52,1 0.5,1 C0.48,1 0.448,0.93 0.448,0.93 L0.465,0.84 C0.03,0.7 0,0.07 0,0.07 Z" />
          </clipPath>
        </defs>
      </svg>

      <p className="mb-8 font-sans text-[11px] font-medium uppercase tracking-[0.38em] text-ink/40">
        {opened ? "OPENING" : "CLICK TO OPEN"}
      </p>

      <div
        className="preserve-3d relative h-[min(58vw,320px)] w-[min(92vw,520px)]"
        style={{ transform: "rotateX(12deg) rotateY(-8deg)" }}
      >
        <div className="absolute -bottom-8 left-1/2 h-12 w-[72%] -translate-x-1/2 rounded-full bg-[#6b4a2a]/28 blur-2xl" />

        <div className="kraft absolute inset-0 rounded-[3px] shadow-[18px_28px_40px_rgba(70,40,15,0.28)]">
          <div className="paper-fiber absolute inset-0 opacity-28" />
        </div>

        <div
          className="kraft absolute bottom-[8%] left-0 top-[10%] w-[15%]"
          style={{ zIndex: 8, boxShadow: "inset -10px 0 14px rgba(90,50,20,0.12)" }}
        />
        <div
          className="kraft absolute bottom-[8%] right-0 top-[10%] w-[15%]"
          style={{ zIndex: 8, boxShadow: "inset 10px 0 14px rgba(90,50,20,0.12)" }}
        />

        <div className="absolute inset-x-[9%] top-[12%] h-[70%]" style={{ zIndex: 10 }}>
          {CARDS.map((card, i) => (
            <motion.div
              key={card.id}
              className="absolute left-1/2 h-[88%] w-[78%] -translate-x-1/2 overflow-hidden rounded-[2px] border border-black/5 bg-[#f7f1e6] shadow-[0_8px_16px_rgba(60,40,20,0.12)]"
              initial={false}
              animate={
                opened
                  ? { y: -118 - i * 7, x: (i - 4) * 18, rotate: (i - 4) * 6, scale: 1.03 }
                  : { y: 6 + i * 0.8, x: 0, rotate: (i - 4) * 0.2, scale: 1 }
              }
              transition={{
                duration: 0.95,
                delay: opened ? 0.38 + i * 0.04 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ zIndex: i }}
            >
              <SmartImg
                candidates={cardCandidates(card.id, "front")}
                alt=""
                className="h-full w-full object-cover"
                fallback={
                  <div className="flex h-full flex-col justify-between p-3">
                    <span className="font-sans text-[9px] tracking-[0.28em] text-ink/35">
                      {String(card.id).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-[13px] font-medium text-ink/80">{card.title}</span>
                  </div>
                }
              />
            </motion.div>
          ))}
        </div>

        <div
          className="kraft absolute bottom-0 left-0 right-0 h-[46%] shadow-[inset_0_14px_18px_rgba(0,0,0,0.12)]"
          style={{ zIndex: 22 }}
        >
          <div className="paper-fiber absolute inset-0 opacity-28" />
          <div className="absolute left-1/2 top-[20%] h-[8px] w-[48px] -translate-x-1/2 rounded-[1px] bg-[#4a3018]/40 shadow-[inset_0_2px_2px_rgba(0,0,0,0.35)]" />
        </div>

        <motion.div
          className="preserve-3d absolute left-0 right-0 top-0 z-30 h-[78%]"
          initial={false}
          animate={{ rotateX: opened ? -158 : 0 }}
          transition={{ duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: opened ? 0.08 : 0 }}
          style={{ transformOrigin: "top center" }}
        >
          <FlapFace />
          <FlapFace inner />
        </motion.div>
      </div>

      <p className="mt-14 max-w-sm text-center font-sans text-sm leading-7 text-ink/55">
        點擊畫面，啟封這包指南。
      </p>
    </motion.button>
  );
}
