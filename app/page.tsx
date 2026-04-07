"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionId = "hero" | "about" | "projects" | "employment" | "life" | "contact";

type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  mode: "text" | "image";
  image?: string;
  imageAlt?: string;
  href?: string;
};

const NAV_ITEMS: Array<{ id: SectionId; label: string }> = [
  { id: "hero", label: "Hero" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "employment", label: "Employment" },
  { id: "life", label: "Life" },
  { id: "contact", label: "Contact" },
];

const HERO_WORDS = ["Engineer", "Analyst", "Builder", "Systems Thinker"];

const MARQUEE_ROW_A = [
  "Mechanical Engineering",
  "Business Analytics",
  "GSAP Motion",
  "Process Design",
  "Product Thinking",
  "Data Clarity",
  "Execution",
  "RoutineOS",
];

const MARQUEE_ROW_B = [
  "Cinematic Portfolio",
  "Scroll Architecture",
  "Human Reset",
  "Travel Scrapbook",
  "Radar Sign",
  "Interactive Storytelling",
  "Built to Build",
  "Samantha Schmid",
];

const ABOUT_CARDS = [
  {
    title: "Engineering Core",
    text: "Mechanical training shaped a bias toward rigor, edge cases, and systems that keep working under stress.",
    meta: "BSE Mechanical Engineering · ASU",
  },
  {
    title: "Analytics Layer",
    text: "Business analytics adds signal extraction: clean inputs, crisp dashboards, and decisions tied to measurable outcomes.",
    meta: "MS Business Analytics · In Progress",
  },
  {
    title: "Product Builder",
    text: "Execution happens through products: disciplined routine systems, health frameworks, and story-driven digital experiences.",
    meta: "Apps in Active Development",
  },
];

const PROJECTS: Project[] = [
  {
    id: "routineos",
    title: "RoutineOS",
    subtitle: "Systemized habits",
    description: "An operating system for disciplined days: planning, adherence, and momentum in one focused loop.",
    tags: ["Habits", "Execution", "Product"],
    mode: "text",
    href: "https://routineos.vercel.app",
  },
  {
    id: "travel-scrapbook",
    title: "Travel Scrapbook",
    subtitle: "Been There Done That",
    description: "A narrative archive of places and moments, designed for memory as an interactive product surface.",
    tags: ["Travel", "Story", "Interaction"],
    mode: "text",
    href: "https://travel-scrapbook.vercel.app",
  },
  {
    id: "human-reset",
    title: "Human Reset",
    subtitle: "Health framework",
    description: "A practical structure for clarity, energy, and disciplined recovery when life gets noisy.",
    tags: ["Health", "Systems", "Focus"],
    mode: "text",
  },
  {
    id: "radar-sign",
    title: "Radar-Readable Sign",
    subtitle: "Mobility safety",
    description: "A visibility-first infrastructure concept built to improve machine readability for autonomous navigation.",
    tags: ["Engineering", "Mobility", "Safety"],
    mode: "image",
    image: "/Pics/AV%20Sign.png",
    imageAlt: "Radar-readable sign concept",
  },
];

const EMPLOYMENT = [
  {
    period: "09/2025 - 11/2025",
    role: "Manufacturing Engineer Intern",
    company: "General Dynamics Mission Systems",
    highlights: [
      "Supported manufacturing engineering workflows for AMDR radar initiatives",
      "Worked inside high-rigor production processes and documentation controls",
    ],
  },
  {
    period: "05/2024 - 08/2024",
    role: "Powertrain Test Intern",
    company: "Nissan Motor Co.",
    highlights: [
      "Executed powertrain test loops and consolidated measurement data",
      "Built Excel and MATLAB analyses to extract performance signal",
    ],
  },
];

const LIFE_IMAGES = [
  { src: "/Pics/Amsterdam.jpeg", alt: "Amsterdam" },
  { src: "/Pics/Paris.jpeg", alt: "Paris" },
  { src: "/Pics/Santorini.jpeg", alt: "Santorini" },
  { src: "/Pics/Rome.jpeg", alt: "Rome" },
  { src: "/Pics/Havana.jpeg", alt: "Havana" },
  { src: "/Pics/Whistler.JPG", alt: "Whistler" },
];

function loopItems(items: string[]) {
  return [...items, ...items];
}

