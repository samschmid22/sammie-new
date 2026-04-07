"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SectionId = "hero" | "what" | "about" | "projects" | "life";

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
  { id: "what", label: "What I Do" },
  { id: "about", label: "About / Experience" },
  { id: "projects", label: "Projects" },
  { id: "life", label: "Life / Contact" },
];

const WHAT_I_DO = [
  {
    title: "Engineering Structure",
    text: "I start from constraints, edge cases, and repeatable systems. The goal is always reliability before polish.",
  },
  {
    title: "Analytics Clarity",
    text: "I convert noisy signals into useful decisions with clear metrics, interpretable analysis, and grounded recommendations.",
  },
  {
    title: "Product Building",
    text: "I turn structure and signal into products people actually use, with disciplined execution and intentional storytelling.",
  },
];

const EXPERIENCE = [
  {
    period: "2025",
    role: "Manufacturing Engineer Intern",
    company: "General Dynamics Mission Systems",
    highlights: [
      "Supported manufacturing workflows for AMDR radar initiatives in high-rigor environments.",
      "Worked inside strict production controls where process discipline and documentation quality were mandatory.",
    ],
  },
  {
    period: "2024",
    role: "Powertrain Test Intern",
    company: "Nissan Motor Co.",
    highlights: [
      "Executed powertrain test loops and transformed raw measurements into interpretable performance signal.",
      "Built Excel and MATLAB analyses for faster engineering readouts and decision support.",
    ],
  },
];

const PROJECTS: Project[] = [
  {
    id: "routineos",
    title: "RoutineOS",
    subtitle: "Systemized habits",
    description:
      "An operating system for disciplined days: planning, adherence, and momentum in one focused loop.",
    tags: ["Habits", "Execution", "Product"],
    mode: "text",
    href: "https://routineos.vercel.app",
  },
  {
    id: "radar-sign",
    title: "Radar-Readable Sign",
    subtitle: "Mobility safety",
    description:
      "A visibility-first infrastructure concept built to improve machine readability for autonomous navigation.",
    tags: ["Engineering", "Mobility", "Safety"],
    mode: "image",
    image: "/Pics/AV%20Sign.png",
    imageAlt: "Radar-readable sign concept",
  },
  {
    id: "travel-scrapbook",
    title: "Been There. Done That.",
    subtitle: "Travel scrapbook",
    description:
      "A narrative archive of places and moments, designed for memory as an interactive product surface.",
    tags: ["Travel", "Story", "Interaction"],
    mode: "text",
    href: "https://travel-scrapbook.vercel.app",
  },
  {
    id: "human-reset",
    title: "The Human Reset",
    subtitle: "Health framework",
    description:
      "A practical structure for clarity, energy, and disciplined recovery when life gets noisy.",
    tags: ["Health", "Systems", "Focus"],
    mode: "text",
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
    layoutClass: "lg:col-span-5 lg:translate-y-10",
    aspectClass: "aspect-[5/6]",
    depth: 14,
  },
  {
    src: "/Pics/Santorini.jpeg",
    alt: "Santorini",
    layoutClass: "lg:col-span-4",
    aspectClass: "aspect-[4/5]",
    depth: 16,
  },
  {
    src: "/Pics/Rome.jpeg",
    alt: "Rome",
    layoutClass: "lg:col-span-4 lg:-translate-y-6",
    aspectClass: "aspect-[4/5]",
    depth: 12,
  },
  {
    src: "/Pics/Havana.jpeg",
    alt: "Havana",
    layoutClass: "lg:col-span-4",
    aspectClass: "aspect-[4/5]",
    depth: 18,
  },
  {
    src: "/Pics/Whistler.JPG",
    alt: "Whistler",
    layoutClass: "lg:col-span-12 lg:translate-y-2",
    aspectClass: "aspect-[16/6]",
    depth: 6,
  },
];

const textProjectBackground = {
  backgroundColor: "#0c0c0c",
  backgroundImage:
    "radial-gradient(circle at 20% 18%, rgba(255,255,255,0.12), transparent 40%), radial-gradient(circle at 80% 72%, rgba(94,209,255,0.12), transparent 44%), linear-gradient(134deg, rgba(255,255,255,0.05), rgba(255,255,255,0))",
  backgroundSize: "100% 100%, 100% 100%, 100% 100%",
};

