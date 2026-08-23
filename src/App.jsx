import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./components/Header";
import EnvelopeUnbox from "./components/EnvelopeUnbox";
import PackViewer from "./components/PackViewer";
import TeaFinale from "./components/TeaFinale";
import QrPage from "./components/QrPage";
import AboutPage from "./components/AboutPage";

export default function App() {
  const [tab, setTab] = useState("pack");
  const [phase, setPhase] = useState("envelope");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [packKey, setPackKey] = useState(0);

  const goHome = () => {
    setTab("pack");
    setPhase("envelope");
    setIndex(0);
    setFlipped(false);
    setPackKey((k) => k + 1);
  };

  useEffect(() => {
    setFlipped(false);
  }, [index]);

  useEffect(() => {
    const onKey = (e) => {
      if (tab !== "pack" || phase !== "reader") return;
      if (e.key === "ArrowRight") {
        if (index >= 8) setPhase("tea");
        else setIndex((i) => i + 1);
      }
      if (e.key === "ArrowLeft") setIndex((i) => Math.max(0, i - 1));
      if (e.key === " " || e.key.toLowerCase() === "f") {
        e.preventDefault();
        setFlipped((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, phase, index]);

  return (
    <div className="relative min-h-screen font-sans">
      <Header tab={tab} setTab={setTab} onLogoClick={goHome} />
      <AnimatePresence mode="wait">
        {tab === "pack" && phase === "envelope" && (
          <motion.div key={`envelope-${packKey}`} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <EnvelopeUnbox onComplete={() => setPhase("reader")} />
          </motion.div>
        )}
        {tab === "pack" && phase === "reader" && (
          <motion.div
            key="reader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <PackViewer
              index={index}
              setIndex={setIndex}
              flipped={flipped}
              setFlipped={setFlipped}
              onFinish={() => setPhase("tea")}
            />
          </motion.div>
        )}
        {tab === "pack" && phase === "tea" && (
          <motion.div
            key="tea"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <TeaFinale
              onBack={() => {
                setIndex(8);
                setPhase("reader");
              }}
            />
          </motion.div>
        )}
        {tab === "qr" && (
          <motion.div key="qr" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <QrPage />
          </motion.div>
        )}
        {tab === "about" && (
          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <AboutPage />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
