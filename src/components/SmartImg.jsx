import { useEffect, useMemo, useState } from "react";

export default function SmartImg({ candidates = [], alt = "", className = "", fallback = null }) {
  const srcs = useMemo(() => candidates.filter(Boolean), [candidates.join("|")]);
  const [i, setI] = useState(0);
  const [failed, setFailed] = useState(!srcs.length);

  useEffect(() => {
    setI(0);
    setFailed(!srcs.length);
  }, [srcs]);

  if (failed || i >= srcs.length) return fallback;

  return (
    <img
      src={srcs[i]}
      alt={alt}
      className={className}
      onLoad={(e) => {
        if (!e.currentTarget.naturalWidth) {
          if (i + 1 >= srcs.length) setFailed(true);
          else setI((v) => v + 1);
        }
      }}
      onError={() => {
        if (i + 1 >= srcs.length) setFailed(true);
        else setI((v) => v + 1);
      }}
    />
  );
}
