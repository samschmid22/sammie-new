"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function Home() {
  return (
    <>
      {/* Noise/grain texture overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[60] opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "150px 150px",
        }}
      />
      <NavBar />
      <main id="home" className="bg-[#080808] text-white min-h-screen overflow-x-hidden">
        <Hero />
        <Marquee />
        <About />
        <Employment />
        <Projects />
        <Life />
        <Contact />
      </main>
    </>
  );
}

const NavBar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 backdrop-blur-md bg-[#080808]/70 border-b border-white/5">
    <a
      href="#home"
      className="text-[0.75rem] uppercase tracking-[0.3em] text-white/50 font-semibold hover:text-[#5ed1ff] transition-colors duration-200"
    >
      SAMMIE
    </a>
    <div className="flex gap-8">
      {[
        { label: "Home", href: "#home" },
        { label: "Work", href: "#work" },
        { label: "Projects", href: "#projects" },
        { label: "Life", href: "#life" },
        { label: "Contact", href: "#contact" },
      ].map(({ label, href }) => (
        <a
          key={label}
          href={href}
          className="text-[0.65rem] uppercase tracking-[0.2em] text-white/40 hover:text-white/80 transition-colors duration-200"
        >
          {label}
        </a>
      ))}
    </div>
  </nav>
);

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden px-6 md:px-16">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-[-10rem] left-[-5rem] w-[40rem] h-[40rem] rounded-full bg-[#5ed1ff]/6 blur-[120px]" />
        <div className="absolute bottom-[-8rem] right-[-4rem] w-[32rem] h-[32rem] rounded-full bg-[#f9a8d4]/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen pt-32 pb-16">

        {/* Photo side */}
        <motion.div style={{ y: photoY, opacity }} className="flex justify-center lg:justify-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative mt-16"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-[#5ed1ff]/20 to-[#f9a8d4]/10 blur-2xl scale-110" />
            {/* Photo frame */}
            <div className="relative w-[340px] h-[480px] md:w-[420px] md:h-[580px] rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_0_60px_rgba(94,209,255,0.12)]">
              <Image
                src="/sammie.jpeg"
                alt="Samantha Schmid"
                fill
                className="object-cover object-[50%_20%]"
                priority
              />
              {/* Gradient overlay bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
              {/* Corner accent */}
              <div className="absolute bottom-5 left-5 right-5">
                <div className="h-px w-full bg-gradient-to-r from-[#5ed1ff]/60 to-transparent" />
                <p className="mt-2 text-[0.65rem] uppercase tracking-[0.25em] text-[#5ed1ff]/70">
                  Samantha Schmid · 2025
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text side */}
        <motion.div style={{ y: textY, opacity }} className="flex flex-col justify-center lg:pl-8">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/70"
          >
            Engineer · Analyst · Builder
          </motion.p>

          {/* Big name — mixed filled + outlined */}
          <div className="flex flex-col leading-none">
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
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
                transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block font-black uppercase text-[5rem] md:text-[7rem] lg:text-[8.5rem] tracking-[-0.02em]"
                style={{
                  fontFamily: "system-ui, sans-serif",
                  WebkitTextStroke: "2px #5ed1ff",
                  color: "transparent",
                }}
              >
                SCHMID
              </motion.span>
            </div>
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ originX: 0 }}
            className="mt-8 h-px bg-gradient-to-r from-[#5ed1ff] via-[#f9a8d4]/40 to-transparent"
          />

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-[42ch] text-[1rem] leading-[1.85] text-white/50"
          >
            Sammie Schmid brings clarity to complex systems by seeing patterns where others see problems. Order isn't found; it's built.
          </motion.p>

          {/* Tags */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-wrap gap-2"
          >
            {["MS Business Analytics", "BSE Mechanical Engineering", "ASU · 2025"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[0.7rem] uppercase tracking-[0.12em] text-white/60"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 flex gap-4"
          >
            <Link
              href="mailto:sammieschmid22@gmail.com"
              className="rounded-full bg-[#5ed1ff] px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#5ed1ff]/90"
            >
              Get in touch
            </Link>
            <Link
              href="#"
              className="rounded-full border border-white/15 px-6 py-3 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white/70 transition hover:border-white/30 hover:text-white"
            >
              View Resume
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/30">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-[#5ed1ff]/60 to-transparent"
        />
      </motion.div>
    </section>
  );
};

const Marquee = () => {
  const row1 = [
    "Systems Builder", "Data Analytics", "Mechanical Engineering",
    "Process Design", "Business Analytics", "Product Development",
    "ASU · 2025", "Clean Systems", "Remote Ready",
  ];
  const row2 = [
    "Remote Ready", "Clean Systems", "Fast Learner",
    "Detail Oriented", "ASU 2025", "Systems Thinker",
    "Coachable", "Data Driven",
  ];
  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];

  return (
    <div className="relative overflow-hidden border-y border-white/5 py-3 bg-[#080808] flex flex-col gap-3">
      {/* Top gradient fade */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-5 bg-gradient-to-b from-[#080808] to-transparent z-10" />
      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-5 bg-gradient-to-t from-[#080808] to-transparent z-10" />

      {/* Row 1 — left to right scroll */}
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {doubled1.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/25">
            {item}
            <span className="text-[#5ed1ff]/30">✦</span>
          </span>
        ))}
      </motion.div>

      {/* Row 2 — right to left (opposite direction) */}
      <motion.div
        animate={{ x: ["-50%", "0%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {doubled2.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/20">
            {item}
            <span className="text-[#f9a8d4]/25">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => {
  const cards = [
    {
      label: "Engineering",
      value: "BSE Mechanical Engineering, ASU. Nissan, General Dynamics.",
      bullets: ["AMDR Radar Program", "Powertrain Testing", "SolidWorks", "MATLAB"],
    },
    {
      label: "Analytics",
      value: "MS Business Analytics in progress. SQL, Python, Power BI, Excel.",
      bullets: ["Power BI Dashboards", "Data Cleaning", "Process Optimization"],
    },
    {
      label: "Building",
      value: "4 apps in active development. RoutineOS, Human Reset, and more.",
      bullets: ["RoutineOS", "Human Reset", "Been There Done That", "Loose Ends"],
    },
  ];

  return (
    <section id="about" className="px-6 md:px-16 py-20">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-6xl mx-auto"
      >
        <motion.p variants={fadeUp} className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-6">
          About
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-12">
          Built to build.
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((item, i) => (
            <motion.div
              key={item.label}
              custom={i}
              variants={fadeUp}
              className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 hover:border-[#5ed1ff]/20 transition-colors duration-300"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.25em] text-[#5ed1ff]/60 mb-4">{item.label}</p>
              <p className="text-[1rem] leading-[1.8] text-white/50 mb-5">{item.value}</p>
              <ul className="space-y-1.5">
                {item.bullets.map((b) => (
                  <li key={b} className="text-[0.72rem] text-white/30 tracking-wide">· {b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Employment = () => {
  const jobs = [
    {
      period: "09/2025–11/2025",
      role: "Manufacturing Engineer Intern",
      company: "General Dynamics Mission Systems",
      bullets: [
        "Supported manufacturing engineering for AMDR radar program",
        "Worked within structured defense manufacturing environment",
      ],
    },
    {
      period: "05/2024–08/2024",
      role: "Powertrain Test Intern",
      company: "Nissan Motor Co.",
      bullets: [
        "Executed powertrain test runs and aggregated measurements",
        "Built analyses in Excel/MATLAB to surface signals",
        "Recommended adjustments that reduced iteration time",
      ],
    },
  ];

  return (
    <section id="work" className="px-6 md:px-16 py-20 border-t border-white/5">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-6xl mx-auto"
      >
        <motion.p variants={fadeUp} className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-6">
          Experience
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-12">
          Where I've worked.
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {jobs.map((job, i) => (
            <motion.div
              key={job.role}
              custom={i}
              variants={fadeUp}
              className="rounded-2xl border border-white/8 border-l-2 border-l-[#5ed1ff]/40 bg-white/[0.03] p-8 hover:border-[#5ed1ff]/20 transition-colors duration-300"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.25em] text-[#5ed1ff]/60 mb-3">{job.period}</p>
              <p className="text-[1.15rem] font-bold text-white mb-1">{job.role}</p>
              <p className="text-[0.9rem] text-[#5ed1ff]/60 mb-5">{job.company}</p>
              <ul className="space-y-2">
                {job.bullets.map((b) => (
                  <li key={b} className="text-[0.82rem] leading-[1.6] text-white/40">· {b}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    { num: "01", title: "RoutineOS", desc: "Turning discipline into a system", href: "https://routineos.vercel.app" },
    { num: "02", title: "Been There Done That", desc: "Interactive travel scrapbook", href: "https://travel-scrapbook.vercel.app" },
    { num: "03", title: "The Human Reset", desc: "A practical framework for health and clarity", href: null },
    { num: "04", title: "Radar-Readable Sign", desc: "Safer infrastructure for autonomous vehicles", href: null },
  ];

  return (
    <section id="projects" className="px-6 md:px-16 py-20 border-t border-white/5">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-6xl mx-auto"
      >
        <motion.p variants={fadeUp} className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-6">
          Projects
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-12">
          Things I've built.
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              custom={i}
              variants={fadeUp}
              className="group relative rounded-2xl border border-white/8 border-l-2 border-l-[#5ed1ff]/40 bg-white/[0.03] p-8 min-h-[200px] flex flex-col justify-between hover:border-[#5ed1ff]/30 hover:shadow-[0_0_30px_rgba(94,209,255,0.06)] transition-all duration-300"
            >
              {/* Faded number top-right */}
              <span className="absolute top-5 right-6 text-[3rem] font-black text-white/5 leading-none select-none">
                {project.num}
              </span>

              <div className="flex items-start justify-between">
                <div className="pr-16">
                  <p className="text-[1.2rem] font-bold text-white mb-2">{project.title}</p>
                  <p className="text-[0.9rem] leading-[1.7] text-white/40">{project.desc}</p>
                </div>
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:border-[#5ed1ff]/40 hover:text-[#5ed1ff] transition-colors duration-200"
                  >
                    ↗
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Life = () => {
  const places = [
    "Cusco, Peru", "Santorini, Greece", "Paris, France", "Belize",
    "Amsterdam", "Rome", "Cuba", "Costa Rica", "Whistler, Canada",
  ];
  const milestones = ["29029 Everesting", "7 Years Competitive Volleyball", "Team Captain"];

  return (
    <section id="life" className="px-6 md:px-16 py-20 border-t border-white/5">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        variants={{ show: { transition: { staggerChildren: 0.1 } } }}
        className="max-w-6xl mx-auto"
      >
        <motion.p variants={fadeUp} className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-6">
          Life
        </motion.p>
        <motion.h2 variants={fadeUp} className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-12">
          Beyond the work.
        </motion.h2>

        {/* Horizontal scroll — travel cards */}
        <motion.div variants={fadeUp} className="overflow-x-auto pb-4 mb-10 -mx-6 px-6 [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-4 w-max">
            {places.map((place) => (
              <div
                key={place}
                className="flex-shrink-0 rounded-xl border border-white/8 bg-white/[0.03] px-6 py-4 hover:border-[#5ed1ff]/20 transition-colors duration-200"
              >
                <p className="text-[0.8rem] font-medium text-white/55 whitespace-nowrap">{place}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Milestone tags */}
        <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
          {milestones.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#5ed1ff]/20 bg-[#5ed1ff]/5 px-5 py-2 text-[0.72rem] uppercase tracking-[0.15em] text-[#5ed1ff]/70"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

const Contact = () => (
  <section id="contact" className="px-6 md:px-16 py-20 border-t border-white/5">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="max-w-6xl mx-auto"
    >
      <motion.p variants={fadeUp} className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-6">Contact</motion.p>
      <motion.h2 variants={fadeUp} className="text-[2.5rem] md:text-[3.5rem] font-black uppercase leading-none tracking-tight text-white mb-12">
        Let's connect.
      </motion.h2>
      <motion.div variants={fadeUp} className="flex flex-wrap gap-4">
        <Link href="mailto:sammieschmid22@gmail.com" className="rounded-full bg-[#5ed1ff] px-8 py-4 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-black hover:bg-[#5ed1ff]/90 transition">
          Email me
        </Link>
        <Link href="https://www.linkedin.com/in/samanthaschmid2/" target="_blank" className="rounded-full border border-white/15 px-8 py-4 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white/70 hover:border-white/30 hover:text-white transition">
          LinkedIn
        </Link>
        <Link href="https://github.com/samschmid22" target="_blank" className="rounded-full border border-white/15 px-8 py-4 text-[0.78rem] font-bold uppercase tracking-[0.15em] text-white/70 hover:border-white/30 hover:text-white transition">
          GitHub
        </Link>
      </motion.div>
    </motion.div>
  </section>
);
