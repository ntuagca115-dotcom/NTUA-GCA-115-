import { TABS } from "../data";
import { logoCandidates } from "../lib/media";
import SmartImg from "./SmartImg";

export default function Header({ tab, setTab, onLogoClick }) {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-[200]">
      <div className="pointer-events-auto mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 pb-3 pt-4 sm:px-6">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onLogoClick?.();
          }}
          className="relative z-[201] flex min-h-11 min-w-11 cursor-pointer items-center gap-3 rounded-sm"
          aria-label="回到信封開場"
        >
          <SmartImg
            candidates={logoCandidates()}
            alt="logo"
            className="pointer-events-none h-9 w-auto max-w-[140px] object-contain sm:h-10"
            fallback={<span className="font-sans text-sm font-semibold tracking-[0.18em] text-ink">GUIDE</span>}
          />
        </button>
        <nav className="flex items-center gap-0.5 rounded-full border border-ink/10 bg-white/80 p-1 shadow-[0_8px_30px_rgba(22,22,22,0.05)] backdrop-blur-md">
          {TABS.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`relative rounded-full px-2.5 py-1.5 sm:px-3.5 ${active ? "bg-teal text-white" : "text-ink/70 hover:text-teal"}`}
              >
                <span className="relative z-10 flex flex-col items-center leading-tight">
                  <span className="font-sans text-[9px] font-medium tracking-[0.16em] sm:text-[10px]">{item.en}</span>
                  <span className="font-sans text-[11px] font-medium sm:text-[13px]">{item.zh}</span>
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
