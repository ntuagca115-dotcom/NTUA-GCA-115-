import { QR_ITEMS } from "../data";
import { assetUrl } from "../lib/media";

export default function QrPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 pb-20 pt-28">
      <p className="font-sans text-[11px] uppercase tracking-[0.34em] text-ink/40">LINKS</p>
      <h1 className="mt-3 font-sans text-4xl font-semibold sm:text-5xl">常用連結</h1>
      <p className="mt-3 max-w-xl font-sans text-ink/60">掃描或點擊 QR，加入班群與系上頻道。</p>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {QR_ITEMS.map((item) => (
          <a
            key={item.key}
            href={item.url}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center rounded-[4px] border border-ink/10 bg-white p-6 text-center transition hover:border-teal"
          >
            <div className="bg-white p-4">
              <img src={assetUrl(item.file)} alt={item.title} className="h-44 w-44 bg-white object-contain" />
            </div>
            <h2 className="mt-4 font-sans text-xl font-medium">{item.title}</h2>
            <p className="mt-1 font-sans text-sm text-ink/50">{item.caption}</p>
            <p className="mt-3 font-sans text-[11px] tracking-[0.16em] text-teal">OPEN LINK  ↗</p>
          </a>
        ))}
      </div>
    </div>
  );
}
