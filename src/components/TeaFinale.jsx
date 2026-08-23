import { motion } from "framer-motion";
import * as data from "../data";
import CoinPurseButton from "./CoinPurseButton";

const tea = data.TEA_PARTY ?? data.TEA_PARTY ?? {};
const formUrl = data.GOOGLE_FORM_URL ?? data.GOOGLE_FORM_URL ?? data.LINKS?.form;

export default function TeaFinale({ onBack }) {
  const paragraphs = tea.body ?? [];

  return (
    <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-2xl flex-col items-center justify-center px-6 pb-20 pt-28 text-center">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="w-full">
        <p className="font-sans text-[11px] tracking-[0.32em] text-teal">{tea.kicker ?? "SPECIAL  /  TEA"}</p>
        <h1 className="mt-4 font-sans text-5xl font-semibold leading-[1.12]">{tea.title ?? "新生茶會"}</h1>
        <p className="mt-4 font-sans text-lg text-ink/55">{tea.subtitle ?? "歡迎各位新生加入台藝圖文的大家庭。"}</p>
        <div className="mx-auto my-8 max-w-md hairline" />
        <div className="mx-auto max-w-md space-y-4 font-sans text-[16px] leading-8 text-ink/80">
          {(paragraphs.length
            ? paragraphs
            : [
                "歡迎各位新生加入台藝圖文的大家庭。為了讓大家更快融入圖文系的環境、熟悉系上生活，也認識未來一起學習、創作的夥伴，我們準備了這場茶會。",
                "透過輕鬆有趣的交流與互動，讓新生彼此認識，也和老師、學長姐聊聊系上的課程、活動與生活點滴。不必準備完整的自我介紹，名字、一句近況，就已經足夠。",
                "現場會有人帶路、聽你還沒想好的問題，也會把系上日常慢慢說給你聽。願意的話，先填寫調查表單，讓我們知道你的飲食與時間。",
              ]
          ).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className="mx-auto mt-8 max-w-md font-sans text-base leading-8 text-ink/70">
          {tea.prompt ?? tea.prompt ?? "新生茶會調查表單！精美小禮等著你，期待與你相見..."}
        </p>
        <div className="mt-12 flex justify-center">
          <CoinPurseButton href={formUrl} />
        </div>
        <button
          type="button"
          onClick={onBack}
          className="mt-12 font-sans text-[12px] tracking-[0.2em] text-ink/40 underline-offset-4 hover:text-teal hover:underline"
        >
          BACK TO GUIDE
        </button>
      </motion.div>
    </div>
  );
}
