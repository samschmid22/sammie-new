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

const HERO_TAGS = [
  { index: "01", label: "Systems Direction" },
  { index: "02", label: "Engineering Rigor" },
  { index: "03", label: "Analytics Clarity" },
  { index: "04", label: "Product Execution" },
];

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

const LIFE_IMAGES: Array<{
  src: string;
  alt: string;
  layoutClass: string;
  aspectClass: string;
  depth: number;
}> = [
  {
    src: "/Pics/Amsterdam.jpeg",
    alt: "Amsterdam",
    layoutClass: "lg:col-span-7",
    aspectClass: "aspect-[16/10]",
    depth: 8,
  },
  {
    src: "/Pics/Paris.jpeg",
    alt: "Paris",
    layoutClass: "lg:col-span-5",
    aspectClass: "aspect-[5/6]",
    depth: 14,
  },
  {
    src: "/Pics/Santorini.jpeg",
    alt: "Santorini",
    layoutClass: "lg:col-span-4",
    aspectClass: "aspect-[4/5]",
    depth: 18,
  },
  {
    src: "/Pics/Rome.jpeg",
    alt: "Rome",
    layoutClass: "lg:col-span-4",
    aspectClass: "aspect-[4/5]",
    depth: 12,
  },
  {
    src: "/Pics/Havana.jpeg",
    alt: "Havana",
    layoutClass: "lg:col-span-4",
    aspectClass: "aspect-[4/5]",
    depth: 16,
  },
  {
    src: "/Pics/Whistler.JPG",
    alt: "Whistler",
    layoutClass: "lg:col-span-12",
    aspectClass: "aspect-[16/6]",
    depth: 6,
  },
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

    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.4, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.4, ease: "power3.out" });
    const stageRX = gsap.quickTo(stage, "rotationX", { duration: 0.6, ease: "power3.out" });
    const stageRY = gsap.quickTo(stage, "rotationY", { duration: 0.6, ease: "power3.out" });
    const sheen = stage.querySelector<HTMLElement>("[data-hero-sheen]");
    const sheenX = sheen ? gsap.quickTo(sheen, "xPercent", { duration: 0.6, ease: "power3.out" }) : null;
    const sheenY = sheen ? gsap.quickTo(sheen, "yPercent", { duration: 0.6, ease: "power3.out" }) : null;

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

      sheenX?.(px * 38);
      sheenY?.(py * 22);
    };

    const onPointerLeave = () => {
      stageRX(0);
      stageRY(0);
      layerSetters.forEach((setter) => {
        setter.x(0);
        setter.y(0);
      });
      sheenX?.(0);
      sheenY?.(0);
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
        { autoAlpha: 0, y: 54 },
        { autoAlpha: 1, y: 0, duration: 1.25, stagger: 0.14, ease: "power4.out", delay: 0.18 },
      );

      gsap.fromTo(
        "[data-hero-word]",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.09,
          ease: "power4.out",
          delay: 0.42,
        },
      );

      gsap.to("[data-hero-orbit]", {
        rotation: 360,
        duration: 44,
        repeat: -1,
        ease: "none",
      });

      gsap.to("[data-hero-drift='a']", {
        x: 26,
        y: -16,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-hero-drift='b']", {
        x: -18,
        y: 14,
        duration: 11,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      if (marqueeTopRef.current) {
        gsap.to(marqueeTopRef.current, {
          xPercent: -50,
          duration: 36,
          repeat: -1,
          ease: "none",
        });
      }

      if (marqueeBottomRef.current) {
        gsap.to(marqueeBottomRef.current, {
          xPercent: 50,
          duration: 36,
          repeat: -1,
          ease: "none",
        });
      }

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=175%",
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
          end: `+=${aboutCards.length * 380}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
        },
      });

      aboutTl.fromTo("[data-about-left]", { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.6 });

      aboutCards.forEach((card, index) => {
        aboutTl.fromTo(
          card,
          { autoAlpha: 0.05, y: 96, scale: 0.93 },
          { autoAlpha: 1, y: 0, scale: 1, duration: 0.62 },
          index === 0 ? "<0.1" : ">-0.06",
        );

        if (index > 0) {
          aboutTl.to(aboutCards[index - 1], { autoAlpha: 0.18, scale: 0.94, duration: 0.38 }, "<");
        }
      });

      const projectDistance = () => Math.max(0, projectsTrack.scrollWidth - window.innerWidth + 220);

      const projectsTween = gsap.to(projectsTrack, {
        x: () => -projectDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top top",
          end: () => `+=${projectDistance() + window.innerHeight * 1.15}`,
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      gsap.to("[data-project-glow]", {
        xPercent: 14,
        yPercent: -12,
        duration: 9,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.6,
      });

      const projectCards = gsap.utils.toArray<HTMLElement>("[data-project-card]");

      projectCards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.88, autoAlpha: 0.4, yPercent: 6, filter: "blur(1.5px)" },
          {
            scale: 1,
            autoAlpha: 1,
            yPercent: 0,
            filter: "blur(0px)",
            ease: "none",
            scrollTrigger: {
              trigger: card,
              containerAnimation: projectsTween,
              start: "left 90%",
              end: "center center",
              scrub: true,
            },
          },
        );

        gsap.to(card, {
          scale: 0.9,
          autoAlpha: 0.44,
          yPercent: -2,
          filter: "blur(1.5px)",
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: projectsTween,
            start: "center center",
            end: "right -10%",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        "[data-job-card]",
        { autoAlpha: 0, y: 74, scale: 0.96 },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          stagger: 0.2,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#employment",
            start: "top 76%",
            end: "top 28%",
            scrub: 1,
          },
        },
      );

      const lifeLayers = gsap.utils.toArray<HTMLElement>("[data-life-depth]");

      lifeLayers.forEach((layer) => {
        const depth = Number(layer.dataset.lifeDepth ?? 10);

        gsap.to(layer, {
          yPercent: depth,
          rotate: depth > 15 ? 0.5 : -0.3,
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
        { autoAlpha: 0, y: 52 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.15,
          stagger: 0.14,
          ease: "power4.out",
          scrollTrigger: {
            trigger: "#contact",
            start: "top 78%",
            end: "top 24%",
            scrub: 1,
          },
        },
      );

      gsap.to("[data-contact-orbit]", {
        rotation: 360,
        duration: 26,
        repeat: -1,
        ease: "none",
      });

      gsap.to("[data-contact-glow]", {
        scale: 1.08,
        autoAlpha: 0.72,
        duration: 4.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

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

      <div
        className="pointer-events-none fixed inset-0 z-[6] opacity-[0.055]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "110px 110px",
        }}
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
          <nav className="flex items-center gap-1.5 md:gap-3">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative rounded-full border px-3.5 py-1.5 text-[0.58rem] uppercase tracking-[0.2em] transition-all duration-300 md:text-[0.62rem] ${
                  activeSection === item.id
                    ? "border-[#5ed1ff]/58 bg-[#5ed1ff]/10 text-[#5ed1ff]"
                    : "border-white/14 text-white/56 hover:border-white/32 hover:text-white/90 hover:bg-white/[0.03]"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-1/2 h-[3px] w-[3px] -translate-x-1/2 rounded-full bg-[#5ed1ff] transition-all duration-300 ${
                    activeSection === item.id ? "opacity-100 scale-100" : "opacity-0 scale-50 group-hover:opacity-60 group-hover:scale-100"
                  }`}
                />
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-16">
        <section id="hero" className="relative isolate min-h-[100svh] px-5 py-28 md:px-10 md:py-36">
          <div className="pointer-events-none absolute inset-0">
            <div data-hero-parallax="slow" className="absolute left-[-8rem] top-0 h-[32rem] w-[32rem] rounded-full bg-[#5ed1ff]/15 blur-[128px]" />
            <div data-hero-parallax="fast" className="absolute bottom-6 right-[-10rem] h-[24rem] w-[24rem] rounded-full bg-[#5ed1ff]/11 blur-[118px]" />
            <div
              data-hero-drift="a"
              className="absolute right-[26%] top-[16%] h-[7.5rem] w-[7.5rem] rounded-full border border-[#5ed1ff]/30 bg-[#5ed1ff]/8 blur-[2px]"
            />
            <div data-hero-drift="b" className="absolute left-[38%] top-[54%] h-[1px] w-[8rem] bg-gradient-to-r from-transparent via-[#5ed1ff]/75 to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.16]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "48px 48px",
              }}
            />
          </div>

          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-end gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-10">
              <p data-hero-intro className="text-[0.68rem] uppercase tracking-[0.38em] text-[#5ed1ff]/90">
                Portfolio Studio · 2026
              </p>

              <h1 className="max-w-[12ch] text-5xl font-black uppercase leading-[0.88] tracking-[-0.03em] sm:text-7xl lg:text-[7.8rem]">
                <span data-hero-word className="block">
                  Samantha
                </span>
                <span data-hero-word className="block text-transparent [-webkit-text-stroke:1.5px_#5ed1ff]">
                  Schmid
                </span>
              </h1>

              <p data-hero-intro className="max-w-[58ch] text-[1rem] leading-8 text-white/78 md:text-[1.12rem]">
                Designing disciplined systems for complex, high-noise environments across engineering, analytics, and
                product. The experience below is intentionally cinematic, paced, and built around motion clarity.
              </p>

              <div data-hero-intro className="grid max-w-2xl gap-2.5 sm:grid-cols-2">
                {HERO_TAGS.map((tag) => (
                  <div
                    key={tag.index}
                    className="group flex items-center justify-between rounded-2xl border border-white/14 bg-white/[0.03] px-4 py-3 transition-all duration-400 hover:border-[#5ed1ff]/35 hover:bg-white/[0.05]"
                  >
                    <span className="text-[0.54rem] font-semibold tracking-[0.24em] text-[#5ed1ff]/80">{tag.index}</span>
                    <span className="text-[0.66rem] uppercase tracking-[0.18em] text-white/78">{tag.label}</span>
                  </div>
                ))}
              </div>

              <div data-hero-intro className="flex flex-wrap gap-3 pt-1">
                <Link
                  href="mailto:sammieschmid22@gmail.com"
                  className="rounded-full border border-[#5ed1ff]/65 bg-[#5ed1ff] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black shadow-[0_8px_30px_rgba(94,209,255,0.24)] transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[0_12px_36px_rgba(94,209,255,0.36)]"
                >
                  Contact
                </Link>
                <Link
                  href="https://www.linkedin.com/in/samanthaschmid2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 bg-white/[0.02] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/86 transition-all duration-300 hover:border-[#5ed1ff]/45 hover:text-[#5ed1ff]"
                >
                  LinkedIn
                </Link>
              </div>
            </div>

            <div data-hero-intro className="mx-auto w-full max-w-[470px] [perspective:1700px]">
              <div ref={heroStageRef} className="relative [transform-style:preserve-3d]">
                <div
                  data-hero-depth="2"
                  data-hero-orbit
                  className="pointer-events-none absolute inset-[-2.4rem] rounded-[2.5rem] border border-[#5ed1ff]/24"
                />
                <div
                  data-hero-depth="1"
                  className="pointer-events-none absolute -left-6 -top-6 h-48 w-48 rounded-full bg-[#5ed1ff]/22 blur-[78px]"
                />
                <div
                  data-hero-depth="1.7"
                  className="pointer-events-none absolute -bottom-8 right-[-1.2rem] h-44 w-44 rounded-full bg-[#5ed1ff]/15 blur-[76px]"
                />

                <div
                  data-hero-depth="1.2"
                  className="relative aspect-[3/4] overflow-hidden rounded-[2.1rem] border border-white/22 bg-black/35 shadow-[0_0_75px_rgba(94,209,255,0.2)]"
                >
                  <div
                    data-hero-depth="0.5"
                    className="pointer-events-none absolute inset-0 opacity-[0.16]"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                      backgroundSize: "26px 26px",
                    }}
                  />
                  <Image
                    src="/sammie.jpeg"
                    alt="Portrait of Samantha Schmid"
                    fill
                    priority
                    className="object-cover object-[50%_18%] scale-[1.02]"
                    sizes="(max-width: 1024px) 82vw, 470px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/20 to-transparent" />
                  <div
                    data-hero-sheen
                    className="pointer-events-none absolute -left-[40%] top-[-30%] h-[170%] w-[60%] rotate-[20deg] bg-gradient-to-r from-transparent via-[#5ed1ff]/30 to-transparent opacity-55 mix-blend-screen"
                  />
                  <div className="absolute bottom-5 left-5 right-5 border-t border-[#5ed1ff]/42 pt-3">
                    <p className="text-[0.62rem] uppercase tracking-[0.22em] text-[#5ed1ff]/90">Portfolio · Systems + Motion</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/10 bg-[#0a0a0a] py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#080808] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#080808] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/35 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/20 to-transparent" />

          <div ref={marqueeTopRef} className="mb-3 flex w-max gap-10 whitespace-nowrap">
            {loopItems(MARQUEE_ROW_A).map((item, index) => (
              <span
                key={`row-a-${item}-${index}`}
                className="flex items-center gap-10 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/74"
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
                className="flex items-center gap-10 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white/48"
              >
                {item}
                <span className="text-[#5ed1ff]/34">✦</span>
              </span>
            ))}
          </div>
        </section>

        <section id="about" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-30">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/24 to-transparent" />
          <div className="mx-auto grid w-full max-w-7xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <div data-about-left className="space-y-8">
              <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">About · Built to Build</p>
              <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-6xl">
                Built to
                <span className="block text-transparent [-webkit-text-stroke:1.3px_#5ed1ff]">build.</span>
              </h2>
              <p className="max-w-[44ch] text-sm leading-7 text-white/74 md:text-base">
                The left column stays grounded while the right unfolds in sequence. Engineering sets structure.
                Analytics sharpens signal. Product execution turns both into outcomes.
              </p>
            </div>

            <div className="relative h-[450px] md:h-[500px]">
              {ABOUT_CARDS.map((card, index) => (
                <article
                  key={card.title}
                  data-about-card
                  className="absolute inset-0 overflow-hidden rounded-[1.8rem] border border-white/14 bg-[#0d0d0d]/95 p-7 shadow-[0_18px_40px_rgba(0,0,0,0.35)] md:p-10"
                  style={{ zIndex: ABOUT_CARDS.length - index }}
                >
                  <div className="pointer-events-none absolute inset-0 opacity-[0.18]" style={textCardBackground} />
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/35 to-transparent" />
                  <span className="absolute right-6 top-6 text-[0.62rem] font-semibold tracking-[0.22em] text-[#5ed1ff]/72">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-[0.64rem] uppercase tracking-[0.2em] text-[#5ed1ff]/84">{card.meta}</p>
                  <h3 className="mt-5 max-w-[14ch] text-2xl font-black uppercase tracking-tight md:text-3xl">{card.title}</h3>
                  <p className="mt-4 max-w-[44ch] text-sm leading-7 text-white/74 md:text-[0.98rem]">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-30">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/24 to-transparent" />
          <div className="mb-10 max-w-5xl">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">Projects</p>
            <h2 className="mt-3 max-w-5xl text-3xl font-black uppercase leading-[0.94] tracking-tight md:text-6xl">
              Case-study panels built for depth.
            </h2>
            <p className="mt-4 max-w-[58ch] text-sm leading-7 text-white/72 md:text-base">
              The scroll track prioritizes narrative pacing and hierarchy. Real visuals are used where available.
              Missing screenshots are treated as intentional text-first art-directed panels.
            </p>
          </div>

          <div className="overflow-hidden">
            <div ref={projectsTrackRef} className="flex w-max gap-8 md:gap-10">
              {PROJECTS.map((project) => (
                <article
                  key={project.id}
                  data-project-card
                  className="project-card group relative min-h-[69vh] w-[84vw] max-w-[980px] overflow-hidden rounded-[2.15rem] border border-white/14 bg-[#0e0e0e] transition-[border-color,box-shadow] duration-500 hover:border-[#5ed1ff]/44 hover:shadow-[0_18px_48px_rgba(94,209,255,0.12)] md:w-[74vw]"
                >
                  {project.mode === "image" && project.image ? (
                    <div className="absolute inset-0">
                      <Image
                        src={project.image}
                        alt={project.imageAlt ?? `${project.title} preview`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        sizes="(max-width: 1024px) 85vw, 70vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/44 to-black/14" />
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0" style={textCardBackground} />
                      <div
                        data-project-glow
                        className="pointer-events-none absolute -left-[18%] top-[-26%] h-[70%] w-[60%] rounded-full bg-[#5ed1ff]/22 blur-[78px]"
                      />
                      <div
                        className="pointer-events-none absolute right-[-20%] top-[36%] h-[46%] w-[58%] rounded-full bg-[#5ed1ff]/12 blur-[72px]"
                        data-project-glow
                      />
                    </>
                  )}

                  <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-11">
                    <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#5ed1ff]/90">{project.subtitle}</p>
                    <h3 className="mt-2 max-w-[14ch] text-3xl font-black uppercase leading-[0.92] tracking-tight md:text-[3.35rem]">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-[52ch] text-sm leading-7 text-white/78 md:text-[1.03rem]">{project.description}</p>

                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/18 bg-black/45 px-3 py-1.5 text-[0.54rem] uppercase tracking-[0.16em] text-white/82"
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
                        className="mt-7 inline-flex w-fit rounded-full border border-[#5ed1ff]/65 bg-[#5ed1ff]/14 px-5 py-2.5 text-[0.64rem] font-semibold uppercase tracking-[0.18em] text-[#5ed1ff] transition-all duration-300 hover:border-[#5ed1ff] hover:bg-[#5ed1ff]/22 hover:translate-y-[-1px]"
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

        <section id="employment" className="relative min-h-[100svh] px-5 py-26 md:px-10 md:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/22 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">Employment</p>
            <h2 className="mt-4 text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">Experience timeline.</h2>
            <p className="mt-4 max-w-[54ch] text-sm leading-7 text-white/72 md:text-base">
              A concise record of high-accountability environments and the systems-level work delivered in each.
            </p>

            <div className="relative mt-12 grid gap-6 lg:grid-cols-2">
              <div className="pointer-events-none absolute bottom-0 left-2 top-2 hidden w-px bg-gradient-to-b from-[#5ed1ff]/62 to-transparent lg:block" />
              {EMPLOYMENT.map((job) => (
                <article
                  key={job.role}
                  data-job-card
                  className="group relative overflow-hidden rounded-[1.8rem] border border-white/14 bg-[#0d0d0d]/94 p-7 transition-all duration-400 hover:border-[#5ed1ff]/40 hover:bg-[#101010] md:p-8"
                >
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/38 to-transparent" />
                  <span className="absolute right-6 top-6 text-[0.6rem] font-semibold tracking-[0.2em] text-[#5ed1ff]/72">
                    {job.period.slice(0, 4)}
                  </span>
                  <p className="text-[0.62rem] uppercase tracking-[0.2em] text-[#5ed1ff]/86">{job.period}</p>
                  <h3 className="mt-3 max-w-[20ch] text-xl font-semibold md:text-2xl">{job.role}</h3>
                  <p className="mt-1 text-sm text-white/66">{job.company}</p>
                  <ul className="mt-5 space-y-2 text-sm leading-6 text-white/76">
                    {job.highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="life" className="relative min-h-[100svh] px-5 py-26 md:px-10 md:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/22 to-transparent" />
          <div className="mx-auto w-full max-w-7xl">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">Life · Beyond the Work</p>
            <h2 className="mt-4 max-w-4xl text-3xl font-black uppercase leading-tight tracking-tight md:text-5xl">
              Curated travel frames.
            </h2>
            <p className="mt-4 max-w-[56ch] text-sm leading-7 text-white/72 md:text-base">
              Personal context, presented with the same editorial discipline as the rest of the portfolio.
            </p>

            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
              {LIFE_IMAGES.map((image) => (
                <article
                  key={image.src}
                  data-life-depth={image.depth}
                  className={`group overflow-hidden rounded-2xl border border-white/14 bg-black/20 transition-all duration-500 hover:border-[#5ed1ff]/35 ${image.layoutClass}`}
                >
                  <div className={`relative ${image.aspectClass}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 80vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/74 via-transparent to-transparent" />
                    <p className="absolute bottom-3 left-3 rounded-full border border-white/20 bg-black/55 px-3 py-1 text-[0.54rem] uppercase tracking-[0.16em] text-white/88">
                      {image.alt}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative min-h-[88svh] px-5 py-28 md:px-10 md:py-34">
          <div className="pointer-events-none absolute inset-0">
            <div data-contact-glow className="absolute left-[14%] top-[20%] h-56 w-56 rounded-full bg-[#5ed1ff]/18 blur-[100px]" />
            <div
              data-contact-orbit
              className="absolute right-[10%] top-[24%] h-40 w-40 rounded-full border border-[#5ed1ff]/32"
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/24 to-transparent" />
          </div>
          <div className="mx-auto w-full max-w-7xl space-y-9">
            <p data-contact-intro className="text-[0.68rem] uppercase tracking-[0.34em] text-[#5ed1ff]/82">
              Contact
            </p>
            <h2 data-contact-intro className="max-w-4xl text-4xl font-black uppercase leading-[0.9] tracking-tight md:text-7xl">
              Let&apos;s build
              <span className="block text-transparent [-webkit-text-stroke:1.4px_#5ed1ff]">something precise.</span>
            </h2>
            <a
              data-contact-intro
              href="mailto:sammieschmid22@gmail.com"
              className="block text-2xl font-semibold text-[#5ed1ff] md:text-5xl hover:text-[#76dcff]"
            >
              sammieschmid22@gmail.com
            </a>
            <div data-contact-intro className="flex flex-wrap gap-3">
              <a
                href="mailto:sammieschmid22@gmail.com"
                className="rounded-full border border-[#5ed1ff]/68 bg-[#5ed1ff] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-black shadow-[0_10px_30px_rgba(94,209,255,0.25)] transition-all duration-300 hover:translate-y-[-1px] hover:shadow-[0_14px_38px_rgba(94,209,255,0.38)]"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/samanthaschmid2/"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 bg-white/[0.02] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/86 transition-all duration-300 hover:border-[#5ed1ff]/45 hover:text-[#5ed1ff]"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/samschmid22"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-white/20 bg-white/[0.02] px-6 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/86 transition-all duration-300 hover:border-[#5ed1ff]/45 hover:text-[#5ed1ff]"
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
