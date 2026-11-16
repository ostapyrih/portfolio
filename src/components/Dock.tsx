import { useRef, useState, type ReactNode, type RefObject } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "motion/react";
import { Briefcase, Github, Home, Linkedin, Mail, Moon, Sun } from "lucide-react";
import { DATA } from "../data/resume";

export default function Dock() {
  const mouseX = useMotionValue(Infinity);
  const { pathname } = useLocation();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-30 mx-auto mb-4 flex justify-center">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-bg to-transparent" />
      <motion.nav
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="pointer-events-auto relative flex h-14 items-end gap-2 rounded-2xl border border-line bg-bg/80 px-2 pb-2 shadow-lg backdrop-blur-md"
      >
        <DockItem mouseX={mouseX} label="Home" to="/" active={pathname === "/"}>
          <Home className="size-4" />
        </DockItem>
        <DockItem mouseX={mouseX} label="Services" to="/services" active={pathname === "/services"}>
          <Briefcase className="size-4" />
        </DockItem>
        <Sep />
        <DockItem mouseX={mouseX} label="GitHub" href={DATA.contact.social.GitHub}>
          <Github className="size-4" />
        </DockItem>
        <DockItem mouseX={mouseX} label="Fiverr" href={DATA.contact.social.Fiverr}>
          <span className="text-[13px] font-black leading-none">fi</span>
        </DockItem>
        {DATA.contact.social.LinkedIn && (
          <DockItem mouseX={mouseX} label="LinkedIn" href={DATA.contact.social.LinkedIn}>
            <Linkedin className="size-4" />
          </DockItem>
        )}
        <DockItem mouseX={mouseX} label="Email" href={`mailto:${DATA.contact.email}`}>
          <Mail className="size-4" />
        </DockItem>
        <Sep />
        <ThemeItem mouseX={mouseX} />
      </motion.nav>
    </div>
  );
}

function Sep() {
  return <div className="mb-1 h-8 w-px self-end bg-line" />;
}

function useMagnify(mouseX: MotionValue<number>, ref: RefObject<HTMLElement | null>) {
  const distance = useTransform(mouseX, (x) => {
    const b = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return x - b.x - b.width / 2;
  });
  const size = useTransform(distance, [-120, 0, 120], [40, 56, 40]);
  return useSpring(size, { mass: 0.1, stiffness: 160, damping: 12 });
}

function DockItem({
  mouseX,
  label,
  to,
  href,
  active,
  children,
}: {
  mouseX: MotionValue<number>;
  label: string;
  to?: string;
  href?: string;
  active?: boolean;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useMagnify(mouseX, ref);
  const [hover, setHover] = useState(false);
  const cls = `grid size-full place-items-center rounded-full transition-colors ${
    active ? "bg-soft text-fg" : "text-muted hover:bg-soft hover:text-fg"
  }`;
  return (
    <motion.div
      ref={ref}
      style={{ width: size, height: size }}
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className="relative"
    >
      {hover && (
        <span className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-line bg-bg px-2 py-0.5 text-xs shadow">
          {label}
        </span>
      )}
      {to ? (
        <Link to={to} aria-label={label} className={cls}>
          {children}
        </Link>
      ) : (
        <a
          href={href}
          aria-label={label}
          target={href?.startsWith("mailto") ? undefined : "_blank"}
          rel="noreferrer"
          className={cls}
        >
          {children}
        </a>
      )}
    </motion.div>
  );
}

function ThemeItem({ mouseX }: { mouseX: MotionValue<number> }) {
  const ref = useRef<HTMLDivElement>(null);
  const size = useMagnify(mouseX, ref);
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));
  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };
  return (
    <motion.div ref={ref} style={{ width: size, height: size }}>
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle theme"
        className="grid size-full place-items-center rounded-full text-muted transition-colors hover:bg-soft hover:text-fg"
      >
        {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
      </button>
    </motion.div>
  );
}