const textCardBackground = {
  backgroundColor: "#0b0b0b",
  backgroundImage:
    "radial-gradient(circle at 22% 22%, rgba(94,209,255,0.24), transparent 43%), radial-gradient(circle at 78% 80%, rgba(94,209,255,0.12), transparent 48%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
  backgroundSize: "100% 100%, 100% 100%, 30px 30px, 30px 30px",
};

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const marqueeTopRef = useRef<HTMLDivElement>(null);
  const marqueeBottomRef = useRef<HTMLDivElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);

  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const splash = splashRef.current;

    if (!splash) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const ctx = gsap.context(() => {
      const intro = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          setShowSplash(false);
          document.body.style.overflow = previousOverflow;
        },
      });

      intro
        .fromTo("[data-splash-line]", { scaleX: 0 }, { scaleX: 1, duration: 1.1, transformOrigin: "left center" })
        .fromTo(
          "[data-splash-text]",
          { autoAlpha: 0, y: 16, letterSpacing: "0.24em" },
          { autoAlpha: 1, y: 0, duration: 0.65, letterSpacing: "0.18em" },
          "<0.2",
        )
        .to("[data-splash-text]", { autoAlpha: 0, y: -8, duration: 0.45 }, "+=0.4")
        .to(splash, { autoAlpha: 0, duration: 0.45 }, "-=0.15");
    }, splash);

    return () => {
      document.body.style.overflow = previousOverflow;
      ctx.revert();
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    const stage = heroStageRef.current;

    if (!cursor || !stage) {
      return;
    }

    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3.out" });
    const stageRX = gsap.quickTo(stage, "rotationX", { duration: 0.5, ease: "power3.out" });
    const stageRY = gsap.quickTo(stage, "rotationY", { duration: 0.5, ease: "power3.out" });

    const heroLayers = gsap.utils.toArray<HTMLElement>("[data-hero-depth]");
    const layerSetters = heroLayers.map((layer) => ({
      depth: Number(layer.dataset.heroDepth ?? 0),
      x: gsap.quickTo(layer, "x", { duration: 0.45, ease: "power3.out" }),
      y: gsap.quickTo(layer, "y", { duration: 0.45, ease: "power3.out" }),
    }));

    const onPointerMove = (event: PointerEvent) => {
      cursorX(event.clientX - 170);
      cursorY(event.clientY - 170);

      const rect = stage.getBoundingClientRect();
      const px = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const py = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

      stageRY(px * 7);
      stageRX(py * -7);

      layerSetters.forEach((setter) => {
        setter.x(px * setter.depth * 12);
        setter.y(py * setter.depth * 10);
      });
    };

    const onPointerLeave = () => {
      stageRX(0);
      stageRY(0);
      layerSetters.forEach((setter) => {
        setter.x(0);
        setter.y(0);
      });
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    stage.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    if (showSplash) {
      return;
    }

    const root = rootRef.current;
    const projectsTrack = projectsTrackRef.current;

    if (!root || !projectsTrack) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-intro]",
        { autoAlpha: 0, y: 42 },
        { autoAlpha: 1, y: 0, duration: 1, stagger: 0.1, ease: "power3.out" },
      );

      gsap.fromTo(
        "[data-hero-word]",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.07,
          ease: "power3.out",
          delay: 0.35,
        },
      );

      gsap.to("[data-hero-orbit]", {
        rotation: 360,
        duration: 28,
        repeat: -1,
        ease: "none",
      });

      if (marqueeTopRef.current) {
        gsap.to(marqueeTopRef.current, {
          xPercent: -50,
          duration: 26,
          repeat: -1,
          ease: "none",
        });
      }

      if (marqueeBottomRef.current) {
        gsap.to(marqueeBottomRef.current, {
          xPercent: 50,
          duration: 26,
          repeat: -1,
          ease: "none",
        });
      }

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=140%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      gsap.to("[data-hero-parallax='slow']", {
        yPercent: 22,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-parallax='fast']", {
        yPercent: -18,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      const aboutCards = gsap.utils.toArray<HTMLElement>("[data-about-card]");
      const aboutTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          end: `+=${aboutCards.length * 300}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      aboutTl.fromTo("[data-about-left]", { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.4 });

      aboutCards.forEach((card, index) => {
        aboutTl.fromTo(
          card,
          { autoAlpha: 0.15, y: 70, scale: 0.96 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.45 },
          index === 0 ? "<0.15" : ">-0.1",
        );

        if (index > 0) {
          aboutTl.to(aboutCards[index - 1], { autoAlpha: 0.25, scale: 0.95, duration: 0.3 }, "<");
        }
      });

      const projectDistance = () => Math.max(0, projectsTrack.scrollWidth - window.innerWidth + 120);

      gsap.to(projectsTrack, {
        x: () => -projectDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top top",
          end: () => `+=${projectDistance() + window.innerHeight * 0.7}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.fromTo(
        "[data-job-card]",
        { autoAlpha: 0, y: 60 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#employment",
            start: "top 72%",
            end: "top 35%",
            scrub: 0.8,
          },
        },
      );

      const lifeLayers = gsap.utils.toArray<HTMLElement>("[data-life-depth]");

      lifeLayers.forEach((layer) => {
        const depth = Number(layer.dataset.lifeDepth ?? 10);

        gsap.to(layer, {
          yPercent: depth,
          scrollTrigger: {
            trigger: "#life",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        "[data-contact-intro]",
        { autoAlpha: 0, y: 40 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.09,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contact",
            start: "top 72%",
            end: "top 38%",
            scrub: 0.8,
          },
        },
      );

      NAV_ITEMS.forEach((item) => {
        ScrollTrigger.create({
          trigger: `#${item.id}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveSection(item.id),
          onEnterBack: () => setActiveSection(item.id),
        });
      });
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
        <div ref={splashRef} className="fixed inset-0 z-[120] flex items-center justify-center bg-[#080808]" aria-hidden={!showSplash}>
          <div className="w-full max-w-[520px] px-6 text-center">
            <p data-splash-text className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-[#5ed1ff]">
              Samantha Schmid
            </p>
            <div className="mt-5 h-px w-full bg-white/10 overflow-hidden">
              <div data-splash-line className="h-full w-full bg-gradient-to-r from-[#5ed1ff] via-[#5ed1ff]/55 to-transparent" />
            </div>
          </div>
        </div>
      )}

      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-[340px] w-[340px] rounded-full bg-[#5ed1ff]/10 blur-[95px] md:block"
      />

      <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.06]">
        <div className="absolute -left-20 top-0 h-[28rem] w-[28rem] rounded-full bg-[#5ed1ff]/15 blur-[130px]" />
        <div className="absolute bottom-[-8rem] right-[-9rem] h-[30rem] w-[30rem] rounded-full bg-[#5ed1ff]/10 blur-[140px]" />
      </div>

      <header className="fixed inset-x-0 top-0 z-[90] border-b border-white/10 bg-[#080808]/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#hero" className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-[#5ed1ff]">
            SAMMIE
          </a>
          <nav className="flex items-center gap-2 md:gap-4">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full border px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] transition-colors md:text-[0.64rem] ${
                  activeSection === item.id
                    ? "border-[#5ed1ff]/55 bg-[#5ed1ff]/10 text-[#5ed1ff]"
                    : "border-white/15 text-white/60 hover:border-white/35 hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-16">
        <section id="hero" className="relative isolate min-h-[100svh] px-5 py-24 md:px-10 md:py-28">
          <div className="pointer-events-none absolute inset-0">
            <div data-hero-parallax="slow" className="absolute left-[-6rem] top-10 h-[26rem] w-[26rem] rounded-full bg-[#5ed1ff]/14 blur-[115px]" />
            <div data-hero-parallax="fast" className="absolute bottom-12 right-[-8rem] h-[20rem] w-[20rem] rounded-full bg-[#5ed1ff]/10 blur-[105px]" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-8">
              <p data-hero-intro className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/86">
                Cinematic Portfolio · 2026
              </p>

              <h1 className="max-w-[11ch] text-5xl font-black uppercase leading-[0.9] tracking-[-0.025em] sm:text-6xl lg:text-[7.2rem]">
                <span data-hero-word className="block">
                  Samantha
                </span>
                <span data-hero-word className="block text-transparent [-webkit-text-stroke:1.5px_#5ed1ff]">
                  Schmid
                </span>
              </h1>

              <p data-hero-intro className="max-w-[54ch] text-[0.98rem] leading-8 text-white/74 md:text-[1.08rem]">
                I build disciplined systems at the intersection of engineering, analytics, and product execution. This
                experience is scroll-driven, depth-heavy, and intentionally cinematic.
              </p>

              <div data-hero-intro className="grid max-w-xl gap-3 sm:grid-cols-2">
                {HERO_WORDS.map((word) => (
                  <div key={word} className="rounded-2xl border border-white/15 bg-white/[0.04] px-4 py-3">
                    <p className="text-[0.6rem] uppercase tracking-[0.2em] text-[#5ed1ff]/80">{word}</p>
                  </div>
                ))}
              </div>

              <div data-hero-intro className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="mailto:sammieschmid22@gmail.com"
                  className="rounded-full bg-[#5ed1ff] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black"
                >
                  Contact
                </Link>
                <Link
                  href="https://www.linkedin.com/in/samanthaschmid2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/82"
                >
                  LinkedIn
                </Link>
              </div>
            </div>

            <div data-hero-intro className="mx-auto w-full max-w-[460px] [perspective:1500px]">
              <div ref={heroStageRef} className="relative [transform-style:preserve-3d]">
                <div
                  data-hero-depth="2"
                  data-hero-orbit
                  className="pointer-events-none absolute inset-[-2.1rem] rounded-[2.4rem] border border-[#5ed1ff]/28"
                />
                <div
                  data-hero-depth="1"
                  className="pointer-events-none absolute -left-4 -top-5 h-40 w-40 rounded-full bg-[#5ed1ff]/20 blur-[70px]"
                />
                <div
                  data-hero-depth="1.6"
                  className="pointer-events-none absolute -bottom-6 right-[-1rem] h-36 w-36 rounded-full bg-[#5ed1ff]/16 blur-[68px]"
                />

                <div
                  data-hero-depth="1.2"
                  className="relative aspect-[3/4] overflow-hidden rounded-[2rem] border border-white/22 bg-black/30 shadow-[0_0_60px_rgba(94,209,255,0.16)]"
                >
                  <Image
                    src="/sammie.jpeg"
                    alt="Portrait of Samantha Schmid"
                    fill
                    priority
                    className="object-cover object-[50%_18%]"
                    sizes="(max-width: 1024px) 82vw, 460px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/76 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 border-t border-[#5ed1ff]/42 pt-3">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#5ed1ff]/90">Portfolio · Systems + Motion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-4">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#080808] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#080808] to-transparent" />

          <div ref={marqueeTopRef} className="mb-3 flex w-max gap-10 whitespace-nowrap">
            {loopItems(MARQUEE_ROW_A).map((item, index) => (
              <span
                key={`row-a-${item}-${index}`}
                className="flex items-center gap-10 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/72"
              >
                {item}
                <span className="text-[#5ed1ff]/58">✦</span>
              </span>
            ))}
          </div>

          <div ref={marqueeBottomRef} className="flex w-max -translate-x-1/2 gap-10 whitespace-nowrap">
            {loopItems(MARQUEE_ROW_B).map((item, index) => (
              <span
                key={`row-b-${item}-${index}`}
                className="flex items-center gap-10 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/45"
              >
                {item}
                <span className="text-[#5ed1ff]/34">✦</span>
              </span>
            ))}
          </div>
        </section>

        <section id="about" className="relative min-h-[100svh] px-5 py-20 md:px-10 md:py-24">
          <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-about-left className="space-y-6">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">About · Built to Build</p>
              <h2 className="text-4xl font-black uppercase leading-[0.92] tracking-tight md:text-6xl">
                Built to
                <span className="block text-transparent [-webkit-text-stroke:1.3px_#5ed1ff]">build.</span>
              </h2>
              <p className="max-w-[42ch] text-sm leading-7 text-white/72 md:text-base">
                The left stays anchored while the right tells the story. Engineering gives structure. Analytics gives
                clarity. Product work turns both into experience.
              </p>
            </div>

            <div className="relative h-[420px] md:h-[470px]">
              {ABOUT_CARDS.map((card, index) => (
                <article
                  key={card.title}
                  data-about-card
                  className="absolute inset-0 rounded-[1.8rem] border border-white/16 bg-[#0d0d0d]/94 p-7 md:p-9"
                  style={{ zIndex: ABOUT_CARDS.length - index }}
                >
                  <p className="text-[0.64rem] uppercase tracking-[0.2em] text-[#5ed1ff]/84">{card.meta}</p>
                  <h3 className="mt-5 text-2xl font-black uppercase tracking-tight md:text-3xl">{card.title}</h3>
                  <p className="mt-4 max-w-[42ch] text-sm leading-7 text-white/72 md:text-[0.98rem]">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative min-h-[100svh] px-5 py-20 md:px-10 md:py-24">
          <div className="mb-8">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">Projects</p>
            <h2 className="mt-3 max-w-4xl text-3xl font-black uppercase leading-[0.96] tracking-tight md:text-6xl">
              Oversized portfolio cards.
            </h2>
          </div>

          <div className="overflow-hidden">
            <div ref={projectsTrackRef} className="flex w-max gap-6 md:gap-8">
              {PROJECTS.map((project) => (
                <article
                  key={project.id}
                  className="project-card relative min-h-[66vh] w-[82vw] max-w-[920px] overflow-hidden rounded-[2rem] border border-white/15 bg-[#0e0e0e] md:w-[70vw]"
                >
                  {project.mode === "image" && project.image ? (
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? `${project.title} preview`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 85vw, 70vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/38 to-black/12" />
                    </div>
                  ) : (
                    <div className="absolute inset-0" style={textCardBackground} />
                  )}

                  <div className="relative z-10 flex h-full flex-col justify-end p-7 md:p-10">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#5ed1ff]/90">{project.subtitle}</p>
                    <h3 className="mt-2 text-3xl font-black uppercase leading-[0.94] tracking-tight md:text-5xl">{project.title}</h3>
                    <p className="mt-4 max-w-[48ch] text-sm leading-7 text-white/76 md:text-[1rem]">{project.description}</p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/20 bg-black/35 px-3 py-1.5 text-[0.56rem] uppercase tracking-[0.16em] text-white/76"
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
                        className="mt-6 inline-flex w-fit rounded-full border border-[#5ed1ff]/55 bg-[#5ed1ff]/12 px-4 py-2.5 text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-[#5ed1ff]"
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

        <section id="employment" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-28">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">Employment</p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">Experience timeline.</h2>

            <div className="relative mt-10 grid gap-5 lg:grid-cols-2">
              <div className="pointer-events-none absolute bottom-0 left-2 top-2 hidden w-px bg-gradient-to-b from-[#5ed1ff]/55 to-transparent lg:block" />
              {EMPLOYMENT.map((job) => (
                <article
                  key={job.role}
                  data-job-card
                  className="relative rounded-[1.6rem] border border-white/15 bg-[#0d0d0d]/92 p-6 md:p-7"
                >
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#5ed1ff]/86">{job.period}</p>
                  <h3 className="mt-3 text-xl font-semibold md:text-2xl">{job.role}</h3>
                  <p className="mt-1 text-sm text-white/64">{job.company}</p>
                  <ul className="mt-4 space-y-2 text-sm leading-6 text-white/74">
                    {job.highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="life" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-28">
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">Life · Beyond the Work</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">
              Travel with layered depth.
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LIFE_IMAGES.map((image, index) => (
                <article
                  key={image.src}
                  data-life-depth={index % 3 === 0 ? "18" : index % 3 === 1 ? "10" : "14"}
                  className={`group overflow-hidden rounded-2xl border border-white/15 bg-black/20 ${
                    index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  }`}
                >
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <p className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/50 px-3 py-1 text-[0.54rem] uppercase tracking-[0.16em] text-white/86">
                      {image.alt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative min-h-[88svh] px-5 py-24 md:px-10 md:py-28">
          <div className="mx-auto w-full max-w-7xl space-y-8">
            <p data-contact-intro className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">
              Contact
            </p>
            <h2 data-contact-intro className="max-w-4xl text-4xl font-black uppercase leading-[0.92] tracking-tight md:text-7xl">
              Let&apos;s build
              <span className="block text-transparent [-webkit-text-stroke:1.4px_#5ed1ff]">something precise.</span>
            </h2>
            <a
              data-contact-intro
              href="mailto:sammieschmid22@gmail.com"
              className="block text-2xl font-semibold text-[#5ed1ff] md:text-5xl"
            >
              sammieschmid22@gmail.com
            </a>
            <div data-contact-intro className="flex flex-wrap gap-3">
              <a
                href="mailto:sammieschmid22@gmail.com"
                className="rounded-full bg-[#5ed1ff] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/samanthaschmid2/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/86"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/samschmid22"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/86"
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
