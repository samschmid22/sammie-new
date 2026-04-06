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
    transition: { duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Home() {
  return (
    <main className="bg-[#080808] text-white min-h-screen overflow-x-hidden">
      <Hero />
      <Marquee />
      <About />
      <Contact />
    </main>
  );
}

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

      <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen py-32">

        {/* Photo side */}
        <motion.div style={{ y: photoY, opacity }} className="flex justify-center lg:justify-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Glow ring */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#5ed1ff]/20 to-[#f9a8d4]/10 blur-2xl scale-110" />
            {/* Photo frame */}
            <div className="relative w-[320px] h-[420px] md:w-[380px] md:h-[500px] rounded-[2rem] overflow-hidden border border-white/10">
              <Image
                src="/images/profile.png"
                alt="Samantha Schmid"
                fill
                className="object-cover object-[50%_15%] scale-[1.6]"
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
            {/* SAMANTHA — filled white */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="block font-black uppercase text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] tracking-[-0.02em] text-white"
                style={{ fontFamily: "system-ui, sans-serif" }}
              >
                SAMANTHA
              </motion.span>
            </div>
            {/* SCHMID — outlined/stroke */}
            <div className="overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="block font-black uppercase text-[4rem] md:text-[5.5rem] lg:text-[6.5rem] tracking-[-0.02em]"
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
  const items = [
    "Systems Builder", "Data Analytics", "Mechanical Engineering",
    "Process Design", "Business Analytics", "Product Development",
    "ASU · 2025", "Clean Systems", "Remote Ready",
  ];
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/5 py-5 bg-[#080808]">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="flex gap-12 whitespace-nowrap"
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-12 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-white/25">
            {item}
            <span className="text-[#5ed1ff]/30">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const About = () => (
  <section className="px-6 md:px-16 py-32">
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
      <motion.h2 variants={fadeUp} className="text-[2.5rem] md:text-[4rem] font-black uppercase leading-none tracking-tight text-white mb-12">
        Built to build.
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Engineering", value: "BSE Mechanical Engineering, ASU. Nissan, General Dynamics." },
          { label: "Analytics", value: "MS Business Analytics in progress. SQL, Python, Power BI, Excel." },
          { label: "Building", value: "4 apps in active development. RoutineOS, Human Reset, and more." },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            custom={i}
            variants={fadeUp}
            className="rounded-2xl border border-white/8 bg-white/[0.03] p-8 hover:border-[#5ed1ff]/20 transition-colors duration-300"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.25em] text-[#5ed1ff]/60 mb-4">{item.label}</p>
            <p className="text-[1rem] leading-[1.8] text-white/50">{item.value}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

const Contact = () => (
  <section className="px-6 md:px-16 py-32 border-t border-white/5">
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
      className="max-w-6xl mx-auto"
    >
      <motion.p variants={fadeUp} className="text-[0.7rem] uppercase tracking-[0.35em] text-[#5ed1ff]/60 mb-6">Contact</motion.p>
      <motion.h2 variants={fadeUp} className="text-[2.5rem] md:text-[4rem] font-black uppercase leading-none tracking-tight text-white mb-12">
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