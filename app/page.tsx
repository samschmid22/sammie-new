"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionId = "hero" | "about" | "projects" | "employment" | "life" | "contact";

const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "employment", label: "Employment" },
  { id: "life", label: "Life" },
  { id: "contact", label: "Contact" },
];

const HERO_TAGS = ["Systems Builder", "Mechanical Engineer", "Business Analytics", "ASU 2025"];

const MARQUEE_A = [
  "Cinematic Portfolio",
  "GSAP ScrollTrigger",
  "RoutineOS",
  "Human Reset",
  "Travel Scrapbook",
  "Radar Sign",
  "Design + Systems",
];

const MARQUEE_B = [
  "Clarity Over Noise",
  "Built For Scale",
  "Data + Product",
  "Storytelling Through Motion",
  "Career + Life",
  "Portfolio in Motion",
  "Focused Execution",
];

const PROJECTS: Array<{
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  mode: "image" | "text";
  image?: string;
  imageAlt?: string;
  layoutClass: string;
  href?: string;
}> = [
  {
    id: "routineos",
    title: "RoutineOS",
    subtitle: "Systemized habits",
    description: "An execution engine for disciplined days: plan clearly, track hard, and iterate fast.",
    tags: ["Habits", "Routines", "Execution"],
    mode: "text",
    layoutClass: "lg:col-span-7",
    href: "https://routineos.vercel.app",
  },
  {
    id: "travel-scrapbook",
    title: "Travel Scrapbook",
    subtitle: "Been There Done That",
    description: "An interactive archive of places, stories, and memory markers captured across trips.",
    tags: ["Travel", "Memories", "Storytelling"],
    mode: "text",
    layoutClass: "lg:col-span-5",
    href: "https://travel-scrapbook.vercel.app",
  },
  {
    id: "human-reset",
    title: "Human Reset",
    subtitle: "Wellness framework",
    description: "A practical reset protocol for energy, focus, and sustainable personal systems.",
    tags: ["Health", "Focus", "Reset"],
    mode: "text",
    layoutClass: "lg:col-span-5",
  },
  {
    id: "radar-sign",
    title: "Radar-Readable Sign",
    subtitle: "Mobility safety",
    description: "Visibility-first infrastructure concept for autonomous vehicle sensing.",
    tags: ["Mobility", "Safety", "Engineering"],
    mode: "image",
    layoutClass: "lg:col-span-7",
    image: "/Pics/AV%20Sign.png",
    imageAlt: "Radar-readable sign concept",
  },
];

const EMPLOYMENT = [
  {
    period: "09/2025 - 11/2025",
    role: "Manufacturing Engineer Intern",
    company: "General Dynamics Mission Systems",
    bullets: [
      "Supported manufacturing engineering work for AMDR radar initiatives",
      "Worked inside high-rigor production and documentation workflows",
    ],
  },
  {
    period: "05/2024 - 08/2024",
    role: "Powertrain Test Intern",
    company: "Nissan Motor Co.",
    bullets: [
      "Ran powertrain test loops and consolidated measurement datasets",
      "Built Excel and MATLAB analyses to isolate performance signals",
    ],
  },
];

const LIFE_PHOTOS = [
  { src: "/Pics/Amsterdam.jpeg", alt: "Amsterdam, Netherlands" },
  { src: "/Pics/Paris.jpeg", alt: "Paris, France" },
  { src: "/Pics/Santorini.jpeg", alt: "Santorini, Greece" },
  { src: "/Pics/Rome.jpeg", alt: "Rome, Italy" },
  { src: "/Pics/Havana.jpeg", alt: "Havana, Cuba" },
  { src: "/Pics/Whistler.JPG", alt: "Whistler, Canada" },
];

function duplicated(items: string[]) {
  return [...items, ...items];
}

