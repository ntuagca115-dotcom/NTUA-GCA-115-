import { GOOGLE_FORM_URL } from "../data";
import CoinPurseButton from "./CoinPurseButton";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-28">
      <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-ink/40">ABOUT</p>
      <h1 className="mt-3 font-sans text-4xl font-semibold leading-tight sm:text-5xl">關於我們</h1>
      <div className="my-8 hairline" />
      <div className="space-y-5 font-sans text-[16px] leading-8 text-ink/80">
        <p>
          歡迎來到圖文系！你是不是喜歡畫插畫、帶著相機到處攝影？如果不是，那也沒關係！圖文系四大核心領域「印刷、攝影、設計、管理」將帶領你們成為一位全能型的設計人才，在有興趣的領域發光發熱！
        </p>
        <p>
          115 屆系學會將舉辦許多有趣的活動與講座，讓大家除了加深跟朋友的回憶，更收穫滿滿的經驗與知識～
        </p>
        <p>系學會將成為你大學新生活的靠山！</p>
      </div>
      <div className="mt-14">
        <CoinPurseButton href={GOOGLE_FORM_URL} />
      </div>
    </div>
  );
}
