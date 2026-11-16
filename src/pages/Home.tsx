import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ChevronRight, Github, Globe, Linkedin, Mail, Send } from "lucide-react";
import { DATA, hasTelegram, telegramUrl } from "../data/resume";
import { Badge, BlurFade, Initials, Pill, SectionTitle, SoftBadge } from "../components/ui";

const D = 0.04;

export default function Home() {
  return (
    <div className="flex flex-col gap-14">
      {/* Hero */}
      <section className="flex items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <BlurFade>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl">
              Hi, I'm {DATA.name.split(" ")[0]} 👋
            </h1>
          </BlurFade>
          <BlurFade delay={D}>
            <p className="max-w-[600px] text-base text-muted md:text-xl">{DATA.description}</p>
          </BlurFade>
          <BlurFade delay={D * 2}>
            <p className="mt-1 text-sm text-muted">
              📍 {DATA.location} · 🗣 {DATA.languages.join(", ")}
            </p>
          </BlurFade>
        </div>
        <BlurFade delay={D}>
          <Avatar />
        </BlurFade>
      </section>

      {/* About */}
      <section className="flex flex-col gap-3">
        <BlurFade delay={D * 3}>
          <SectionTitle>About</SectionTitle>
        </BlurFade>
        <BlurFade delay={D * 4}>
          <p className="text-pretty text-sm leading-relaxed text-muted sm:text-base">{DATA.summary}</p>
        </BlurFade>
      </section>

      {/* Services teaser */}
      <BlurFade delay={D * 5}>
        <Link
          to="/services"
          className="group flex items-center gap-4 rounded-2xl border border-line bg-soft p-4 transition hover:border-accent"
        >
          <span className="relative flex size-3 shrink-0">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-3 rounded-full bg-emerald-500" />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold">Available for new projects</span>
            <span className="block text-sm text-muted">
              Web apps, APIs, automation, bots, AI integrations and DevOps - see how I can help.
            </span>
          </span>
          <ArrowRight className="size-5 text-muted transition group-hover:translate-x-1 group-hover:text-fg" />
        </Link>
      </BlurFade>

      {/* Work */}
      <section className="flex flex-col gap-4">
        <BlurFade delay={D * 6}>
          <SectionTitle>Work Experience</SectionTitle>
        </BlurFade>
        {DATA.work.map((w, i) => (
          <BlurFade key={i} delay={D * 7 + i * 0.05}>
            <ResumeRow
              logo={w.logo}
              name={w.company}
              href={w.href}
              subtitle={w.title}
              period={period(w.start, w.end)}
              bullets={w.bullets}
            />
          </BlurFade>
        ))}
      </section>

      {/* Education */}
      <section className="flex flex-col gap-4">
        <BlurFade delay={D * 8}>
          <SectionTitle>Education</SectionTitle>
        </BlurFade>
        {DATA.education.map((e, i) => (
          <BlurFade key={i} delay={D * 9 + i * 0.05}>
            <ResumeRow logo={e.logo} name={e.school} href={e.href} subtitle={e.degree} period={period(e.start, e.end)} />
          </BlurFade>
        ))}
      </section>

      {/* Skills */}
      <section className="flex flex-col gap-3">
        <BlurFade delay={D * 10}>
          <SectionTitle>Skills</SectionTitle>
        </BlurFade>
        <div className="flex flex-wrap gap-1.5">
          {DATA.skills.map((s, i) => (
            <BlurFade key={s} delay={D * 11 + i * 0.03}>
              <Badge>{s}</Badge>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Projects */}
      <section className="flex flex-col gap-8">
        <BlurFade delay={D * 12}>
          <div className="flex flex-col items-center gap-3 text-center">
            <Pill>My Projects</Pill>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Products I've built</h2>
            <p className="max-w-[560px] text-muted md:text-lg">
              SaaS products I designed, built and run in production - from the database to the landing page.
            </p>
          </div>
        </BlurFade>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {DATA.projects.map((p, i) => (
            <BlurFade key={p.title} delay={D * 13 + i * 0.05} className="h-full">
              <ProjectCard {...p} />
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="flex flex-col items-center gap-3 text-center">
        <BlurFade delay={D * 14}>
          <div className="flex flex-col items-center gap-3">
            <Pill>Contact</Pill>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Get in touch</h2>
            <p className="max-w-[520px] text-muted md:text-lg">
              Want to work together or just say hi? Drop me a message at{" "}
              <a href={`mailto:${DATA.contact.email}`} className="text-sky-500 hover:underline">
                {DATA.contact.email}
              </a>{" "}
              - I usually reply within a day.
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-2">
              {hasTelegram && <ContactButton href={telegramUrl} icon={<Send className="size-4" />} label="Telegram" />}
              <ContactButton href={`mailto:${DATA.contact.email}`} icon={<Mail className="size-4" />} label="Email" />
              <ContactButton href={DATA.contact.social.LinkedIn} icon={<Linkedin className="size-4" />} label="LinkedIn" />
              <ContactButton href={DATA.contact.social.GitHub} icon={<Github className="size-4" />} label="GitHub" />
            </div>
          </div>
        </BlurFade>
      </section>
    </div>
  );
}

function period(start: string, end: string) {
  if (!start && !end) return "";
  if (!end || start === end) return start;
  return `${start} - ${end}`;
}

function Avatar() {
  const [failed, setFailed] = useState(false);
  return failed ? (
    <Initials text={DATA.initials} className="size-28 text-3xl" />
  ) : (
    <img
      src={DATA.avatarUrl}
      alt={DATA.name}
      onError={() => setFailed(true)}
      className="size-28 shrink-0 rounded-full border border-line object-cover"
    />
  );
}

function ResumeRow({
  logo,
  name,
  href,
  subtitle,
  period,
  bullets,
}: {
  logo: string;
  name: string;
  href: string;
  subtitle: string;
  period: string;
  bullets?: readonly string[];
}) {
  const [open, setOpen] = useState(false);
  const description = bullets && bullets.length > 0;
  const Wrapper = description ? "button" : href ? "a" : "div";
  const props = description
    ? { type: "button" as const, onClick: () => setOpen((o) => !o) }
    : href
      ? { href, target: "_blank", rel: "noreferrer" }
      : {};
  return (
    <Wrapper {...(props as object)} className="group flex w-full gap-4 text-left">
      {logo ? (
        <img src={logo} alt={name} className="size-12 shrink-0 rounded-full border border-line bg-soft object-contain" />
      ) : (
        <Initials text={name.slice(0, 1)} className="size-12 shrink-0" />
      )}
      <div className="flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="inline-flex items-center gap-1 text-sm font-semibold sm:text-base">
            {name}
            {description && (
              <ChevronRight
                className={`size-4 text-muted opacity-0 transition group-hover:opacity-100 ${open ? "rotate-90 opacity-100" : ""}`}
              />
            )}
          </h3>
          <span className="shrink-0 text-xs tabular-nums text-muted sm:text-sm">{period}</span>
        </div>
        <p className="text-xs text-muted sm:text-sm">{subtitle}</p>
        <AnimatePresence initial={false}>
          {description && open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="list-disc overflow-hidden pt-2 pl-4 text-xs leading-relaxed text-muted sm:text-sm"
            >
              {bullets!.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </Wrapper>
  );
}

type Project = (typeof DATA.projects)[number];

function ProjectCard({ title, href, image, dates, description, technologies, links }: Project) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-line bg-card transition hover:shadow-lg">
      <a href={href} target="_blank" rel="noreferrer" className="block overflow-hidden border-b border-line">
        <img
          src={image}
          alt={`${title} screenshot`}
          loading="lazy"
          className="aspect-[16/10] w-full object-cover object-top transition duration-300 hover:scale-[1.03]"
        />
      </a>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div>
          <h3 className="font-semibold">{title}</h3>
          <p className="text-xs text-muted">{dates}</p>
        </div>
        <p className="flex-1 text-xs leading-relaxed text-muted">{description}</p>
        <div className="flex flex-wrap gap-1">
          {technologies.map((t) => (
            <SoftBadge key={t}>{t}</SoftBadge>
          ))}
        </div>
        <div className="flex gap-1 pt-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md bg-fg px-2 py-1 text-[11px] font-semibold text-bg"
            >
              {(l.type as string) === "Source" ? <Github className="size-3" /> : <Globe className="size-3" />}
              {l.type}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactButton({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      className="inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-sm font-medium transition hover:bg-soft"
    >
      {icon}
      {label}
    </a>
  );
}
