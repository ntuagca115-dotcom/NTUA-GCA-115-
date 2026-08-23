import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CARDS, QR_ITEMS } from "../data";
import FlipCard from "./FlipCard";

function FaceSwitch({ flipped, setFlipped }) {
  return (
    <div className="inline-flex rounded-full border border-ink/15 bg-white p-1">
      {[
        { on: false, label: "正面" },
        { on: true, label: "反面" },
      ].map((item) => {
        const active = flipped === item.on;
        return (
          <button
            key={item.label}
            type="button"
            onClick={() => setFlipped(item.on)}
            className={`relative rounded-full px-4 py-1.5 font-sans text-[13px] font-medium ${
              active ? "text-white" : "text-ink/55"
            }`}
          >
            {active && (
              <motion.span
                layoutId="face-pill"
                className="absolute inset-0 rounded-full bg-teal"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative z-10">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Dot() {
  return <span className="mt-[13px] h-[6px] w-[6px] shrink-0 rounded-full bg-butter ring-1 ring-blush/70" />;
}

function QrEmbed() {
  return (
    <div className="grid grid-cols-2 gap-3 pt-2 sm:grid-cols-3">
      {QR_ITEMS.map((item) => (
        <a
          key={item.key}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="flex flex-col items-center rounded-[4px] border border-ink/10 bg-white p-2 text-center transition hover:border-teal"
        >
          <div className="bg-white p-1.5">
            <img src={item.file} alt={item.title} className="h-20 w-20 bg-white object-contain" />
          </div>
          <p className="mt-1 font-sans text-[11px] font-medium leading-tight">{item.title}</p>
          <p className="font-sans text-[10px] text-ink/45">{item.caption}</p>
        </a>
      ))}
    </div>
  );
}

function MapEmbed() {
  return (
    <div className="overflow-hidden rounded-[4px] border border-ink/10 bg-white">
      <iframe
        title="國立臺灣藝術大學校區地圖"
        src="https://maps.google.com/maps?q=國立臺灣藝術大學+圖文傳播藝術學系+大觀路一段59號&hl=zh-TW&z=16&output=embed"
        className="h-[220px] w-full border-0"
        loading="lazy"
      />
      <p className="px-3 py-2 font-sans text-[12px] leading-6 text-ink/60">
        220 新北市板橋區大觀路一段 59 號　圖文傳播藝術學系
      </p>
    </div>
  );
}

function Blocks({ blocks }) {
  if (!blocks?.length) return null;
  return (
    <div className="editorial custom-scroll max-h-[48vh] space-y-3 overflow-y-auto pr-2">
      {blocks.map((block, i) => {
        if (block.type === "p") {
          return (
            <p key={i} className="font-sans text-[16px] leading-8 text-ink/80">
              {block.text}
            </p>
          );
        }
        if (block.type === "h") {
          return (
            <h3 key={i} className="pt-2 font-sans text-[12px] font-medium tracking-[0.22em] text-teal">
              {block.text}
            </h3>
          );
        }
        if (block.type === "item") {
          return (
            <div key={i} className="flex gap-3 font-sans text-[16px] leading-8 text-ink/80">
              <Dot />
              <p>
                {block.title && <span className="font-medium text-ink">{block.title}</span>}
                {block.title && block.text ? "　" : null}
                {block.text}
              </p>
            </div>
          );
        }
        if (block.type === "qr") return <QrEmbed key={i} />;
        if (block.type === "map") return <MapEmbed key={i} />;
        return null;
      })}
    </div>
  );
}

export default function PackViewer({ index, setIndex, flipped, setFlipped, onFinish }) {
  const card = CARDS[index] ?? CARDS[CARDS.length - 1];
  const isLast = index >= CARDS.length - 1;
  const textKey = `${card.id}-${flipped ? "back" : "front"}`;
  const title = flipped ? card.backTitle : card.title;
  const note = flipped ? card.backNote : card.subtitle;
  const blocks = flipped ? card.backBlocks : card.frontBlocks;
  const items = flipped ? card.backItems : null;

  const go = (next) => {
    if (next >= CARDS.length) {
      onFinish?.();
      return;
    }
    setFlipped(false);
    setIndex(Math.max(0, next));
  };

  return (
    <div className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col px-6 pb-16 pt-24">
      <div className="flex flex-1 flex-col gap-10 lg:flex-row lg:items-start lg:gap-0">
        <div className="w-full lg:sticky lg:top-24 lg:w-[42%]">
          <p className="mb-4 font-sans text-[11px] tracking-[0.28em] text-teal">VOLUME {String(card.id).padStart(2, "0")}</p>
          <FlipCard card={card} flipped={flipped} />
          <div className="mt-8 flex justify-center">
            <FaceSwitch flipped={flipped} setFlipped={setFlipped} />
          </div>
        </div>

        <div className="w-full lg:w-[58%] lg:border-l lg:border-ink/10 lg:pl-16">
          <div className="mb-6 flex items-center justify-between gap-4">
            <p className="font-sans text-[11px] tracking-[0.22em] text-teal">{flipped ? "反面" : "正面"}</p>
            <p className="font-sans text-sm tracking-[0.16em] text-ink/35">
              {String(card.id).padStart(2, "0")} / {String(CARDS.length).padStart(2, "0")}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.article
              key={textKey}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.28 }}
              className="max-w-xl"
            >
              <p className="font-sans text-[11px] tracking-[0.28em] text-ink/40">{card.kicker}</p>
              <h1 className="mt-3 font-sans text-[34px] font-semibold leading-[1.2] text-ink sm:text-[42px]">{title}</h1>
              <p className="mt-3 font-sans text-lg text-ink/55">{note}</p>
              <div className="my-7 hairline" />
              <Blocks blocks={blocks} />
              {!blocks?.length && items?.length ? (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li key={item} className="flex gap-3 font-sans text-[16px] leading-8 text-ink/80">
                      <Dot />
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
            </motion.article>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white disabled:opacity-30"
              aria-label="上一張"
            >
              <ChevronLeft size={18} strokeWidth={1.6} />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 bg-white"
              aria-label={isLast ? "前往茶會" : "下一張"}
            >
              <ChevronRight size={18} strokeWidth={1.6} />
            </button>
            <span className="ml-2 font-sans text-[11px] tracking-[0.2em] text-ink/40">
              {isLast ? "NEXT  /  TEA PARTY" : "PREV  /  NEXT"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
