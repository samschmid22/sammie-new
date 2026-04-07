"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as [number, number, number, number];

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease },
  }),
};

const GlowDivider = () => (
  <div className="w-full h-px bg-gradient-to-r from-transparent via-[#5ed1ff]/20 to-transparent my-2" />
);

// ─── Splash Screen ────────────────────────────────────────────────────────────
const SplashScreen = () => (
  <motion.div
    className="fixed inset-0 z-[200] bg-[#080808] flex flex-col items-center justify-center"
    exit={{ opacity: 0 }}
    transition={{ duration: 0.6 }}
  >
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: 1.8, times: [0, 0.25, 0.7, 1] }}
      className="text-[8rem] font-black leading-none select-none"
      style={{ WebkitTextStroke: "2px #5ed1ff", color: "transparent" }}
    >
      SS
    </motion.span>
    <div className="w-[200px] h-[1px] bg-white/10 mt-8 overflow-hidden rounded-full">
      <motion.div
        className="h-full bg-[#5ed1ff]"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  </motion.div>
);

// ─── Cursor Glow ──────────────────────────────────────────────────────────────
const CursorGlow = () => {
  const [mouseX, setMouseX] = useState(-300);
  const [mouseY, setMouseY] = useState(-300);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <motion.div
      className="w-[300px] h-[300px] rounded-full bg-[#5ed1ff]/5 blur-[80px] pointer-events-none fixed z-[45]"
      animate={{ left: mouseX - 150, top: mouseY - 150 }}
      transition={{ type: "spring", damping: 30, stiffness: 200 }}
    />
  );
};

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function Home() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <AnimatePresence>{showSplash && <SplashScreen key="splash" />}</AnimatePresence>
      <CursorGlow />
      <div
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />
      <NavBar />
      <main className="bg-[#080808] text-white min-h-screen overflow-x-hidden">
        <Hero />
        <GlowDivider />
        <Marquee />
        <GlowDivider />
        <About />
        <GlowDivider />
        <Employment />
        <GlowDivider />
        <Projects />
        <GlowDivider />
        <Life />
        <GlowDivider />
        <Contact />
      </main>
      <footer className="bg-[#080808] border-t border-white/5 py-8 px-16 flex justify-between items-center">
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/20">© 2025 Samantha Schmid</span>
        <span className="text-[0.65rem] uppercase tracking-[0.25em] text-white/20">Built by Sammie</span>
      </footer>
    </>
  );
}

