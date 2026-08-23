const STEM = "新生包無標籤網頁";

export function logoCandidates() {
  return ["/assets/logo/logo.png", "/assets/logo.png"];
}

export function cardCandidates(id, side) {
  const page = side === "back" ? id * 2 : id * 2 - 1;
  const p = String(page).padStart(2, "0");
  const list = [];
  const push = (path) => {
    if (!list.includes(path)) list.push(path);
  };

  if (page === 1) {
    push(`/assets/cards/${STEM}_工作區域 1.jpg`);
    push(`/assets/cards/${STEM}_工作區域 1.png`);
  }
  push(`/assets/cards/${STEM}-${p}.jpg`);
  push(`/assets/cards/${STEM}-${p}.png`);
  push(`/assets/cards/${STEM}-${page}.jpg`);
  push(`/assets/cards/${STEM}-${page}.png`);
  return list;
}
