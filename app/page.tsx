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
  "Mechanical Engineer",
  "Business Analytics",
  "Systems Builder",
  "Product Storytelling",
];

const MARQUEE_ROW_A = [
  "Mechanical Engineering",
  "Business Analytics",
  "System Design",
  "Process Discipline",
  "Product Narrative",
  "Data Clarity",
  "Travel Study",
  "RoutineOS",
];

const MARQUEE_ROW_B = [
  "Editorial Portfolio",
  "Interactive Rhythm",
  "The Human Reset",
  "Been There. Done That.",
  "Radar-Readable Sign",
  "Built to Build",
  "Samantha Schmid",
  "Arizona",
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
    id: "radar-sign",
    title: "Radar-Readable Sign",
    subtitle: "Mobility safety",
    description: "A visibility-first infrastructure concept built to improve machine readability for autonomous navigation.",
    tags: ["Engineering", "Mobility", "Safety"],
    mode: "image",
    image: "/Pics/AV%20Sign.png",
    imageAlt: "Radar-readable sign concept",
  },
  {
    id: "travel-scrapbook",
    title: "Been There. Done That.",
    subtitle: "Travel scrapbook",
    description: "A narrative archive of places and moments, designed for memory as an interactive product surface.",
    tags: ["Travel", "Story", "Interaction"],
    mode: "text",
    href: "https://travel-scrapbook.vercel.app",
  },
  {
    id: "human-reset",
    title: "The Human Reset",
    subtitle: "Health framework",
    description: "A practical structure for clarity, energy, and disciplined recovery when life gets noisy.",
    tags: ["Health", "Systems", "Focus"],
    mode: "text",
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
  backgroundColor: "#0c0c0c",
  backgroundImage:
    "radial-gradient(circle at 16% 18%, rgba(255,255,255,0.1), transparent 40%), radial-gradient(circle at 78% 72%, rgba(94,209,255,0.14), transparent 46%), linear-gradient(138deg, rgba(255,255,255,0.06), rgba(255,255,255,0))",
  backgroundSize: "100% 100%, 100% 100%, 100% 100%",
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
        { autoAlpha: 0, y: 44 },
        { autoAlpha: 1, y: 0, duration: 1.35, stagger: 0.12, ease: "power3.out", delay: 0.28 },
      );

      gsap.fromTo(
        "[data-hero-word]",
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.1,
          ease: "power3.out",
          delay: 0.45,
        },
      );

      gsap.to("[data-hero-orbit]", {
        rotation: 360,
        duration: 56,
        repeat: -1,
        ease: "none",
      });

      gsap.to("[data-hero-drift='a']", {
        x: 12,
        y: -8,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-hero-drift='b']", {
        x: -7,
        y: 7,
        duration: 20,
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
        end: "+=185%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      gsap.to("[data-hero-parallax='slow']", {
        yPercent: 15,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to("[data-hero-parallax='fast']", {
        yPercent: -10,
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        "[data-about-left]",
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 72%",
            end: "top 35%",
            scrub: 1,
          },
        },
      );

      const aboutSteps = gsap.utils.toArray<HTMLElement>("[data-about-step]");
      aboutSteps.forEach((step) => {
        gsap.fromTo(
          step,
          { autoAlpha: 0, y: 56 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 82%",
              end: "top 42%",
              scrub: 1,
            },
          },
        );
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

      const projectCards = gsap.utils.toArray<HTMLElement>("[data-project-card]");

      projectCards.forEach((card) => {
        gsap.fromTo(
          card,
          { scale: 0.9, autoAlpha: 0.5, yPercent: 5 },
          {
            scale: 1,
            autoAlpha: 1,
            yPercent: 0,
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
          scale: 0.92,
          autoAlpha: 0.52,
          yPercent: -2,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: projectsTween,
            start: "center center",
            end: "right -10%",
            scrub: true,
          },
        });

        const projectLayers = card.querySelectorAll<HTMLElement>("[data-project-layer]");
        projectLayers.forEach((layer, layerIndex) => {
          gsap.fromTo(
            layer,
            { yPercent: layerIndex === 0 ? 6 : 14, scale: layerIndex === 0 ? 1.03 : 1.06 },
            {
              yPercent: layerIndex === 0 ? -4 : -10,
              scale: layerIndex === 0 ? 1 : 1.02,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: projectsTween,
                start: "left 95%",
                end: "right 5%",
                scrub: true,
              },
            },
          );
        });
      });

      gsap.fromTo(
        "[data-job-card]",
        { autoAlpha: 0, y: 72 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.1,
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
          yPercent: depth * 0.72,
          rotate: depth > 15 ? 0.3 : -0.2,
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
        duration: 60,
        repeat: -1,
        ease: "none",
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
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-[260px] w-[260px] rounded-full bg-white/8 blur-[104px] md:block"
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 12%, rgba(255,255,255,0.15), transparent 36%), radial-gradient(circle at 84% 88%, rgba(94,209,255,0.1), transparent 40%)",
          }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-[90] border-b border-white/6 bg-[#080808]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#hero" className="text-[0.68rem] tracking-[0.3em] text-[#5ed1ff]/88">
            SAMMIE SCHMID
          </a>
          <nav className="flex items-center gap-4 md:gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative py-1 text-[0.6rem] tracking-[0.11em] transition-all duration-400 md:text-[0.65rem] ${
                  activeSection === item.id
                    ? "text-[#5ed1ff]"
                    : "text-white/62 hover:text-white/90"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full bg-[#5ed1ff] transition-all duration-300 ${
                    activeSection === item.id ? "opacity-100 scale-100 origin-left" : "opacity-0 scale-x-0 origin-left group-hover:opacity-65 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-16">
        <section id="hero" className="relative isolate min-h-[100svh] px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
          <div className="pointer-events-none absolute inset-0">
            <div data-hero-parallax="slow" className="absolute left-[-5rem] top-[8%] h-[25rem] w-[19rem] rounded-[2.2rem] border border-white/8 bg-white/[0.02]" />
            <div data-hero-parallax="fast" className="absolute bottom-[8%] right-[5%] h-[17rem] w-[13rem] rounded-[1.8rem] border border-white/8 bg-[#5ed1ff]/[0.04]" />
            <div data-hero-drift="a" className="absolute right-[12%] top-[22%] h-14 w-14 rounded-full border border-white/18" />
            <div data-hero-drift="b" className="absolute left-[39%] top-[62%] h-px w-24 bg-white/16" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative z-20 order-2 space-y-9 lg:order-1 lg:-mr-12 lg:pr-0 lg:pt-10">
              <p data-hero-intro className="text-[0.64rem] tracking-[0.2em] text-white/54">
                Editorial Portfolio · 2026
              </p>

              <h1 className="max-w-[11ch] font-serif text-[3.1rem] leading-[0.88] tracking-[-0.02em] text-white sm:text-[4.7rem] lg:text-[6.8rem]">
                <span data-hero-word className="block">
                  Samantha
                </span>
                <span data-hero-word className="block text-white/88">
                  Schmid
                </span>
              </h1>

              <p data-hero-intro className="max-w-[54ch] text-[1rem] leading-8 text-white/74 md:text-[1.08rem]">
                Mechanical engineer and analytics graduate student translating structure into products, stories, and
                systems that hold up under real-world pressure.
              </p>

              <div data-hero-intro className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {HERO_TAGS.map((tag, index) => (
                  <span key={tag} className="text-[0.71rem] tracking-[0.12em] text-white/56">
                    {tag}
                    {index !== HERO_TAGS.length - 1 && <span className="ml-4 text-white/28">/</span>}
                  </span>
                ))}
              </div>

              <div data-hero-intro className="flex items-center gap-8 pt-3">
                <Link
                  href="mailto:sammieschmid22@gmail.com"
                  className="inline-flex items-center gap-2 text-[0.74rem] tracking-[0.14em] text-[#5ed1ff] transition-colors duration-300 hover:text-white"
                >
                  Email
                  <span className="inline-block h-px w-8 bg-current" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/samanthaschmid2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.74rem] tracking-[0.14em] text-white/64 transition-colors duration-300 hover:text-white"
                >
                  LinkedIn
                </Link>
              </div>
            </div>

            <div data-hero-intro className="order-1 mx-auto w-full max-w-[680px] lg:order-2 lg:translate-x-7 [perspective:1800px]">
              <div ref={heroStageRef} className="relative h-[520px] [transform-style:preserve-3d] sm:h-[620px]">
                <div data-hero-depth="0.8" className="absolute left-[2%] top-[12%] h-[72%] w-[74%] rounded-[2rem] border border-white/7 bg-black/35 shadow-[0_40px_90px_rgba(0,0,0,0.55)]" />
                <div
                  data-hero-depth="1.5"
                  className="absolute right-[1%] top-[8%] h-[66%] w-[48%] overflow-hidden rounded-[1.45rem] border border-white/15 bg-black/30 shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
                >
                  <Image src="/sammie.jpeg" alt="Samantha portrait layer" fill className="object-cover object-[50%_18%]" sizes="50vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/12 to-transparent" />
                </div>

                <div
                  data-hero-depth="2"
                  data-hero-orbit
                  className="pointer-events-none absolute left-[2%] top-[5%] h-[82%] w-[64%] rounded-[2.1rem] border border-white/9"
                />

                <div
                  data-hero-depth="1.1"
                  className="absolute left-[-2%] top-[14%] h-[80%] w-[70%] overflow-hidden rounded-[2rem] bg-black/35 shadow-[0_28px_78px_rgba(0,0,0,0.52)]"
                >
                  <Image
                    src="/sammie.jpeg"
                    alt="Portrait of Samantha Schmid"
                    fill
                    priority
                    className="object-cover object-[50%_18%] scale-[1.02]"
                    sizes="(max-width: 1024px) 86vw, 620px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
                  <div
                    data-hero-sheen
                    className="pointer-events-none absolute -left-[42%] top-[-24%] h-[150%] w-[56%] rotate-[18deg] bg-gradient-to-r from-transparent via-white/16 to-transparent opacity-32"
                  />
                </div>

                <p data-hero-depth="0.75" className="absolute left-[4%] top-[6%] text-[0.58rem] tracking-[0.18em] text-white/54">
                  portrait study · arizona
                </p>
                <p data-hero-depth="0.6" className="absolute bottom-1 right-1 max-w-[18ch] text-right font-serif text-[1.14rem] leading-snug text-white/72">
                  Building precise systems with an editorial point of view.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden border-y border-white/7 bg-[#090909] py-5">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-[#080808] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-[#080808] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/18 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/12 to-transparent" />

          <div ref={marqueeTopRef} className="mb-3 flex w-max gap-10 whitespace-nowrap">
            {loopItems(MARQUEE_ROW_A).map((item, index) => (
              <span
                key={`row-a-${item}-${index}`}
                className="flex items-center gap-10 text-[0.62rem] tracking-[0.16em] text-white/66"
              >
                {item}
                <span className="text-[#5ed1ff]/36">•</span>
              </span>
            ))}
          </div>

          <div ref={marqueeBottomRef} className="flex w-max -translate-x-1/2 gap-10 whitespace-nowrap">
            {loopItems(MARQUEE_ROW_B).map((item, index) => (
              <span
                key={`row-b-${item}-${index}`}
                className="flex items-center gap-10 text-[0.62rem] tracking-[0.16em] text-white/46"
              >
                {item}
                <span className="text-[#5ed1ff]/28">•</span>
              </span>
            ))}
          </div>
        </section>

        <section id="about" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          <div className="mx-auto grid w-full max-w-7xl items-start gap-14 lg:grid-cols-[0.82fr_1.18fr]">
            <div data-about-left className="space-y-8 lg:sticky lg:top-28">
              <p className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/74">About · Built to Build</p>
              <h2 className="max-w-[10ch] font-serif text-4xl leading-[0.95] tracking-tight md:text-6xl">
                Built to build.
              </h2>
              <p className="max-w-[42ch] text-sm leading-7 text-white/72 md:text-base">
                Engineering gives me structure. Analytics gives me signal. Product work turns both into tools people
                can actually use.
              </p>
            </div>

            <div className="space-y-24 pb-6">
              {ABOUT_CARDS.map((card, index) => (
                <article key={card.title} data-about-step className="relative pl-12">
                  <span className="absolute left-0 top-1 text-[0.66rem] tracking-[0.18em] text-[#5ed1ff]/72">{String(index + 1).padStart(2, "0")}</span>
                  <span className="absolute left-5 top-0 h-full w-px bg-gradient-to-b from-white/35 via-white/10 to-transparent" />
                  <p className="text-[0.6rem] tracking-[0.16em] text-white/50">{card.meta}</p>
                  <h3 className="mt-3 max-w-[16ch] font-serif text-[2rem] leading-tight md:text-[2.65rem]">{card.title}</h3>
                  <p className="mt-4 max-w-[56ch] text-sm leading-7 text-white/72 md:text-[1rem]">{card.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-30">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
          <div className="mb-10 max-w-5xl">
            <p className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/72">Projects</p>
            <h2 className="mt-3 max-w-5xl font-serif text-4xl leading-[0.95] tracking-tight md:text-6xl">
              Featured work, paced as scenes.
            </h2>
            <p className="mt-4 max-w-[58ch] text-sm leading-7 text-white/72 md:text-base">
              The scroll track prioritizes narrative pacing and hierarchy. Real visuals are used where available.
              Missing screenshots are treated as intentional text-first art-directed panels.
            </p>
          </div>

          <div className="overflow-hidden">
            <div ref={projectsTrackRef} className="flex w-max gap-8 md:gap-10">
              {PROJECTS.map((project, index) => (
                <article
                  key={project.id}
                  data-project-card
                  className="project-card group relative min-h-[72vh] w-[88vw] max-w-[1080px] overflow-hidden rounded-[2.1rem] border border-white/8 bg-[#0d0d0d] transition-[border-color] duration-500 hover:border-white/16 md:w-[76vw]"
                >
                  {project.mode === "image" && project.image ? (
                    <div className="absolute inset-0">
                      <div data-project-layer className="absolute inset-0">
                        <Image
                          src={project.image}
                          alt={project.imageAlt ?? `${project.title} preview`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          sizes="(max-width: 1024px) 85vw, 70vw"
                        />
                      </div>
                      <div data-project-layer className="absolute right-[6%] top-[10%] h-[42%] w-[31%] overflow-hidden rounded-[1.35rem] border border-white/18 bg-black/28">
                        <Image
                          src={project.image}
                          alt=""
                          fill
                          aria-hidden
                          className="object-cover object-[74%_50%] scale-[1.1]"
                          sizes="(max-width: 1024px) 36vw, 24vw"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/42 to-black/10" />
                      <div className="pointer-events-none absolute inset-x-9 top-[18%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    </div>
                  ) : (
                    <>
                      <div className="absolute inset-0" style={textCardBackground} />
                      <div data-project-layer className="pointer-events-none absolute inset-0 opacity-[0.26]" style={{ backgroundImage: "linear-gradient(120deg, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(30deg, rgba(255,255,255,0.1) 1px, transparent 1px)", backgroundSize: "34px 34px, 34px 34px" }} />
                      <div data-project-layer className="pointer-events-none absolute right-[7%] top-[14%] h-[40%] w-[33%] rounded-[1.3rem] border border-white/12 bg-black/24" />
                      <div className="pointer-events-none absolute inset-x-8 top-[22%] h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
                    </>
                  )}

                  <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
                    <p className="text-[0.6rem] tracking-[0.16em] text-[#5ed1ff]/74">
                      {String(index + 1).padStart(2, "0")} · {project.subtitle}
                    </p>
                    <h3 className="mt-3 max-w-[14ch] font-serif text-3xl leading-[0.93] tracking-tight md:text-[3.6rem]">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-[54ch] text-sm leading-7 text-white/78 md:text-[1.02rem]">{project.description}</p>

                    <div className="mt-7 flex flex-wrap gap-2.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/14 bg-black/28 px-3 py-1.5 text-[0.53rem] tracking-[0.12em] text-white/78"
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
                        className="mt-8 inline-flex w-fit items-center gap-2 text-[0.66rem] tracking-[0.15em] text-[#5ed1ff] transition-colors duration-300 hover:text-white"
                      >
                        Open Project
                        <span className="inline-block h-px w-8 bg-current" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="employment" className="relative min-h-[100svh] px-5 py-26 md:px-10 md:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          <div className="mx-auto grid w-full max-w-7xl items-start gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="space-y-7 lg:sticky lg:top-28">
              <p className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/72">Employment</p>
              <h2 className="max-w-[12ch] font-serif text-4xl leading-[0.95] tracking-tight md:text-6xl">Experience timeline.</h2>
              <p className="max-w-[40ch] text-sm leading-7 text-white/72 md:text-base">
                High-accountability environments where process rigor, testing discipline, and execution quality were non-negotiable.
              </p>
            </div>

            <div className="relative space-y-14 border-l border-white/10 pl-8 md:pl-12">
              {EMPLOYMENT.map((job) => (
                <article
                  key={job.role}
                  data-job-card
                  className="group relative pb-2"
                >
                  <span className="absolute -left-[2.25rem] top-1 h-2.5 w-2.5 rounded-full border border-[#5ed1ff]/60 bg-[#080808]" />
                  <p className="text-[0.6rem] tracking-[0.16em] text-[#5ed1ff]/74">{job.period}</p>
                  <h3 className="mt-3 max-w-[24ch] font-serif text-2xl leading-tight md:text-[2.2rem]">{job.role}</h3>
                  <p className="mt-2 text-sm text-white/60">{job.company}</p>
                  <ul className="mt-5 space-y-2 text-sm leading-7 text-white/74 md:text-[0.98rem]">
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
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          <div className="mx-auto grid w-full max-w-7xl items-start gap-14 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="space-y-7 lg:sticky lg:top-28">
              <p className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/72">Life · Beyond the Work</p>
              <h2 className="max-w-[12ch] font-serif text-4xl leading-[0.95] tracking-tight md:text-6xl">
                Curated travel frames.
              </h2>
              <p className="max-w-[38ch] text-sm leading-7 text-white/72 md:text-base">
                Personal context, arranged as a visual sequence rather than a standard gallery.
              </p>
            </div>

            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-12">
              {LIFE_IMAGES.map((image, index) => (
                <article
                  key={image.src}
                  data-life-depth={image.depth}
                  className={`group ${image.layoutClass} ${
                    index === 1 ? "lg:translate-y-10" : ""
                  } ${index === 3 ? "lg:-translate-y-6" : ""} ${index === 5 ? "lg:translate-y-4" : ""}`}
                >
                  <div className={`relative overflow-hidden rounded-[1.7rem] ${image.aspectClass}`}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover transition-transform duration-900 group-hover:scale-[1.035]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 80vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-black/8 to-transparent" />
                  </div>
                  <p className="mt-3 text-[0.63rem] tracking-[0.16em] text-white/64">{image.alt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="relative min-h-[88svh] px-5 py-28 md:px-10 md:py-34">
          <div className="pointer-events-none absolute inset-0">
            <div
              data-contact-orbit
              className="absolute right-[10%] top-[24%] h-44 w-44 rounded-full border border-white/14"
            />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          </div>
          <div className="mx-auto w-full max-w-7xl space-y-10">
            <p data-contact-intro className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/72">
              Contact
            </p>
            <h2 data-contact-intro className="max-w-4xl font-serif text-4xl leading-[0.9] tracking-tight md:text-7xl">
              Let&apos;s build something
              <span className="block text-white/72">precise and lasting.</span>
            </h2>
            <a
              data-contact-intro
              href="mailto:sammieschmid22@gmail.com"
              className="block text-2xl text-[#5ed1ff] transition-colors duration-300 hover:text-white md:text-5xl"
            >
              sammieschmid22@gmail.com
            </a>
            <div data-contact-intro className="flex flex-wrap items-center gap-7 pt-2">
              <a
                href="mailto:sammieschmid22@gmail.com"
                className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.16em] text-[#5ed1ff] transition-colors duration-300 hover:text-white"
              >
                Email
                <span className="inline-block h-px w-8 bg-current" />
              </a>
              <a
                href="https://www.linkedin.com/in/samanthaschmid2/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.16em] text-white/70 transition-colors duration-300 hover:text-white"
              >
                LinkedIn
                <span className="inline-block h-px w-8 bg-current" />
              </a>
              <a
                href="https://github.com/samschmid22"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-[0.68rem] tracking-[0.16em] text-white/70 transition-colors duration-300 hover:text-white"
              >
                GitHub
                <span className="inline-block h-px w-8 bg-current" />
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