export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const heroStageRef = useRef<HTMLDivElement>(null);
  const projectsTrackRef = useRef<HTMLDivElement>(null);

  const [activeSection, setActiveSection] = useState<SectionId>("hero");

  useEffect(() => {
    const cursor = cursorRef.current;
    const stage = heroStageRef.current;

    if (!cursor || !stage) {
      return;
    }

    const cursorX = gsap.quickTo(cursor, "x", { duration: 0.36, ease: "power3.out" });
    const cursorY = gsap.quickTo(cursor, "y", { duration: 0.36, ease: "power3.out" });
    const stageRX = gsap.quickTo(stage, "rotationX", { duration: 0.6, ease: "power3.out" });
    const stageRY = gsap.quickTo(stage, "rotationY", { duration: 0.6, ease: "power3.out" });

    const heroLayers = gsap.utils.toArray<HTMLElement>("[data-hero-depth]");
    const layerSetters = heroLayers.map((layer) => ({
      depth: Number(layer.dataset.heroDepth ?? 0),
      x: gsap.quickTo(layer, "x", { duration: 0.42, ease: "power3.out" }),
      y: gsap.quickTo(layer, "y", { duration: 0.42, ease: "power3.out" }),
    }));

    const onPointerMove = (event: PointerEvent) => {
      cursorX(event.clientX - 130);
      cursorY(event.clientY - 130);

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
    const root = rootRef.current;
    const projectsTrack = projectsTrackRef.current;

    if (!root || !projectsTrack) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-hero-intro]",
        { autoAlpha: 0, y: 42 },
        { autoAlpha: 1, y: 0, duration: 1.2, stagger: 0.12, ease: "power3.out", delay: 0.18 },
      );

      gsap.fromTo(
        "[data-hero-word]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 1.12, stagger: 0.1, ease: "power3.out", delay: 0.34 },
      );

      gsap.to("[data-hero-ring]", {
        rotation: 360,
        duration: 48,
        repeat: -1,
        ease: "none",
      });

      gsap.to("[data-hero-drift='a']", {
        x: 12,
        y: -8,
        duration: 16,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to("[data-hero-drift='b']", {
        x: -9,
        y: 7,
        duration: 18,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      ScrollTrigger.create({
        trigger: "#hero",
        start: "top top",
        end: "+=170%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      gsap.to("[data-hero-parallax='slow']", {
        yPercent: 14,
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

      const whatSteps = gsap.utils.toArray<HTMLElement>("[data-what-step]");
      whatSteps.forEach((step) => {
        gsap.fromTo(
          step,
          { autoAlpha: 0, y: 64 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.95,
            ease: "power3.out",
            scrollTrigger: {
              trigger: step,
              start: "top 84%",
              end: "top 44%",
              scrub: 1,
            },
          },
        );
      });

      gsap.fromTo(
        "[data-about-intro]",
        { autoAlpha: 0, y: 34 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#about",
            start: "top 72%",
            end: "top 36%",
            scrub: 1,
          },
        },
      );

      const aboutRows = gsap.utils.toArray<HTMLElement>("[data-about-row]");
      aboutRows.forEach((row) => {
        gsap.fromTo(
          row,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: row,
              start: "top 84%",
              end: "top 42%",
              scrub: 1,
            },
          },
        );
      });

      const projectDistance = () => Math.max(0, projectsTrack.scrollWidth - window.innerWidth + 240);

      const projectsTween = gsap.to(projectsTrack, {
        x: () => -projectDistance(),
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top top",
          end: () => `+=${projectDistance() + window.innerHeight * 1.2}`,
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
              start: "left 92%",
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
            end: "right -12%",
            scrub: true,
          },
        });

        const layers = card.querySelectorAll<HTMLElement>("[data-project-layer]");
        layers.forEach((layer, layerIndex) => {
          gsap.fromTo(
            layer,
            { yPercent: layerIndex === 0 ? 7 : 14, scale: layerIndex === 0 ? 1.03 : 1.06 },
            {
              yPercent: layerIndex === 0 ? -5 : -10,
              scale: layerIndex === 0 ? 1 : 1.02,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                containerAnimation: projectsTween,
                start: "left 96%",
                end: "right 4%",
                scrub: true,
              },
            },
          );
        });
      });

      const lifeLayers = gsap.utils.toArray<HTMLElement>("[data-life-depth]");
      lifeLayers.forEach((layer) => {
        const depth = Number(layer.dataset.lifeDepth ?? 8);

        gsap.to(layer, {
          yPercent: depth * 0.68,
          rotate: depth > 14 ? 0.3 : -0.2,
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
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: "#contact-block",
            start: "top 84%",
            end: "top 36%",
            scrub: 1,
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
  }, []);

  return (
    <div ref={rootRef} className="relative min-h-screen overflow-x-clip bg-[#080808] text-white">
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-[260px] w-[260px] rounded-full bg-white/8 blur-[105px] md:block"
      />

      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 18% 12%, rgba(255,255,255,0.14), transparent 35%), radial-gradient(circle at 82% 88%, rgba(94,209,255,0.08), transparent 40%)",
          }}
        />
      </div>

      <header className="fixed inset-x-0 top-0 z-[90] border-b border-white/6 bg-[#080808]/72 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <a href="#hero" className="text-[0.66rem] tracking-[0.28em] text-[#5ed1ff]/82">
            SAMMIE SCHMID
          </a>
          <nav className="flex items-center gap-4 md:gap-6">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`group relative py-1 text-[0.58rem] tracking-[0.11em] transition-all duration-300 md:text-[0.64rem] ${
                  activeSection === item.id ? "text-[#5ed1ff]" : "text-white/62 hover:text-white"
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-full bg-[#5ed1ff] transition-all duration-300 ${
                    activeSection === item.id
                      ? "opacity-100 scale-100 origin-left"
                      : "opacity-0 scale-x-0 origin-left group-hover:opacity-65 group-hover:scale-x-100"
                  }`}
                />
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main className="relative z-10 pt-16">
        <section id="hero" className="relative isolate min-h-[100svh] px-5 pb-20 pt-30 md:px-10 md:pb-28 md:pt-38">
          <div className="pointer-events-none absolute inset-0">
            <div data-hero-parallax="slow" className="absolute left-[-4rem] top-[8%] h-[26rem] w-[20rem] rounded-[2rem] border border-white/8 bg-white/[0.02]" />
            <div data-hero-parallax="fast" className="absolute bottom-[7%] right-[5%] h-[18rem] w-[13rem] rounded-[1.7rem] border border-white/8 bg-[#5ed1ff]/[0.04]" />
            <div data-hero-drift="a" className="absolute right-[14%] top-[24%] h-14 w-14 rounded-full border border-white/16" />
            <div data-hero-drift="b" className="absolute left-[40%] top-[64%] h-px w-24 bg-white/15" />
          </div>

          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-14 lg:grid-cols-[0.86fr_1.14fr]">
            <div className="relative z-20 order-2 space-y-8 lg:order-1 lg:-mr-12 lg:pt-10">
              <p data-hero-intro className="text-[0.62rem] tracking-[0.2em] text-white/54">
                Portfolio 2026
              </p>

              <h1 className="max-w-[11ch] font-serif text-[3.05rem] leading-[0.88] tracking-[-0.02em] sm:text-[4.7rem] lg:text-[6.9rem]">
                <span data-hero-word className="block">
                  Samantha
                </span>
                <span data-hero-word className="block text-white/88">
                  Schmid
                </span>
              </h1>

              <p data-hero-intro className="max-w-[48ch] text-[1rem] leading-8 text-white/72 md:text-[1.06rem]">
                Mechanical engineer and analytics graduate student building products with structured thinking,
                visual storytelling, and disciplined execution.
              </p>

              <div data-hero-intro className="flex items-center gap-8 pt-2">
                <Link
                  href="mailto:sammieschmid22@gmail.com"
                  className="inline-flex items-center gap-2 text-[0.72rem] tracking-[0.14em] text-[#5ed1ff] transition-colors duration-300 hover:text-white"
                >
                  Email
                  <span className="inline-block h-px w-8 bg-current" />
                </Link>
                <Link
                  href="https://www.linkedin.com/in/samanthaschmid2/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.72rem] tracking-[0.14em] text-white/64 transition-colors duration-300 hover:text-white"
                >
                  LinkedIn
                </Link>
              </div>
            </div>

            <div data-hero-intro className="order-1 mx-auto w-full max-w-[700px] lg:order-2 lg:translate-x-8 [perspective:1800px]">
              <div ref={heroStageRef} className="relative h-[520px] [transform-style:preserve-3d] sm:h-[640px]">
                <div data-hero-depth="0.8" className="absolute left-[2%] top-[12%] h-[72%] w-[74%] rounded-[2rem] border border-white/7 bg-black/35 shadow-[0_40px_90px_rgba(0,0,0,0.55)]" />

                <div
                  data-hero-depth="1.7"
                  className="absolute left-[-2%] top-[14%] h-[80%] w-[70%] overflow-hidden rounded-[2rem] bg-black/35 shadow-[0_28px_78px_rgba(0,0,0,0.52)]"
                >
                  <Image
                    src="/sammie.jpeg"
                    alt="Portrait of Samantha Schmid"
                    fill
                    priority
                    className="object-cover object-[50%_18%] scale-[1.02]"
                    sizes="(max-width: 1024px) 86vw, 640px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/12 to-transparent" />
                </div>

                <div
                  data-hero-depth="2.1"
                  className="absolute right-[1%] top-[8%] h-[66%] w-[48%] overflow-hidden rounded-[1.45rem] border border-white/15 bg-black/30 shadow-[0_20px_55px_rgba(0,0,0,0.4)]"
                >
                  <Image
                    src="/sammie.jpeg"
                    alt="Samantha portrait detail"
                    fill
                    className="object-cover object-[54%_18%]"
                    sizes="(max-width: 1024px) 45vw, 28vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-black/12 to-transparent" />
                </div>

                <div
                  data-hero-depth="1.1"
                  data-hero-ring
                  className="pointer-events-none absolute left-[2%] top-[5%] h-[82%] w-[64%] rounded-[2.1rem] border border-white/9"
                />

                <p data-hero-depth="0.75" className="absolute left-[4%] top-[6%] text-[0.58rem] tracking-[0.18em] text-white/54">
                  portrait study · arizona
                </p>
                <p data-hero-depth="0.6" className="absolute bottom-1 right-1 max-w-[18ch] text-right font-serif text-[1.1rem] leading-snug text-white/72">
                  Building precise systems with an editorial point of view.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="what" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          <div className="mx-auto grid w-full max-w-7xl items-start gap-14 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="space-y-7 lg:sticky lg:top-28">
              <p className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/72">What I Do</p>
              <h2 className="max-w-[12ch] font-serif text-4xl leading-[0.95] tracking-tight md:text-6xl">
                Engineering, analytics, and building as one system.
              </h2>
              <p className="max-w-[40ch] text-sm leading-7 text-white/72 md:text-base">
                One workflow, three disciplines, focused on outcomes that are measurable and usable.
              </p>
            </div>

            <div className="space-y-20 pb-8">
              {WHAT_I_DO.map((item, index) => (
                <article key={item.title} data-what-step className="border-t border-white/10 pt-8">
                  <p className="text-[0.62rem] tracking-[0.16em] text-[#5ed1ff]/68">{String(index + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 max-w-[18ch] font-serif text-[2rem] leading-tight md:text-[2.75rem]">{item.title}</h3>
                  <p className="mt-4 max-w-[56ch] text-sm leading-7 text-white/72 md:text-[1rem]">{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />
          <div className="mx-auto grid w-full max-w-7xl items-start gap-14 lg:grid-cols-[0.86fr_1.14fr]">
            <div data-about-intro className="space-y-7 lg:sticky lg:top-28">
              <p className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/72">About / Experience</p>
              <h2 className="max-w-[13ch] font-serif text-4xl leading-[0.95] tracking-tight md:text-6xl">
                Built in high-accountability environments.
              </h2>
              <p className="max-w-[40ch] text-sm leading-7 text-white/72 md:text-base">
                Mechanical engineering background, analytics rigor, and internship experience in production and test environments.
              </p>

              <div className="relative mt-2 h-[220px] w-[220px] overflow-hidden rounded-[1.35rem] border border-white/10 bg-black/30">
                <Image src="/sammie.jpeg" alt="Samantha Schmid portrait crop" fill className="object-cover object-[48%_15%]" sizes="220px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/58 via-transparent to-transparent" />
              </div>
            </div>

            <div className="relative space-y-14 border-l border-white/10 pl-8 md:pl-12">
              {EXPERIENCE.map((job) => (
                <article key={job.role} data-about-row className="relative">
                  <span className="absolute -left-[2.25rem] top-1 h-2.5 w-2.5 rounded-full border border-[#5ed1ff]/55 bg-[#080808]" />
                  <p className="text-[0.6rem] tracking-[0.16em] text-[#5ed1ff]/72">{job.period}</p>
                  <h3 className="mt-3 max-w-[24ch] font-serif text-2xl leading-tight md:text-[2.2rem]">{job.role}</h3>
                  <p className="mt-2 text-sm text-white/62">{job.company}</p>
                  <ul className="mt-5 space-y-2 text-sm leading-7 text-white/74 md:text-[0.98rem]">
                    {job.highlights.map((item) => (
                      <li key={item}>• {item}</li>
                    ))}
                  </ul>
                </article>
              ))}

              <article data-about-row className="relative border-t border-white/10 pt-8">
                <p className="text-[0.6rem] tracking-[0.16em] text-[#5ed1ff]/72">Education</p>
                <h3 className="mt-3 font-serif text-[1.65rem] leading-tight md:text-[2rem]">BSE Mechanical Engineering · ASU</h3>
                <p className="mt-2 text-sm text-white/64 md:text-[0.98rem]">MS Business Analytics in progress.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="projects" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-30">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
          <div className="mb-10 max-w-5xl">
            <p className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/72">Featured Projects</p>
            <h2 className="mt-3 max-w-5xl font-serif text-4xl leading-[0.95] tracking-tight md:text-6xl">
              Case-study panels, not cards.
            </h2>
            <p className="mt-4 max-w-[58ch] text-sm leading-7 text-white/72 md:text-base">
              Four curated projects. Real visuals where available. Text-led layouts where screenshots do not exist.
            </p>
          </div>

          <div className="overflow-hidden">
            <div ref={projectsTrackRef} className="flex w-max gap-8 md:gap-10">
              {PROJECTS.map((project, index) => (
                <article
                  key={project.id}
                  data-project-card
                  className="relative min-h-[74vh] w-[86vw] max-w-[1080px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#0d0d0d] md:w-[76vw]"
                >
                  {project.mode === "image" && project.image ? (
                    <div className="absolute inset-0">
                      <div data-project-layer className="absolute inset-0">
                        <Image
                          src={project.image}
                          alt={project.imageAlt ?? `${project.title} preview`}
                          fill
                          className="object-cover"
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
                      <div className="absolute inset-0" style={textProjectBackground} />
                      <div
                        data-project-layer
                        className="pointer-events-none absolute inset-0 opacity-[0.26]"
                        style={{
                          backgroundImage:
                            "linear-gradient(120deg, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(30deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                          backgroundSize: "34px 34px, 34px 34px",
                        }}
                      />
                      <div data-project-layer className="pointer-events-none absolute right-[7%] top-[14%] h-[40%] w-[33%] rounded-[1.3rem] border border-white/12 bg-black/24" />
                      <div className="pointer-events-none absolute inset-x-8 top-[22%] h-px bg-gradient-to-r from-transparent via-white/28 to-transparent" />
                    </>
                  )}

                  <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-12">
                    <p className="text-[0.6rem] tracking-[0.16em] text-[#5ed1ff]/72">
                      {String(index + 1).padStart(2, "0")} · {project.subtitle}
                    </p>
                    <h3 className="mt-3 max-w-[14ch] font-serif text-3xl leading-[0.93] tracking-tight md:text-[3.6rem]">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-[54ch] text-sm leading-7 text-white/78 md:text-[1.02rem]">{project.description}</p>

                    <div className="mt-7 flex flex-wrap gap-x-3 gap-y-2 text-[0.56rem] tracking-[0.13em] text-white/76">
                      {project.tags.map((tag, tagIndex) => (
                        <span key={tag}>
                          {tag}
                          {tagIndex !== project.tags.length - 1 && <span className="ml-3 text-white/34">/</span>}
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

        <section id="life" className="relative min-h-[100svh] px-5 py-24 md:px-10 md:py-32">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/16 to-transparent" />

          <div className="mx-auto grid w-full max-w-7xl items-start gap-14 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-7 lg:sticky lg:top-28">
              <p className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/72">Life / Contact</p>
              <h2 className="max-w-[12ch] font-serif text-4xl leading-[0.95] tracking-tight md:text-6xl">
                Beyond the work.
              </h2>
              <p className="max-w-[38ch] text-sm leading-7 text-white/72 md:text-base">
                Travel frames that shape perspective, followed by a simple way to get in touch.
              </p>
            </div>

            <div className="space-y-16">
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-12">
                {LIFE_IMAGES.map((image) => (
                  <article key={image.src} data-life-depth={image.depth} className={`group ${image.layoutClass}`}>
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

              <div id="contact-block" className="border-t border-white/12 pt-14 md:pt-18">
                <p data-contact-intro className="text-[0.64rem] tracking-[0.2em] text-[#5ed1ff]/72">
                  Contact
                </p>
                <h3 data-contact-intro className="mt-4 max-w-4xl font-serif text-4xl leading-[0.9] tracking-tight md:text-7xl">
                  Let&apos;s build something
                  <span className="block text-white/72">precise and lasting.</span>
                </h3>
                <a
                  data-contact-intro
                  href="mailto:sammieschmid22@gmail.com"
                  className="mt-8 block text-2xl text-[#5ed1ff] transition-colors duration-300 hover:text-white md:text-5xl"
                >
                  sammieschmid22@gmail.com
                </a>

                <div data-contact-intro className="mt-8 flex flex-wrap items-center gap-7">
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
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
