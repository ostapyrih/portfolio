import type { ReactNode } from "react";
import { Bot, Brain, Check, Cloud, Code2, Mail, Plug, Send, Workflow } from "lucide-react";
import { DATA, emailUrl, hasTelegram, telegramUrl } from "../data/resume";
import BotDemo from "../components/BotDemo";
import { BlurFade, Pill, SectionTitle } from "../components/ui";

const D = 0.04;

const SERVICES = [
  {
    icon: <Code2 className="size-5" />,
    title: "Web apps & SaaS",
    text: "From MVP to production: dashboards, client portals, multi-tenant SaaS with auth, billing and admin panels.",
  },
  {
    icon: <Plug className="size-5" />,
    title: "Backend APIs & integrations",
    text: "REST APIs in Python/FastAPI or Java, payment systems, CRMs and third-party services wired together reliably.",
  },
  {
    icon: <Brain className="size-5" />,
    title: "AI assistants & LLM features",
    text: "Customer-support and booking assistants, document processing and internal copilots built on modern LLMs.",
  },
  {
    icon: <Bot className="size-5" />,
    title: "Bots & business automation",
    text: "Telegram, WhatsApp and Discord bots, scheduled jobs and workflows that remove manual, repetitive work.",
  },
  {
    icon: <Cloud className="size-5" />,
    title: "DevOps & cloud",
    text: "AWS, Docker, Terraform, CI/CD and Nginx. Deployments, monitoring and hardening of existing infrastructure.",
  },
  {
    icon: <Workflow className="size-5" />,
    title: "Jira Cloud & Atlassian apps",
    text: "Custom Jira Cloud apps and integrations that fit your team's process instead of the other way round.",
  },
];

const MODELS = [
  {
    name: "Fixed-scope project",
    text: "A clear scope, timeline and price agreed up front. Best for new products, MVPs and well-defined features.",
    items: ["Written proposal & milestones", "Weekly demos", "Source code and accounts in your name"],
  },
  {
    name: "Ongoing support",
    text: "A monthly retainer for teams that need a reliable engineer on call.",
    items: ["Hosting, monitoring & updates", "Bug fixes and small features", "Priority response"],
    hl: true,
  },
  {
    name: "Hourly consulting",
    text: "Architecture reviews, code audits, DevOps help or a second pair of eyes on a tricky problem.",
    items: ["Async, in writing", "Actionable recommendations", "No long-term commitment"],
  },
];

const STEPS = [
  ["Tell me about the project", "Send a short message with your goals, current setup and deadline. I reply within a few hours."],
  ["Proposal", "You get a written plan with scope, milestones, timeline and a fixed price or estimate."],
  ["Build", "I work in short iterations and share progress and demo links every week."],
  ["Launch & handover", "Deployment, documentation and all access transferred to you. Support available afterwards."],
];

export default function Services() {
  return (
    <div className="flex flex-col gap-14">
      {/* Hero */}
      <section className="flex flex-col gap-3">
        <BlurFade>
          <Pill>Work with me</Pill>
        </BlurFade>
        <BlurFade delay={D}>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
            Software that saves your team time.
          </h1>
        </BlurFade>
        <BlurFade delay={D * 2}>
          <p className="text-base text-muted md:text-lg">
            I help startups and businesses design, build and run web applications, APIs, automation and AI features -
            end to end, from the first commit to production infrastructure.
          </p>
        </BlurFade>
        <BlurFade delay={D * 3}>
          <div className="mt-2 flex flex-wrap gap-2">
            <CTA href={emailUrl} primary icon={<Mail className="size-4" />}>
              Request a quote
            </CTA>
            {hasTelegram && (
              <CTA href={telegramUrl} icon={<Send className="size-4" />}>
                Telegram
              </CTA>
            )}
            <CTA href={DATA.contact.social.Fiverr} icon={<span className="text-xs font-black">fi</span>}>
              Hire on Fiverr
            </CTA>
          </div>
        </BlurFade>
      </section>

      {/* Services */}
      <section className="flex flex-col gap-4">
        <BlurFade delay={D * 4}>
          <SectionTitle>What I do</SectionTitle>
        </BlurFade>
        <div className="grid gap-3 sm:grid-cols-2">
          {SERVICES.map((s, i) => (
            <BlurFade key={s.title} delay={D * 5 + i * 0.04} className="h-full">
              <div className="flex h-full flex-col rounded-xl border border-line bg-card p-5">
                <span className="grid size-10 place-items-center rounded-lg border border-line bg-soft">{s.icon}</span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.text}</p>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Demo */}
      <section className="flex flex-col gap-4">
        <BlurFade delay={D * 6}>
          <SectionTitle>Try a demo: AI support assistant</SectionTitle>
          <p className="mt-1 text-sm text-muted">
            An example of a customer-facing assistant for a fictional company. Track an order, book a demo call or ask
            about pricing.
          </p>
        </BlurFade>
        <BlurFade delay={D * 7}>
          <BotDemo />
        </BlurFade>
      </section>

      {/* Engagement models */}
      <section className="flex flex-col gap-4">
        <BlurFade delay={D * 8}>
          <SectionTitle>How we can work together</SectionTitle>
        </BlurFade>
        <div className="grid gap-3 sm:grid-cols-3">
          {MODELS.map((m, i) => (
            <BlurFade key={m.name} delay={D * 9 + i * 0.05} className="h-full">
              <div className={`flex h-full flex-col rounded-xl border bg-card p-5 ${m.hl ? "border-fg" : "border-line"}`}>
                <h3 className="font-semibold">{m.name}</h3>
                <p className="mt-1 text-sm text-muted">{m.text}</p>
                <ul className="mt-3 flex flex-col gap-1.5">
                  {m.items.map((it) => (
                    <li key={it} className="flex gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </BlurFade>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="flex flex-col gap-4">
        <BlurFade delay={D * 10}>
          <SectionTitle>Process</SectionTitle>
        </BlurFade>
        <ol className="flex flex-col gap-4">
          {STEPS.map(([t, d], i) => (
            <BlurFade key={t} delay={D * 11 + i * 0.05}>
              <li className="flex gap-4">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-fg text-sm font-bold text-bg">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-sm font-semibold sm:text-base">{t}</h3>
                  <p className="text-sm text-muted">{d}</p>
                </div>
              </li>
            </BlurFade>
          ))}
        </ol>
      </section>

      {/* CTA */}
      <BlurFade delay={D * 12}>
        <section className="flex flex-col items-center gap-3 rounded-2xl border border-line bg-soft p-8 text-center">
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Have a project in mind?</h2>
          <p className="max-w-md text-muted">
            Tell me what you're building. You'll get a clear plan and estimate - usually within a day.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <CTA href={emailUrl} primary icon={<Mail className="size-4" />}>
              Request a quote
            </CTA>
            {hasTelegram && (
              <CTA href={telegramUrl} icon={<Send className="size-4" />}>
                Telegram
              </CTA>
            )}
          </div>
        </section>
      </BlurFade>
    </div>
  );
}

function CTA({
  href,
  icon,
  children,
  primary,
}: {
  href: string;
  icon: ReactNode;
  children: ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto") ? undefined : "_blank"}
      rel="noreferrer"
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition hover:opacity-90 ${
        primary ? "bg-fg text-bg" : "border border-line hover:bg-soft"
      }`}
    >
      {icon}
      {children}
    </a>
  );
}
