import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { CARDS } from "../data";
import { cardCandidates } from "../lib/media";

export default function EnvelopeUnbox({ onComplete }) {
  const rootRef = useRef(null);
  const wrapRef = useRef(null);
  const flapRef = useRef(null);
  const stackRef = useRef(null);
  const hintRef = useRef(null);
  const locked = useRef(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = stackRef.current?.querySelectorAll("[data-card]");
      gsap.set(flapRef.current, { rotationX: 0, transformOrigin: "50% 0%", force3D: true });
      gsap.set(stackRef.current, { transformPerspective: 900, transformStyle: "preserve-3d" });
      gsap.set(cards, {
        xPercent: -50,
        yPercent: 10,
        x: 0,
        rotation: 0,
        z: 0,
        scale: 1,
        autoAlpha: 1,
        force3D: true,
      });
      gsap.set(wrapRef.current, { scale: 1, autoAlpha: 1, y: 0, force3D: true });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const open = () => {
    if (locked.current) return;
    locked.current = true;
    const cards = stackRef.current?.querySelectorAll("[data-card]");

    const tl = gsap.timeline({
      onComplete: () => onComplete?.(),
    });

    tl.to(hintRef.current, { autoAlpha: 0, y: -12, duration: 0.25, ease: "power1.out" }, 0)
      .to(wrapRef.current, { scale: 0.988, duration: 0.16, ease: "power1.out" }, 0)
      .to(wrapRef.current, { scale: 1, duration: 0.28, ease: "power1.inOut" }, 0.16)
      .to(flapRef.current, { rotationX: -172, duration: 1.05, ease: "power2.inOut", force3D: true }, 0.1)
      .set(stackRef.current, { zIndex: 8 }, 0.48)
      .to(
        cards,
        {
          yPercent: -78,
          x: (i) => (i - 4) * 38,
          rotation: (i) => (i - 4) * 9,
          z: (i) => 24 + Math.abs(i - 4) * 12,
          scale: 1.03,
          duration: 0.85,
          stagger: { each: 0.05, from: "center" },
          ease: "back.out(1.55)",
          force3D: true,
        },
        0.55
      )
      .to(
        cards,
        {
          yPercent: -168,
          x: (i) => (i - 4) * 10,
          rotation: (i) => (i - 4) * 2,
          z: 240,
          scale: 1.22,
          autoAlpha: 0,
          duration: 0.58,
          stagger: { each: 0.028, from: "center" },
          ease: "power3.in",
          force3D: true,
        },
        "+=0.14"
      )
      .to(
        wrapRef.current,
        { autoAlpha: 0, y: -36, scale: 0.92, duration: 0.42, ease: "power2.in" },
        "<0.12"
      );
  };

  return (
    <div
      ref={rootRef}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      }}
      className="relative z-0 flex min-h-[100svh] w-full cursor-pointer flex-col items-center justify-center px-6 pt-20"
    >
      <p ref={hintRef} className="mb-10 font-sans text-[11px] font-medium tracking-[0.42em] text-ink/40">
        CLICK TO OPEN
      </p>

      <div className="relative" style={{ perspective: "1600px", perspectiveOrigin: "50% 10%" }}>
        <div
          ref={wrapRef}
          className="relative h-[min(56vw,310px)] w-[min(92vw,500px)]"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="kraft absolute inset-0 rounded-[3px] shadow-[0_24px_48px_rgba(90,55,20,0.18)]">
            <div className="paper-fiber absolute inset-0 opacity-40" />
          </div>

          <div ref={stackRef} className="absolute inset-x-0 top-[8%] h-[58%]" style={{ zIndex: 2, transformStyle: "preserve-3d" }}>
            {CARDS.map((card, i) => (
              <div
                key={card.id}
                data-card
                className="absolute left-1/2 h-full w-[72%] overflow-hidden rounded-[2px] border border-black/5 bg-[#f7f1e8] shadow-[0_8px_16px_rgba(70,40,15,0.14)]"
                style={{ zIndex: i, top: i * 1.5 }}
              >
                <img src={cardCandidates(card.id, "front")[0]} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>

          <div
            className="kraft absolute inset-x-0 bottom-0 h-[58%]"
            style={{
              zIndex: 3,
              clipPath: "polygon(0 16%, 50% 0, 100% 16%, 100% 100%, 0 100%)",
            }}
          >
            <div className="paper-fiber absolute inset-0 opacity-35" />
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black/16 to-transparent" />
            <div className="absolute left-1/2 top-[22%] h-[6px] w-11 -translate-x-1/2 rounded-full bg-[#6b4524]/30 shadow-[inset_0_1px_1px_rgba(0,0,0,0.28)]" />
          </div>

          <div
            ref={flapRef}
            className="absolute inset-x-0 top-0 h-[62%]"
            style={{
              zIndex: 4,
              transformStyle: "preserve-3d",
              transformOrigin: "50% 0%",
            }}
          >
            <div
              className="kraft absolute inset-0"
              style={{
                clipPath: "ellipse(86% 100% at 50% 0%)",
                backfaceVisibility: "hidden",
                boxShadow: "0 12px 20px rgba(70,40,15,0.16)",
              }}
            >
              <div className="paper-fiber absolute inset-0 opacity-40" />
              <div className="absolute bottom-[14%] left-1/2 h-2.5 w-9 -translate-x-1/2 rounded-sm bg-[#6b4524]/22" />
            </div>
            <div
              className="kraft-inner absolute inset-0"
              style={{
                clipPath: "ellipse(86% 100% at 50% 0%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
              }}
            />
          </div>
        </div>
      </div>

      <p className="mt-12 max-w-sm text-center font-sans text-sm leading-7 text-ink/45">
        點擊畫面，從正面拆開這封牛皮紙信。
      </p>
    </div>
  );
}