// ─── Nav Bar ──────────────────────────────────────────────────────────────────
const NavBar = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const ids = ["home", "work", "projects", "life", "contact"];
    const observers: IntersectionObserver[] = [];

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const links = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Work", href: "#work", id: "work" },
    { label: "Projects", href: "#projects", id: "projects" },
    { label: "Life", href: "#life", id: "life" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-[#080808]/70 border-b border-white/5">
      <a href="#home" className="text-[0.75rem] uppercase tracking-[0.3em] text-white/50 font-semibold hover:text-[#5ed1ff] transition-colors duration-200">
        SAMMIE
      </a>
      <div className="flex gap-8">
        {links.map(({ label, href, id }) => {
          const active = activeSection === id;
          return (
            <a
              key={label}
              href={href}
              className={`relative text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-200 ${
                active ? "text-[#5ed1ff]" : "text-white/40 hover:text-white/80"
              }`}
            >
              {label}
              {active && (
                <motion.span
                  layoutId="nav-dot"
                  className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#5ed1ff]"
                />
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

// ─── Flip Card ────────────────────────────────────────────────────────────────
const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      style={{ perspective: "1000px" }}
      className="relative w-[340px] h-[480px] md:w-[420px] md:h-[580px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        style={{
          transformStyle: "preserve-3d" as const,
          transition: "transform 0.7s cubic-bezier(0.4,0,0.2,1)",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative" as const,
          width: "100%",
          height: "100%",
        }}
      >
        {/* FRONT — photo */}
        <div
          style={{ backfaceVisibility: "hidden" as const }}
          className="absolute inset-0 rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(94,209,255,0.12)]"
        >
          <Image
            src="/sammie.jpeg"
            alt="Samantha Schmid"
            fill
            className="object-cover object-[50%_20%]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <div className="h-px w-full bg-gradient-to-r from-[#5ed1ff]/60 to-transparent" />
            <p className="mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-[#5ed1ff]/70">
              Samantha Schmid · 2025
            </p>
          </div>
        </div>

        {/* BACK — stats */}
        <div
          style={{
            backfaceVisibility: "hidden" as const,
            transform: "rotateY(180deg)",
          }}
          className="absolute inset-0 rounded-[2.5rem] bg-[#0d0d0d] border border-[#5ed1ff]/30 flex flex-col items-center justify-center p-8"
        >
          <span
            className="text-[4rem] font-black leading-none mb-4 select-none"
            style={{ WebkitTextStroke: "1px #5ed1ff", color: "transparent" }}
          >
            SS
          </span>
          <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#5ed1ff]/70 mb-8 text-center">
            Engineer · Analyst · Builder
          </p>
          <div className="grid grid-cols-2 gap-3 w-full mb-8">
            {[
              { value: "3.4 GPA", label: "Engineering" },
              { value: "4.0 GPA", label: "EVIT" },
              { value: "4 Apps", label: "In Development" },
              { value: "2 Internships", label: "Fortune 500" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-3 rounded-xl border border-white/10 bg-white/[0.04]">
                <p className="text-[1rem] font-bold text-white">{stat.value}</p>
                <p className="text-[0.6rem] uppercase tracking-[0.15em] text-white/40 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/5 px-4 py-2">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"
            />
            <span className="text-[0.65rem] uppercase tracking-[0.2em] text-green-400/80">
              Available for work
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="home" ref={ref} className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-16">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10rem] left-[-5rem] w-[40rem] h-[40rem] rounded-full bg-[#5ed1ff]/6 blur-[120px]" />
        <div className="absolute bottom-[-8rem] right-[-4rem] w-[32rem] h-[32rem] rounded-full bg-[#f9a8d4]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen pt-32 pb-16">

        {/* Photo side — flip card */}
        <motion.div style={{ y: photoY, opacity }} className="flex justify-center lg:justify-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease }}
            className="relative mt-16"
          >
            {/* Animated pulsing glow */}
            <motion.div
              animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 rounded-full blur-3xl bg-gradient-to-br from-[#5ed1ff]/10 to-[#f9a8d4]/5 w-[500px] h-[600px]"
            />
            {/* Static glow ring */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#5ed1ff]/20 to-[#f9a8d4]/10 blur-2xl scale-110" />
            <FlipCard />
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div style={{ y: textY, opacity }} className="flex flex-col justify-center lg:pl-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/70"
          >
            Engineer · Analyst · Builder
          </motion.p>

          <div className="flex flex-col leading-none">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3, ease }}
                className="block font-black uppercase text-[5rem] md:text-[7rem] lg:text-[8.5rem] tracking-[-0.02em] text-white"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                SAMANTHA
              </motion.span>
            </div>
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.45, ease }}
                className="block font-black uppercase text-[5rem] md:text-[7rem] lg:text-[8.5rem] tracking-[-0.02em]"
                style={{ fontFamily: "system-ui, sans-serif", WebkitTextStroke: "2px #5ed1ff", color: "transparent" }}
              >
                SCHMID
              </motion.span>
            </div>
          </div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            style={{ originX: 0 }}
            className="mt-8 h-px bg-gradient-to-r from-[#5ed1ff] via-[#f9a8d4]/40 to-transparent"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease }}
            className="mt-8 max-w-[42ch] text-[1rem] leading-[1.85] text-white/70"
          >
            Sammie Schmid brings clarity to complex systems by seeing patterns where others see problems. Order isn't found; it's built.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {["MS Business Analytics", "BSE Mechanical Engineering", "ASU · 2025"].map((tag) => (
              <span key={tag} className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-white/60">
                {tag}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease }}
            className="mt-10 flex gap-4"
          >
            <Link href="mailto:sammieschmid22@gmail.com" className="rounded-full bg-[#5ed1ff] px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#5ed1ff]/90">
              Get in touch
            </Link>
            <Link href="#" className="rounded-full border border-white/20 px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white/70 transition hover:border-white/40 hover:text-white">
              View Resume
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/70">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-[#5ed1ff]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

// ─── Marquee ──────────────────────────────────────────────────────────────────
const Marquee = () => {
  const row1 = ["Systems Builder", "Data Analytics", "Mechanical Engineering", "Process Design", "Business Analytics", "Product Development", "ASU · 2025", "Clean Systems", "Remote Ready"];
  const row2 = ["Remote Ready", "Clean Systems", "Fast Learner", "Detail Oriented", "ASU 2025", "Systems Thinker", "Coachable", "Data Driven"];
  const d1 = [...row1, ...row1];
  const d2 = [...row2, ...row2];

  return (
    <div className="relative overflow-hidden border-y border-white/5 py-3 bg-[#080808] flex flex-col gap-3">
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-[#080808] to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-[#080808] to-transparent z-10" />
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
        {d1.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/70">
            {item}<span className="text-[#5ed1ff]/40">✦</span>
          </span>
        ))}
      </motion.div>
      <motion.div animate={{ x: ["-50%", "0%"] }} transition={{ duration: 18, repeat: Infinity, ease: "linear" }} className="flex gap-12 whitespace-nowrap">
        {d2.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/40">
            {item}<span className="text-[#f9a8d4]/30">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

// ─── About ────────────────────────────────────────────────────────────────────
const About = () => {
  const cards = [
    { label: "Engineering", value: "BSE Mechanical Engineering, ASU. Nissan, General Dynamics.", bullets: ["AMDR Radar Program", "Powertrain Testing", "SolidWorks", "MATLAB"] },
    { label: "Analytics", value: "MS Business Analytics in progress. SQL, Python, Power BI, Excel.", bullets: ["Power BI Dashboards", "Data Cleaning", "Process Optimization"] },
    { label: "Building", value: "4 apps in active development. RoutineOS, Human Reset, and more.", bullets: ["RoutineOS", "Human Reset", "Been There Done That", "Loose Ends"] },
  ];

  return (
    <section id="about" className="px-6 md:px-16 py-20">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }} viewport={{ once: true }}
          className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-4"
        >About</motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }} viewport={{ once: true }}
          className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-12"
        >Built to build.</motion.h2>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {cards.map((item, i) => (
            <motion.div key={item.label} custom={i} variants={fadeUp}
              className="rounded-2xl border border-white/20 bg-white/[0.06] p-8 hover:border-[#5ed1ff]/30 transition-colors duration-300"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.25em] text-[#5ed1ff]/60 mb-4">{item.label}</p>
              <p className="text-[1rem] leading-[1.8] text-white/70 mb-5">{item.value}</p>
              <ul className="space-y-1.5">
                {item.bullets.map((b) => <li key={b} className="text-[0.72rem] text-white/70 tracking-wide">· {b}</li>)}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Employment ───────────────────────────────────────────────────────────────
const Employment = () => {
  const jobs = [
    {
      period: "09/2025–11/2025",
      role: "Manufacturing Engineer Intern",
      company: "General Dynamics Mission Systems",
      bullets: ["Supported manufacturing engineering for AMDR radar program", "Worked within structured defense manufacturing environment"],
    },
    {
      period: "05/2024–08/2024",
      role: "Powertrain Test Intern",
      company: "Nissan Motor Co.",
      bullets: ["Executed powertrain test runs and aggregated measurements", "Built analyses in Excel/MATLAB to surface signals", "Recommended adjustments that reduced iteration time"],
    },
  ];

  return (
    <section id="work" className="px-6 md:px-16 py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }} viewport={{ once: true }}
          className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-4"
        >Experience</motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }} viewport={{ once: true }}
          className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-12"
        >Where I've worked.</motion.h2>
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {jobs.map((job, i) => (
            <motion.div key={job.role} custom={i} variants={fadeUp}
              className="relative rounded-2xl border border-white/20 bg-white/[0.06] p-8 overflow-hidden hover:border-[#5ed1ff]/30 transition-colors duration-300"
            >
              {/* Animated growing left border */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#5ed1ff] to-[#f9a8d4]/50"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.6 }}
                style={{ originY: 0 }}
                viewport={{ once: true }}
              />
              <p className="text-[0.68rem] uppercase tracking-[0.25em] text-[#5ed1ff]/60 mb-3">{job.period}</p>
              <p className="text-[1.15rem] font-bold text-white mb-1">{job.role}</p>
              <p className="text-[0.9rem] text-[#5ed1ff]/60 mb-5">{job.company}</p>
              <ul className="space-y-2">
                {job.bullets.map((b) => <li key={b} className="text-[0.82rem] leading-[1.6] text-white/60">· {b}</li>)}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Projects — filmstrip ─────────────────────────────────────────────────────
const Projects = () => {
  const projects = [
    { num: "01", title: "RoutineOS", desc: "Turning discipline into a system", href: "https://routineos.vercel.app", img: "/images/routineosimage.png" },
    { num: "02", title: "Been There Done That", desc: "Interactive travel scrapbook", href: "https://travel-scrapbook.vercel.app", img: "/images/travelimage.png" },
    { num: "03", title: "The Human Reset", desc: "A practical framework for health and clarity", href: null, img: "/images/humanresetimage.png" },
    { num: "04", title: "Radar-Readable Sign", desc: "Safer infrastructure for autonomous vehicles", href: null, img: "/images/radarsign.png" },
  ];

  return (
    <section id="projects" className="py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <motion.p
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }} viewport={{ once: true }}
          className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-4"
        >Projects</motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }} viewport={{ once: true }}
          className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-12"
        >Things I've built.</motion.h2>
      </div>

      {/* Filmstrip */}
      <div className="overflow-x-auto no-scrollbar">
        <div className="flex gap-6 px-6 md:px-16 pb-4 w-max">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: i * 0.1, ease }}
              viewport={{ once: true }}
              className="w-[320px] flex-shrink-0 h-[400px] rounded-3xl overflow-hidden relative border border-white/20 cursor-pointer group hover:border-[#5ed1ff]/30 hover:shadow-[0_0_30px_rgba(94,209,255,0.1)] transition-all duration-300"
            >
              {/* Image — top 60% */}
              <div className="absolute top-0 left-0 right-0 h-[60%] overflow-hidden bg-gradient-to-br from-[#5ed1ff]/10 to-[#f9a8d4]/5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-full object-cover scale-[1.05] group-hover:scale-[1.12] transition-transform duration-700"
                />
              </div>

              {/* Gradient bridge */}
              <div className="absolute top-[52%] left-0 right-0 h-[16%] bg-gradient-to-b from-transparent to-[#0a0a0a]" />

              {/* Number */}
              <span className="absolute top-4 right-4 text-[2.5rem] font-black text-white/10 leading-none select-none">
                {project.num}
              </span>

              {/* Bottom text area */}
              <div className="absolute bottom-0 left-0 right-0 h-[44%] bg-[#0a0a0a] p-5 flex flex-col justify-center">
                <p className="text-[1.1rem] font-bold text-white mb-1 leading-tight">{project.title}</p>
                <p className="text-[0.82rem] text-white/60 leading-[1.5] mb-3">{project.desc}</p>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-[0.7rem] uppercase tracking-[0.15em] text-[#5ed1ff]/70 hover:text-[#5ed1ff] transition-colors w-fit"
                  >
                    View project <span>↗</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Life — with parallax ─────────────────────────────────────────────────────
const Life = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const yEven = useTransform(scrollYProgress, [0, 1], ["0px", "-20px"]);
  const yOdd = useTransform(scrollYProgress, [0, 1], ["-20px", "0px"]);

  const places = [
    { name: "Cusco, Peru", src: "/images/pics/Peru.HEIC" },
    { name: "Santorini, Greece", src: "/images/pics/Santorini.jpeg" },
    { name: "Paris, France", src: "/images/pics/Paris.jpeg" },
    { name: "Ambergris Caye, Belize", src: "/images/pics/Belize.HEIC" },
    { name: "Amsterdam, Netherlands", src: "/images/pics/Amsterdam.jpeg" },
    { name: "Rome, Italy", src: "/images/pics/Rome.jpeg" },
    { name: "Havana, Cuba", src: "/images/pics/Havana.jpeg" },
    { name: "San Jose, Costa Rica", src: "/images/pics/Costa Rica.JPG" },
    { name: "Whistler, Canada", src: "/images/pics/Whistler.JPG" },
  ];
  const milestones = ["29029 Everesting", "7 Years Competitive Volleyball", "Team Captain"];

  return (
    <section id="life" ref={sectionRef} className="px-6 md:px-16 py-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease }} viewport={{ once: true }}
          className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-4"
        >Life</motion.p>
        <motion.h2
          initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.08, ease }} viewport={{ once: true }}
          className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-12"
        >Beyond the work.</motion.h2>

        {/* Horizontal scroll with parallax */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }} viewport={{ once: true }}
          className="overflow-x-auto no-scrollbar -mx-6 px-6 pt-6 pb-8 mb-10"
        >
          <div className="flex gap-4 w-max items-start">
            {places.map((place, i) => (
              <motion.div
                key={place.name}
                style={{ y: i % 2 === 0 ? yEven : yOdd }}
                className="w-[180px] flex-shrink-0 rounded-2xl overflow-hidden border border-white/20 hover:border-[#5ed1ff]/30 hover:scale-[1.02] transition-all duration-300"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={place.src} alt={place.name} className="w-full h-[220px] object-cover" />
                <div className="py-3 px-2 bg-white/[0.06]">
                  <p className="text-[0.75rem] uppercase tracking-[0.15em] text-white/70 text-center">{place.name}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Milestones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }} viewport={{ once: true }}
          className="flex flex-wrap gap-3"
        >
          {milestones.map((tag) => (
            <span key={tag} className="rounded-full border border-[#5ed1ff]/40 bg-[#5ed1ff]/5 text-[#5ed1ff] px-6 py-3 text-[0.75rem] uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(94,209,255,0.08)]">
              {tag}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

// ─── Contact ──────────────────────────────────────────────────────────────────
const Contact = () => (
  <section id="contact" className="px-6 md:px-16 py-20 border-t border-white/5">
    <div className="max-w-6xl mx-auto">
      <motion.p
        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease }} viewport={{ once: true }}
        className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-4"
      >Contact</motion.p>
      <motion.h2
        initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.08, ease }} viewport={{ once: true }}
        className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-6"
      >Let's connect.</motion.h2>
      <motion.a
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease }} viewport={{ once: true }}
        href="mailto:sammieschmid22@gmail.com"
        className="block text-[1.5rem] md:text-[2.5rem] font-black text-white/80 hover:text-[#5ed1ff] transition-colors mb-10"
      >
        sammieschmid22@gmail.com
      </motion.a>
      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease }} viewport={{ once: true }}
        className="flex flex-wrap gap-4"
      >
        <Link href="mailto:sammieschmid22@gmail.com" className="rounded-full bg-[#5ed1ff] px-8 py-4 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-black hover:bg-[#5ed1ff]/90 transition">
          Email me
        </Link>
        <Link href="https://www.linkedin.com/in/samanthaschmid2/" target="_blank" className="rounded-full border border-white/20 px-8 py-4 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white/70 hover:border-white/40 hover:text-white transition">
          LinkedIn
        </Link>
        <Link href="https://github.com/samschmid22" target="_blank" className="rounded-full border border-white/20 px-8 py-4 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white/70 hover:border-white/40 hover:text-white transition">
          GitHub
        </Link>
      </motion.div>
    </div>
  </section>
);
