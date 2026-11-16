import { useEffect, useRef, useState, type FormEvent } from "react";
import { SendHorizontal } from "lucide-react";

/**
 * Scripted demo of a customer-support assistant for a fictional company.
 * No real AI is called - it shows the kind of flows a real assistant handles.
 */

type Msg = { id: number; from: "bot" | "me"; text: string; typing?: boolean };
type Step = "menu" | "order" | "day" | "time" | "again" | "free";

const MENU = ["Track my order", "Book a demo call", "Pricing", "Talk to a human"];
const ORDERS = ["#48213", "#48297", "#48310"];
const ORDER_STATUS: Record<string, string> = {
  "#48213": "📦 Order #48213 has shipped with DHL. Estimated delivery: Thursday, Nov 19.",
  "#48297": "🛠 Order #48297 is being prepared and will ship within 24 hours.",
  "#48310": "✅ Order #48310 was delivered on Nov 14. Anything wrong with it? I can open a return.",
};
const DAYS = ["Thu, Nov 19", "Fri, Nov 20", "Mon, Nov 23"];
const TIMES = ["09:30", "11:00", "14:30", "16:00"];

const PRICING =
  "We have three plans: Starter €19/mo, Pro €49/mo and Enterprise with custom pricing, SSO and an SLA. All plans include a 14-day free trial.";

const ANSWERS: [RegExp, string][] = [
  [/price|pricing|cost|plan|how much|€/i, PRICING],
  [/refund|return|cancel/i, "You can cancel any time from Settings → Billing. Refunds are available within 14 days of payment."],
  [/sso|saml|okta|azure|security|gdpr/i, "Enterprise includes SAML SSO (Okta, Azure AD), audit logs and a GDPR-compliant DPA."],
  [/hours|support|contact|email/i, "Our team is online Mon-Fri, 9:00-18:00 CET. I'm here 24/7 for everything else."],
  [/order|track|delivery|shipping/i, "__ORDER__"],
  [/demo|call|meeting|book/i, "__DEMO__"],
];

export default function BotDemo() {
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [choices, setChoices] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const timers = useRef<number[]>([]);
  const step = useRef<Step>("free");
  const day = useRef("");
  const idRef = useRef(0);
  const chatRef = useRef<HTMLDivElement>(null);

  const clear = () => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  };

  const say = (text: string, then?: () => void, delay = 650) => {
    const id = ++idRef.current;
    setMsgs((m) => [...m, { id, from: "bot", text: "…", typing: true }]);
    timers.current.push(
      window.setTimeout(() => {
        setMsgs((m) => m.map((x) => (x.id === id ? { ...x, text, typing: false } : x)));
        then?.();
      }, delay),
    );
  };

  const offer = (s: Step, list: string[]) => {
    step.current = s;
    setChoices(list);
  };

  const me = (text: string) => setMsgs((m) => [...m, { id: ++idRef.current, from: "me", text }]);

  const menu = (prompt = "How can I help you today?") => say(prompt, () => offer("menu", MENU));
  const askOrder = () => say("Sure! Which order?", () => offer("order", ORDERS));
  const askDemo = () => say("Happy to set that up. Which day works for you?", () => offer("day", DAYS));
  const anythingElse = () => say("Anything else I can help with?", () => offer("again", ["Back to menu"]), 900);

  const start = () => {
    clear();
    setMsgs([]);
    setChoices([]);
    say("Hi! 👋 I'm the Acme Cloud assistant. I answer in English, Spanish, Polish and more.", () => menu(), 400);
  };

  useEffect(() => {
    start();
    return clear;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = chatRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, choices]);

  const pick = (label: string) => {
    setChoices([]);
    me(label);
    switch (step.current) {
      case "menu":
        if (label === MENU[0]) return askOrder();
        if (label === MENU[1]) return askDemo();
        if (label === MENU[2]) return say(PRICING, anythingElse);
        step.current = "free";
        return say("I've notified our team - a human will join this chat in about 15 minutes. 🙌", anythingElse);
      case "order":
        return say(ORDER_STATUS[label], anythingElse);
      case "day":
        day.current = label;
        return say("Available slots (CET):", () => offer("time", TIMES));
      case "time":
        return say(
          `✅ Booked: a 30-min demo on ${day.current} at ${label} CET. A calendar invite is on its way to your email.`,
          anythingElse,
        );
      case "again":
        return menu("What else can I do for you?");
    }
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    clear();
    setChoices([]);
    me(q);
    setInput("");
    const hit = ANSWERS.find(([re]) => re.test(q));
    if (!hit) return say("Good question - I'll pass it to our team and they'll reply here shortly. 🙂", anythingElse);
    if (hit[1] === "__ORDER__") return askOrder();
    if (hit[1] === "__DEMO__") return askDemo();
    say(hit[1], anythingElse);
  };

  return (
    <div className="mx-auto flex h-[560px] w-full max-w-[380px] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-xl">
      <div className="flex items-center gap-3 border-b border-line px-4 py-3">
        <span className="grid size-9 place-items-center rounded-lg bg-fg text-sm font-black text-bg">A</span>
        <div>
          <div className="text-sm font-semibold">Acme Cloud Support</div>
          <div className="flex items-center gap-1.5 text-[11px] text-muted">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            AI assistant · online
          </div>
        </div>
        <button
          type="button"
          onClick={start}
          className="ml-auto rounded-md border border-line px-2 py-0.5 text-[10px] font-bold text-muted hover:text-fg"
          title="Restart demo"
        >
          DEMO ↺
        </button>
      </div>

      <div ref={chatRef} className="flex flex-1 flex-col gap-2 overflow-y-auto bg-soft/50 px-3 py-4" aria-live="polite">
        {msgs.map((m) => (
          <div
            key={m.id}
            className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-snug ${
              m.from === "bot"
                ? "self-start rounded-bl-md border border-line bg-card"
                : "self-end rounded-br-md bg-fg text-bg"
            } ${m.typing ? "italic text-muted" : ""}`}
          >
            {m.text}
          </div>
        ))}
        {choices.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {choices.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => pick(c)}
                className="rounded-full border border-line bg-card px-3 py-1.5 text-[13px] font-medium transition hover:border-fg hover:bg-fg hover:text-bg"
              >
                {c}
              </button>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={submit} className="flex gap-2 border-t border-line p-2.5">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about pricing, SSO, refunds…"
          aria-label="Message"
          className="min-w-0 flex-1 rounded-lg border border-line bg-bg px-3 py-2 text-sm outline-none focus:border-fg"
        />
        <button type="submit" aria-label="Send" className="grid w-10 place-items-center rounded-lg bg-fg text-bg">
          <SendHorizontal className="size-4" />
        </button>
      </form>
    </div>
  );
}