const TEXT_CARD_BACKGROUND = {
  backgroundColor: "#0b0b0b",
  backgroundImage:
    "radial-gradient(circle at 18% 18%, rgba(94,209,255,0.22), transparent 42%), radial-gradient(circle at 85% 82%, rgba(94,209,255,0.12), transparent 50%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
  backgroundSize: "100% 100%, 100% 100%, 34px 34px, 34px 34px",
};

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const marqueeTopRef = useRef<HTMLDivElement>(null);
  const marqueeBottomRef = useRef<HTMLDivElement>(null);

  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const splash = splashRef.current;

    if (!splash) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setShowSplash(false);
          document.body.style.overflow = previousOverflow;
        },
      });

      tl.fromTo(
        "[data-splash-text]",
        { autoAlpha: 0, y: 20, letterSpacing: "0.35em" },
        { autoAlpha: 1, y: 0, letterSpacing: "0.22em", duration: 0.75 },
      )
        .fromTo(
          "[data-splash-line]",
          { scaleX: 0 },
          { scaleX: 1, duration: 0.95, ease: "none", transformOrigin: "left center" },
          "-=0.2",
        )
        .to("[data-splash-text]", { autoAlpha: 0, y: -12, duration: 0.45 }, "+=0.3")
        .to(splash, { autoAlpha: 0, duration: 0.45 }, "-=0.2");
    }, splash);

    return () => {
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return;
    }

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });

    const onPointerMove = (event: PointerEvent) => {
      xTo(event.clientX - 170);
      yTo(event.clientY - 170);
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, []);

  useEffect(() => {
    if (showSplash) {
      return;
    }

    const root = rootRef.current;

    if (!root) {
      return;
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray<HTMLElement>(".portfolio-panel");

      panels.forEach((panel) => {
        const id = panel.id as SectionId;

        ScrollTrigger.create({
          trigger: panel,
          start: "top top",
          end: "+=100%",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
        });

        ScrollTrigger.create({
          trigger: panel,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        });

        const animatedNodes = panel.querySelectorAll("[data-animate]");

        if (animatedNodes.length > 0) {
          gsap.fromTo(
            animatedNodes,
            { autoAlpha: 0, y: 36 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: panel,
                start: "top 72%",
                end: "top 38%",
                toggleActions: "play none none reverse",
              },
            },
          );
        }
      });

      if (marqueeTopRef.current) {
        gsap.to(marqueeTopRef.current, {
          xPercent: -50,
          duration: 28,
          repeat: -1,
          ease: "none",
        });
      }

      if (marqueeBottomRef.current) {
        gsap.to(marqueeBottomRef.current, {
          xPercent: 50,
          duration: 28,
          repeat: -1,
          ease: "none",
        });
      }
    }, root);

    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      ScrollTrigger.clearScrollMemory();
    };
  }, [showSplash]);

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-clip bg-[#080808] text-white">
      {showSplash && (
        <div
          ref={splashRef}
          className="fixed inset-0 z-[120] flex items-center justify-center bg-[#080808]"
          aria-hidden={!showSplash}
        >
          <div className="w-full max-w-[520px] px-6 text-center">
            <p data-splash-text className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-[#5ed1ff]">
              Samantha Schmid
            </p>
            <div className="mt-6 h-px w-full bg-white/10 overflow-hidden">
              <div data-splash-line className="h-full w-full bg-gradient-to-r from-[#5ed1ff] via-[#5ed1ff]/50 to-transparent" />
            </div>
          </div>
        </div>
      )}

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[55] hidden h-[340px] w-[340px] rounded-full bg-[#5ed1ff]/10 blur-[95px] md:block"
      />

      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.05]">
        <div className="absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-[#5ed1ff]/16 blur-[140px]" />
        <div className="absolute bottom-[-10rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[#5ed1ff]/10 blur-[120px]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-[80] border-b border-white/10 bg-[#080808]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#hero" className="text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-[#5ed1ff]">
            Sammie
          </a>
          <nav className="flex items-center gap-2 md:gap-5">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full border px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.2em] transition-colors md:text-[0.66rem] ${
                  activeSection === item.id
                    ? "border-[#5ed1ff]/60 bg-[#5ed1ff]/10 text-[#5ed1ff]"
                    : "border-white/15 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-16">
        <section id="hero" className="portfolio-panel relative isolate flex min-h-[100svh] items-center px-5 py-24 md:px-10 md:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 top-6 h-[22rem] w-[22rem] rounded-full bg-[#5ed1ff]/14 blur-[115px]" />
            <div className="absolute bottom-10 right-[-4rem] h-[20rem] w-[20rem] rounded-full bg-[#5ed1ff]/10 blur-[110px]" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/45 to-transparent" />
          </div>
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-12 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-8" data-animate>
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/85">Portfolio 2026 · Phoenix</p>
              <h1 className="max-w-[11ch] text-5xl font-black uppercase leading-[0.92] tracking-[-0.02em] sm:text-6xl lg:text-8xl">
                Samantha
                <span className="block text-transparent [-webkit-text-stroke:1.4px_#5ed1ff]">Schmid</span>
              </h1>
              <p className="max-w-[54ch] text-[0.98rem] leading-8 text-white/72 md:text-[1.08rem]">
                Engineer and systems-minded builder focused on turning complex work into clear, repeatable execution.
                This portfolio is structured as a cinematic scroll sequence, not a static grid.
              </p>
              <div className="grid max-w-xl gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#5ed1ff]/80">Core Blend</p>
                  <p className="mt-1 text-sm text-white/80">Engineering rigor + analytics clarity</p>
                </div>
                <div className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3">
                  <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#5ed1ff]/80">Current Focus</p>
                  <p className="mt-1 text-sm text-white/80">Products that build discipline and signal</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {HERO_TAGS.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/20 bg-white/5 px-3.5 py-1.5 text-[0.62rem] uppercase tracking-[0.16em] text-white/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="mailto:sammieschmid22@gmail.com"
                  className="rounded-full bg-[#5ed1ff] px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black"
                >
                  Contact
                </Link>
                <Link
                  href="https://www.linkedin.com/in/samanthaschmid2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/80"
                >
                  LinkedIn
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-[430px]" data-animate>
              <div className="relative">
                <div className="pointer-events-none absolute -inset-4 rounded-[2.3rem] border border-[#5ed1ff]/20" />
                <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/20 bg-black/30 shadow-[0_0_60px_rgba(94,209,255,0.14)]">
                  <Image
                    src="/sammie.jpeg"
                    alt="Portrait of Samantha Schmid"
                    fill
                    priority
                    className="object-cover object-[50%_18%]"
                    sizes="(max-width: 1024px) 80vw, 430px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 border-t border-[#5ed1ff]/40 pt-3">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#5ed1ff]/90">Samantha Schmid · Portfolio</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-white/15 bg-black/30 px-4 py-4">
                <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[#5ed1ff]/82">Approach</p>
                <p className="mt-2 text-sm leading-6 text-white/72">
                  See the pattern, design the system, and ship the version that still works when conditions are messy.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#080808] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#080808] to-transparent" />

          <div ref={marqueeTopRef} className="mb-3 flex w-max gap-10 whitespace-nowrap">
            {duplicated(MARQUEE_A).map((item, index) => (
              <span
                key={`top-${item}-${index}`}
                className="flex items-center gap-10 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/72"
              >
                {item}
                <span className="text-[#5ed1ff]/55">✦</span>
              </span>
            ))}
          </div>

          <div ref={marqueeBottomRef} className="flex w-max -translate-x-1/2 gap-10 whitespace-nowrap">
            {duplicated(MARQUEE_B).map((item, index) => (
              <span
                key={`bottom-${item}-${index}`}
                className="flex items-center gap-10 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/45"
              >
                {item}
                <span className="text-[#5ed1ff]/35">✦</span>
              </span>
            ))}
          </div>
        </section>

        <section id="about" className="portfolio-panel relative flex min-h-[100svh] items-center px-5 py-24 md:px-10 md:py-28">
          <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
            <div data-animate>
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/80">About</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">Built to turn noise into order.</h2>
              <p className="mt-6 max-w-[54ch] text-sm leading-7 text-white/72 md:text-base">
                My core focus is making complex workflows understandable and reliable. I blend engineering rigor,
                analytics discipline, and product thinking to build systems people can trust under pressure.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2" data-animate>
              <article className="rounded-3xl border border-white/15 bg-white/[0.04] p-5">
                <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#5ed1ff]/80">Engineering</p>
                <p className="mt-3 text-sm leading-6 text-white/75">Mechanical Engineering, manufacturing workflows, and test systems.</p>
              </article>
              <article className="rounded-3xl border border-white/15 bg-white/[0.04] p-5">
                <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#5ed1ff]/80">Analytics</p>
                <p className="mt-3 text-sm leading-6 text-white/75">Business analytics with practical dashboards, data cleanup, and process improvement.</p>
              </article>
              <article className="rounded-3xl border border-white/15 bg-white/[0.04] p-5 sm:col-span-2">
                <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#5ed1ff]/80">Builder Mode</p>
                <p className="mt-3 text-sm leading-6 text-white/75">
                  Active projects include RoutineOS, travel storytelling tools, and systems centered around health and
                  clarity.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="portfolio-panel relative flex min-h-[100svh] items-center px-5 py-24 md:px-10 md:py-28">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-10 max-w-3xl" data-animate>
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/80">Projects</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">Intentional products, not filler demos.</h2>
              <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
                Where screenshots exist, they are real. Where they do not, the card stays text-first and honest.
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-12" data-animate>
              {PROJECTS.map((project) => (
                <article
                  key={project.id}
                  className={`${project.layoutClass} group relative min-h-[23rem] overflow-hidden rounded-[1.8rem] border border-white/15 bg-[#0e0e0e]/90 transition-all duration-300 hover:border-[#5ed1ff]/45`}
                >
                  {project.mode === "image" && project.image ? (
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? `${project.title} preview`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10" />
                    </div>
                  ) : (
                    <div className="absolute inset-0" style={TEXT_CARD_BACKGROUND} />
                  )}

                  <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-7">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#5ed1ff]/90">{project.subtitle}</p>
                    <h3
                      className={`mt-2 font-black uppercase leading-[0.95] tracking-tight ${
                        project.mode === "text" ? "text-3xl md:text-4xl" : "text-2xl md:text-3xl"
                      }`}
                    >
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-[44ch] text-sm leading-6 text-white/75 md:text-[0.96rem]">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-black/35 px-2.5 py-1 text-[0.56rem] uppercase tracking-[0.16em] text-white/75"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-fit rounded-full border border-[#5ed1ff]/50 bg-[#5ed1ff]/12 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-[#5ed1ff]"
                      >
                        Open Project ↗
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="employment" className="portfolio-panel relative flex min-h-[100svh] items-center px-5 py-24 md:px-10 md:py-28">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8" data-animate>
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/80">Employment</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">Where I have worked.</h2>
            </div>
            <div className="grid gap-4 lg:grid-cols-2" data-animate>
              {EMPLOYMENT.map((job) => (
                <article key={job.role} className="rounded-3xl border border-white/15 bg-white/[0.04] p-6">
                  <p className="text-[0.64rem] uppercase tracking-[0.22em] text-[#5ed1ff]/80">{job.period}</p>
                  <h3 className="mt-3 text-xl font-semibold">{job.role}</h3>
                  <p className="mt-1 text-sm text-white/65">{job.company}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-white/72">
                    {job.bullets.map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="life" className="portfolio-panel relative flex min-h-[100svh] items-center px-5 py-24 md:px-10 md:py-28">
          <div className="mx-auto w-full max-w-7xl">
            <div className="mb-8 max-w-3xl" data-animate>
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/80">Life</p>
              <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">Travel frames and lived moments.</h2>
              <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
                A curated set of browser-safe photos from `public/Pics` only. No placeholders, no HEIC files.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-animate>
              {LIFE_PHOTOS.map((photo, index) => (
                <article
                  key={photo.src}
                  className={`group overflow-hidden rounded-2xl border border-white/15 bg-black/20 ${
                    index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
                    <p className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[0.54rem] uppercase tracking-[0.16em] text-white/85">
                      {photo.alt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="portfolio-panel relative flex min-h-[100svh] items-center px-5 py-24 md:px-10 md:py-28">
          <div className="mx-auto w-full max-w-7xl space-y-7" data-animate>
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/80">Contact</p>
            <h2 className="text-3xl font-black uppercase leading-tight tracking-tight md:text-6xl">Let&apos;s build something intentional.</h2>
            <a href="mailto:sammieschmid22@gmail.com" className="block text-2xl font-semibold text-[#5ed1ff] md:text-4xl">
              sammieschmid22@gmail.com
            </a>
            <div className="flex flex-wrap gap-3">
              <a
                href="mailto:sammieschmid22@gmail.com"
                className="rounded-full bg-[#5ed1ff] px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/samanthaschmid2/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/85"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/samschmid22"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/85"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
