import type { ReactNode } from "react";

export default function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 shadow-xl shadow-black/30 backdrop-blur sm:p-5">
      <h2 className="mb-3 text-sm font-semibold text-white/70">{title}</h2>
      {children}
    </section>
  );
}
