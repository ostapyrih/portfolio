import type { ReactNode } from "react";
import { motion } from "motion/react";

const reducedMotion =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Fades content in with a small blur when it scrolls into view (skipped for reduced motion). */
export function BlurFade({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  if (reducedMotion) return <div className={className}>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: 0.04 + delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function Badge({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-md bg-fg px-2 py-0.5 text-xs font-semibold text-bg ${className}`}
    >
      {children}
    </span>
  );
}

export function SoftBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-md border border-line bg-soft px-1.5 py-0.5 text-[11px] font-medium text-fg/80">
      {children}
    </span>
  );
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-xl font-bold">{children}</h2>;
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-lg bg-fg px-3 py-1 text-sm text-bg">{children}</span>
  );
}

export function Initials({ text, className = "" }: { text: string; className?: string }) {
  return (
    <span
      className={`grid place-items-center rounded-full border border-line bg-soft font-semibold text-muted ${className}`}
    >
      {text}
    </span>
  );
}
