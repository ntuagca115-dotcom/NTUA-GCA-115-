import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { cardCandidates } from "../lib/media";
import SmartImg from "./SmartImg";

export default function FlipCard({ card, flipped }) {
  const [zoom, setZoom] = useState(false);
  const srcList = cardCandidates(card.id, flipped ? "back" : "front");

  return (
    <>
      <div className="relative mx-auto w-full max-w-[420px]" style={{ perspective: "1200px" }}>
        <button
          type="button"
          onClick={() => setZoom(true)}
          className="absolute right-2 top-2 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-sm transition hover:bg-black/65"
          aria-label="放大卡片"
        >
          <Search size={16} strokeWidth={1.8} />
        </button>

        <div className="relative aspect-[4/3] w-full" style={{ perspective: "1200px" }}>
          <div
            className="absolute inset-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${flipped ? 180 : 0}deg)`,
              transition: "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden rounded-[4px] border border-ink/10 bg-white shadow-[0_22px_54px_rgba(28,26,22,0.12)]"
              style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            >
              <SmartImg
                key={`${card.id}-front`}
                candidates={cardCandidates(card.id, "front")}
                alt={card.title}
                className="absolute inset-0 h-full w-full object-cover"
                fallback={
                  <div className="flex h-full flex-col justify-between bg-[#fafafa] p-7">
                    <span className="text-[10px] tracking-[0.32em] text-ink/40">{card.frontLabel}</span>
                    <p className="text-[28px] font-medium text-ink">{card.frontQuote}</p>
                  </div>
                }
              />
            </div>
            <div
              className="absolute inset-0 overflow-hidden rounded-[4px] border border-ink/10 bg-[#fafafa] text-ink shadow-[0_22px_54px_rgba(28,26,22,0.12)]"
              style={{
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden",
              }}
            >
              <SmartImg
                key={`${card.id}-back`}
                candidates={cardCandidates(card.id, "back")}
                alt={card.backTitle}
                className="absolute inset-0 h-full w-full object-cover"
                fallback={
                  <div className="flex h-full flex-col justify-between p-7">
                    <h3 className="text-2xl font-semibold">{card.backTitle}</h3>
                    <ul className="space-y-2 text-sm text-ink/70">
                      {(card.backItems || []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-[#fafafa]/96 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoom(false)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 bg-white"
              aria-label="關閉放大"
            >
              <X size={18} />
            </button>
            <motion.img
              src={srcList[0]}
              alt={flipped ? card.backTitle : card.title}
              className="max-h-[88svh] max-w-[92vw] object-contain shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
              initial={{ scale: 0.92 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
