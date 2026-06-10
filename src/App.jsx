import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

const ACCENT = "linear-gradient(123deg,#0D1B2A 7%,#0077B6 37%,#00B4D8 72%,#90E0EF 100%)";
const HERO_GRAD = "linear-gradient(180deg,#4a6374 0%,#BBCCD7 100%)";

const stats = [
  { num: "25+", label: "Keywords Ranked Top 10" },
  { num: "24+", label: "SEO Blogs Published" },
  { num: "15K+", label: "Instagram Followers Grown" },
  { num: "3+", label: "Major Client Projects" },
  { num: "1.5+", label: "Years Experience" },
  { num: "15K+", label: "YouTube Subscribers Grown" },
];

const services = [
  { num: "01", name: "On-Page & Technical SEO", desc: "Deep audits, metadata optimization, Core Web Vitals, schema markup, and site architecture — building a foundation that search engines trust." },
  { num: "02", name: "Off-Page SEO & Link Building", desc: "Strategic backlink acquisition, digital PR, and authority building that moves rankings beyond page one." },
  { num: "03", name: "Local SEO & Google Business", desc: "Dominating local search results — Google Business Profile optimization, local citations, and review management that drives foot traffic and calls." },
  { num: "04", name: "Content Strategy & Blog Writing", desc: "Keyword-driven, human-first content that ranks, earns links, and converts — crafted across healthcare, fashion, food, and lifestyle verticals." },
  { num: "05", name: "Meta Ads & Social Media", desc: "Facebook and Instagram ad campaigns paired with YouTube SEO — performance marketing that amplifies organic momentum." },
];

const tools = [
  "Google Search Console", "Google Analytics (GA4)", "SEMrush", "Ahrefs",
  "YouTube Studio", "WordPress", "Canva", "Google Keyword Planner", "Meta Ads Manager",
];

const workStudies = [
  {
    id: 1,
    num: "01",
    name: "Kyra Clinic",
    category: "Healthcare · Local SEO · Full Digital Marketing",
    color: "#00B4D8",
    period: "Nov 2025 – Apr 2026",
    role: "Digital Marketing Assistant (Sole Manager)",
    overview: "Took complete ownership of all digital marketing for a Ludhiana-based aesthetic clinic — from zero to a strong, searchable online presence. Acted as the sole point of contact handling everything end-to-end.",
    results: [
      { label: "Keywords Ranked Top 10", value: "25" },
      { label: "Avg Position in Ludhiana", value: "#2–3" },
      { label: "Avg Position in Punjab", value: "#6–7" },
      { label: "SEO Blogs Published", value: "24+" },
      { label: "Instagram Followers", value: "44K → 59K" },
      { label: "YouTube Subscribers", value: "40K → 55K" },
    ],
    work: [
      "Conducted full keyword research and built a local SEO strategy targeting Ludhiana & Punjab",
      "Optimized all website pages — meta titles, descriptions, headers, image alt texts",
      "Built backlinks through directory submissions, profile creation & off-page strategies",
      "Published 1 SEO-optimized blog every week for 6 consecutive months (24+ articles)",
      "Ranked 25 keywords in Top 10 — achieving avg. position 2–3 in Ludhiana, 6–7 across Punjab",
      "Managed Instagram account — content scheduling & consistent posting",
      "Optimized YouTube videos — titles, descriptions & tags for search visibility",
      "Ran Meta Ads (Facebook & Instagram) to boost clinic reach & audience growth",
      "Monitored performance via Google Analytics & Google Search Console",
    ],
  },
  {
    id: 2,
    num: "02",
    name: "Scorpius Technology",
    category: "Multi-Industry · International SEO · UK & USA",
    color: "#0077B6",
    period: "April 2026 – Present",
    role: "SEO Executive",
    overview: "Currently handling SEO for international clients across UK and USA markets — executing full-cycle SEO strategies across multiple industries with a focus on organic growth and content authority.",
    results: [
      { label: "Markets Served", value: "UK & USA" },
      { label: "Role", value: "SEO Executive" },
      { label: "Content", value: "Blogs & Articles" },
      { label: "Focus", value: "On + Off Page" },
    ],
    work: [
      "Execute on-page SEO — keyword research, meta optimization, internal linking & content structuring",
      "Write and publish SEO-optimized blogs and articles targeting international audiences",
      "Build high-quality backlinks — guest posting, directory submissions & profile creation",
      "Conduct website audits and implement technical SEO improvements",
      "Track keyword rankings & performance metrics using Google Search Console & Google Analytics",
      "Handle competitor analysis and keyword gap identification for UK & USA markets",
    ],
  },
  {
    id: 3,
    num: "03",
    name: "Freelance Projects",
    category: "D2C Brands · E-commerce SEO · Content & Reviews",
    color: "#90E0EF",
    period: "2025 (Parallel Projects)",
    role: "Independent SEO & Content Freelancer",
    overview: "Delivered one-time SEO and content projects for three D2C and local brands — each with a unique challenge and tailored strategy.",
    results: [
      { label: "Brands Served", value: "3" },
      { label: "woolenwear.in", value: "On + Off Page" },
      { label: "mybakers", value: "SEO Blogs" },
      { label: "Advid Clothing", value: "SEO + Reviews" },
    ],
    work: [
      "woolenwear.in — On-page & off-page SEO; keyword targeting, meta optimization, backlink building & content strategy for product pages",
      "mybakers — Wrote SEO-optimized blogs and product descriptions to improve organic search visibility",
      "Advid Clothing — Off-page SEO, content planning & Google Review management to strengthen local online reputation",
    ],
  },
  {
    id: 4,
    num: "04",
    name: "DigiKnowHow Agency",
    category: "Agency · Multi-Client · Social Media & SEO",
    color: "#4a6374",
    period: "Jun 2025 – Oct 2025",
    role: "Digital Marketing Intern",
    overview: "Foundational agency experience — worked across multiple client accounts learning real-world digital marketing workflows, tools, and strategies in a fast-paced agency environment.",
    results: [
      { label: "Environment", value: "Agency" },
      { label: "Clients", value: "Multiple" },
      { label: "Tools Learned", value: "SEMrush, Ahrefs, GSC" },
      { label: "Duration", value: "5 Months" },
    ],
    work: [
      "Managed social media accounts for multiple clients — scheduling, posting & basic engagement",
      "Supported SEO tasks — keyword research, on-page edits & off-page submissions",
      "Learned and applied SEMrush, Ahrefs, Google Analytics & Google Search Console",
      "Gained hands-on experience in content planning, Meta Ads basics & digital marketing workflows",
    ],
  },
];

function FadeIn({ children, delay = 0, y = 30, x = 0, duration = 0.7 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "50px", amount: 0 }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactButton() {
  return (
    <button
      style={{
        background: ACCENT,
        boxShadow: "0px 4px 4px rgba(0,119,182,0.25), 4px 4px 12px #00B4D8 inset",
        outline: "2px solid #D7E2EA",
        outlineOffset: "-3px",
        border: "none",
        borderRadius: "9999px",
        color: "#fff",
        fontFamily: "inherit",
        fontWeight: 500,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        cursor: "pointer",
        padding: "12px 40px",
        fontSize: "clamp(0.75rem,1.2vw,1rem)",
      }}
      onClick={() => window.open("mailto:bhavyaarora0808@gmail.com")}
    >
      Contact Me
    </button>
  );
}

function AnimatedChar({ char, progress, index, total }) {
  const start = index / total;
  const end = Math.min(start + 1 / total + 0.05, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ opacity: 0 }}>{char === " " ? "\u00A0" : char}</span>
      <motion.span style={{ position: "absolute", left: 0, top: 0, opacity, color: "#D7E2EA" }}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}

function AnimatedText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  const chars = text.split("");
  return (
    <p ref={ref} style={{ fontFamily: "inherit", fontWeight: 500, textAlign: "center", lineHeight: 1.7, maxWidth: 560, fontSize: "clamp(1rem,2vw,1.35rem)", margin: "0 auto" }}>
      {chars.map((c, i) => <AnimatedChar key={i} char={c} progress={scrollYProgress} index={i} total={chars.length} />)}
    </p>
  );
}

// WORK STUDY MODAL
function WorkModal({ study, onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      key="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.85)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px",
        backdropFilter: "blur(8px)",
      }}
    >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={e => e.stopPropagation()}
          style={{
            background: "#0F1923",
            border: `2px solid ${study.color}44`,
            borderRadius: 40,
            maxWidth: 780,
            width: "100%",
            maxHeight: "85vh",
            overflowY: "auto",
            padding: "clamp(24px,4vw,48px)",
            position: "relative",
          }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            style={{
              position: "absolute", top: 20, right: 20,
              background: "rgba(215,226,234,0.08)",
              border: "1px solid rgba(215,226,234,0.2)",
              borderRadius: 9999,
              color: "#D7E2EA",
              fontFamily: "inherit",
              width: 40, height: 40,
              cursor: "pointer",
              fontSize: "1.2rem",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
          >
            ✕
          </button>

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{
                background: HERO_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontWeight: 900, fontSize: "clamp(2.5rem,6vw,5rem)", lineHeight: 1, fontFamily: "inherit",
              }}>{study.num}</span>
              <div>
                <div style={{ color: study.color, textTransform: "uppercase", letterSpacing: "0.12em", fontSize: "0.75rem", fontWeight: 300, marginBottom: 4 }}>
                  {study.category}
                </div>
                <div style={{ color: "#D7E2EA", fontWeight: 700, fontSize: "clamp(1.2rem,3vw,2rem)", textTransform: "uppercase", letterSpacing: "0.04em", fontFamily: "inherit" }}>
                  {study.name}
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <span style={{ background: `${study.color}18`, border: `1px solid ${study.color}44`, color: study.color, borderRadius: 9999, padding: "4px 14px", fontSize: "0.8rem", fontWeight: 500, letterSpacing: "0.06em" }}>
                {study.period}
              </span>
              <span style={{ background: "rgba(215,226,234,0.06)", border: "1px solid rgba(215,226,234,0.15)", color: "#D7E2EA", borderRadius: 9999, padding: "4px 14px", fontSize: "0.8rem", fontWeight: 300, letterSpacing: "0.06em", opacity: 0.7 }}>
                {study.role}
              </span>
            </div>
          </div>

          {/* Overview */}
          <div style={{ marginBottom: 28, padding: "16px 20px", background: "rgba(215,226,234,0.04)", borderRadius: 16, borderLeft: `3px solid ${study.color}` }}>
            <p style={{ color: "#D7E2EA", opacity: 0.8, fontWeight: 300, lineHeight: 1.7, fontSize: "clamp(0.9rem,1.5vw,1.05rem)", margin: 0 }}>
              {study.overview}
            </p>
          </div>

          {/* Results */}
          <div style={{ marginBottom: 28 }}>
            <p style={{ color: "#D7E2EA", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.72rem", fontWeight: 300, marginBottom: 14 }}>
              Key Results
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
              {study.results.map((r, i) => (
                <div key={i} style={{
                  background: "rgba(215,226,234,0.05)", border: "1px solid rgba(215,226,234,0.12)",
                  borderRadius: 16, padding: "14px 16px", textAlign: "center",
                }}>
                  <div style={{ color: study.color, fontWeight: 700, fontSize: "clamp(1.1rem,2.5vw,1.5rem)", fontFamily: "inherit", lineHeight: 1, marginBottom: 6 }}>
                    {r.value}
                  </div>
                  <div style={{ color: "#D7E2EA", opacity: 0.5, fontSize: "0.72rem", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 300 }}>
                    {r.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Work Done */}
          <div>
            <p style={{ color: "#D7E2EA", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.72rem", fontWeight: 300, marginBottom: 14 }}>
              What I Did
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {study.work.map((w, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ color: study.color, fontSize: "0.8rem", marginTop: 3, flexShrink: 0 }}>✦</span>
                  <p style={{ color: "#D7E2EA", opacity: 0.75, fontWeight: 300, lineHeight: 1.6, fontSize: "clamp(0.85rem,1.4vw,1rem)", margin: 0 }}>
                    {w}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
    </motion.div>
  );
}

// WORK CARD
function WorkCard({ study, index, total, scrollRef }) {
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ["start start", "end end"] });
  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [index / total, 1], [1, targetScale]);

  return (
    <>
      <AnimatePresence>
        {open && <WorkModal study={study} onClose={() => setOpen(false)} />}
      </AnimatePresence>
      <div style={{
        height: "85vh", display: "flex", alignItems: "flex-start", justifyContent: "center",
        position: "sticky", top: `${96 + index * 28}px`,
      }}>
        <motion.div
          style={{
            scale, width: "100%", maxWidth: 900,
            background: "#0C0C0C", border: "2px solid #D7E2EA",
            borderRadius: 48, padding: "clamp(20px,3vw,40px)", willChange: "transform",
          }}
        >
          {/* Top Row */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
              <span style={{
                background: HERO_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                fontWeight: 900, fontSize: "clamp(3rem,8vw,8rem)", lineHeight: 1, fontFamily: "inherit",
              }}>
                {study.num}
              </span>
              <div>
                <div style={{ color: "#D7E2EA", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "clamp(0.7rem,1.2vw,1rem)", fontWeight: 300 }}>
                  {study.category}
                </div>
                <div style={{ color: "#D7E2EA", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "clamp(1rem,2vw,1.6rem)", fontFamily: "inherit" }}>
                  {study.name}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(true)}
              style={{
                borderRadius: 9999, border: "2px solid #D7E2EA", background: "transparent",
                color: "#D7E2EA", fontFamily: "inherit", fontWeight: 500,
                textTransform: "uppercase", letterSpacing: "0.12em",
                padding: "10px 28px", fontSize: "clamp(0.7rem,1.1vw,0.9rem)", cursor: "pointer",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(215,226,234,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              View Work
            </button>
          </div>

          {/* Bottom */}
          <div style={{ borderTop: "1px solid rgba(215,226,234,0.15)", paddingTop: 20 }}>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
              {study.results.slice(0, 3).map((r, i) => (
                <div key={i} style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: `${study.color}18`, border: `1px solid ${study.color}44`,
                  color: study.color, borderRadius: 9999,
                  padding: "5px 16px", fontSize: "clamp(0.72rem,1.1vw,0.9rem)",
                  fontWeight: 600, letterSpacing: "0.06em",
                }}>
                  ✦ {r.value} {r.label}
                </div>
              ))}
            </div>
            <p style={{
              color: "#D7E2EA", opacity: 0.65, fontWeight: 300, lineHeight: 1.7,
              fontSize: "clamp(0.85rem,1.4vw,1.1rem)", maxWidth: 700, margin: 0,
            }}>
              {study.overview}
            </p>
            <div style={{ marginTop: 12, color: "#D7E2EA", opacity: 0.3, fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.12em" }}>
              {study.period} · {study.role}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}

export default function App() {
  const workScrollRef = useRef(null);

  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500;700;900&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    document.body.style.background = "#0C0C0C";
    document.body.style.margin = "0";
    document.body.style.padding = "0";
    document.body.style.fontFamily = "'Kanit', sans-serif";
    document.documentElement.style.background = "#0C0C0C";
  }, []);

  const gradText = {
    background: HERO_GRAD, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
    fontWeight: 900, textTransform: "uppercase", lineHeight: 1, letterSpacing: "-0.02em", fontFamily: "inherit",
  };

  return (
    <div style={{ background: "#0C0C0C", fontFamily: "'Kanit', sans-serif", overflowX: "clip" }}>

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "clip", position: "relative" }}>

        {/* Ambient glow blobs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", top: "20%", left: "10%", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, #00B4D8 0%, transparent 70%)", filter: "blur(60px)" }}
          />
          <motion.div
            animate={{ scale: [1.1, 1, 1.1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ position: "absolute", bottom: "20%", right: "10%", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, #0077B6 0%, transparent 70%)", filter: "blur(80px)" }}
          />
          <motion.div
            animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.12, 0.06] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 300, borderRadius: "50%", background: "radial-gradient(circle, #90E0EF 0%, transparent 70%)", filter: "blur(100px)" }}
          />
        </div>

        {/* Floating particles */}
        {[
          { top: "15%", left: "8%", delay: 0 },
          { top: "70%", left: "5%", delay: 1 },
          { top: "30%", right: "7%", delay: 0.5 },
          { top: "75%", right: "12%", delay: 1.5 },
          { top: "50%", left: "25%", delay: 2 },
          { top: "20%", right: "25%", delay: 0.8 },
        ].map((p, i) => (
          <motion.div
            key={i}
            animate={{ y: [-8, 8, -8], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
            style={{ position: "absolute", top: p.top, left: p.left, right: p.right, width: 4, height: 4, borderRadius: "50%", background: "#00B4D8", boxShadow: "0 0 8px #00B4D8", zIndex: 0, pointerEvents: "none" }}
          />
        ))}

        {/* Nav */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <FadeIn delay={0} y={-20}>
            <nav style={{ display: "flex", justifyContent: "space-between", padding: "24px 40px 0", color: "#D7E2EA", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, fontSize: "clamp(0.8rem,1.3vw,1.2rem)" }}>
              {["About", "Services", "Work", "Contact"].map((n) => (
                <a key={n} href={`#${n.toLowerCase()}`} style={{ color: "#D7E2EA", textDecoration: "none", transition: "all 0.3s", position: "relative" }}
                  onMouseEnter={e => { e.target.style.opacity = 0.6; e.target.style.letterSpacing = "0.18em"; }}
                  onMouseLeave={e => { e.target.style.opacity = 1; e.target.style.letterSpacing = "0.1em"; }}>
                  {n}
                </a>
              ))}
            </nav>
          </FadeIn>
        </div>

        {/* Marquee name */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "0 0 28px", position: "relative", zIndex: 1 }}>
          <div style={{ overflow: "hidden", marginTop: "clamp(20px,4vw,40px)", width: "100%", position: "relative" }}>

            {/* Gradient fade edges */}
            <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, #0C0C0C, transparent)", zIndex: 2, pointerEvents: "none" }} />
            <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, #0C0C0C, transparent)", zIndex: 2, pointerEvents: "none" }} />

            <motion.div
              style={{ display: "flex", whiteSpace: "nowrap" }}
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              {[...Array(6)].map((_, i) => (
                <motion.span
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    background: HERO_GRAD,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    fontWeight: 900,
                    textTransform: "uppercase",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                    fontFamily: "inherit",
                    fontSize: "clamp(10vw,13vw,16vw)",
                    paddingRight: "clamp(40px,6vw,80px)",
                    display: "inline-block",
                    flexShrink: 0,
                    filter: "drop-shadow(0 0 30px rgba(0,180,216,0.15))",
                  }}
                >
                  Hi, i&apos;m Bhavya&nbsp;&nbsp;✦&nbsp;&nbsp;
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Bottom row */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "0 40px" }}>
            <FadeIn delay={0.35} y={20}>
              <div>
                {/* Animated badge */}
                <motion.div
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 12, background: "rgba(0,180,216,0.1)", border: "1px solid rgba(0,180,216,0.3)", borderRadius: 9999, padding: "4px 14px" }}
                >
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00B4D8", boxShadow: "0 0 6px #00B4D8" }} />
                  <span style={{ color: "#00B4D8", fontSize: "0.72rem", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                    Available for work
                  </span>
                </motion.div>
                <p style={{ color: "#D7E2EA", fontWeight: 300, textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.4, fontSize: "clamp(0.75rem,1.4vw,1.3rem)", maxWidth: 280, margin: 0 }}>
                  An SEO Executive driven by ranking brands and building lasting organic growth
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.5} y={20}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 16 }}>
                <ContactButton />
                {/* Scroll indicator */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, opacity: 0.3, cursor: "default" }}
                >
                  <span style={{ color: "#D7E2EA", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.15em" }}>Scroll</span>
                  <div style={{ width: 1, height: 32, background: "linear-gradient(to bottom, #D7E2EA, transparent)" }} />
                </motion.div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* STATS MARQUEE */}
      <section style={{ background: "#0C0C0C", padding: "60px 0", borderTop: "1px solid rgba(215,226,234,0.08)", borderBottom: "1px solid rgba(215,226,234,0.08)", overflow: "hidden" }}>
        <motion.div
          style={{ display: "flex", gap: 80 }}
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
        >
          {[...stats, ...stats, ...stats, ...stats].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 24, flexShrink: 0 }}>
              <span style={{ ...gradText, fontSize: "clamp(2.5rem,5vw,4rem)" }}>{s.num}</span>
              <span style={{ color: "#D7E2EA", opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "clamp(0.7rem,1.1vw,0.9rem)", fontWeight: 300, maxWidth: 120 }}>{s.label}</span>
              <span style={{ color: "#D7E2EA", opacity: 0.2, fontSize: "2rem", marginLeft: 20 }}>✦</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 20px", position: "relative" }}>
        {[
          { emoji: "📈", top: "8%", left: "3%", size: 56 },
          { emoji: "🔍", bottom: "10%", left: "6%", size: 48 },
          { emoji: "🌐", top: "8%", right: "3%", size: 52 },
          { emoji: "⚡", bottom: "10%", right: "6%", size: 48 },
        ].map((d, i) => (
          <FadeIn key={i} delay={0.1 + i * 0.1} x={i < 2 ? -60 : 60} y={0} duration={0.9}>
            <div style={{ position: "absolute", top: d.top, bottom: d.bottom, left: d.left, right: d.right, fontSize: d.size, opacity: 0.18, userSelect: "none", pointerEvents: "none" }}>
              {d.emoji}
            </div>
          </FadeIn>
        ))}

        <FadeIn delay={0} y={40}>
          <h2 style={{ ...gradText, fontSize: "clamp(3rem,12vw,140px)", textAlign: "center", marginBottom: 40 }}>
            About Me
          </h2>
        </FadeIn>

        <AnimatedText text="With over 1.5 years of hands-on experience in SEO and digital marketing, i specialize in organic growth strategies that deliver real rankings, real traffic, and real results — from healthcare brands in Punjab to international clients across UK and USA." />

        <div style={{ marginTop: 60 }}>
          <ContactButton />
        </div>
      </section>

      {/* TOOLS */}
      <section style={{ background: "#0C0C0C", padding: "40px 40px 80px", borderTop: "1px solid rgba(215,226,234,0.08)" }}>
        <FadeIn delay={0} y={20}>
          <p style={{ color: "#D7E2EA", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", fontWeight: 300, textAlign: "center", marginBottom: 28 }}>Tools I Work With</p>
        </FadeIn>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 800, margin: "0 auto" }}>
          {tools.map((t, i) => (
            <FadeIn key={i} delay={i * 0.05} y={15}>
              <div style={{ border: "1px solid rgba(215,226,234,0.2)", borderRadius: 9999, color: "#D7E2EA", padding: "8px 20px", fontSize: "clamp(0.75rem,1.2vw,0.95rem)", fontWeight: 300, letterSpacing: "0.05em", background: "rgba(215,226,234,0.04)" }}>
                {t}
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ background: "#FFFFFF", borderRadius: "60px 60px 0 0", padding: "80px 40px" }}>
        <FadeIn delay={0} y={30}>
          <h2 style={{ fontFamily: "inherit", fontWeight: 900, textTransform: "uppercase", fontSize: "clamp(3rem,12vw,140px)", color: "#0C0C0C", textAlign: "center", lineHeight: 1, letterSpacing: "-0.02em", marginBottom: "clamp(48px,6vw,96px)" }}>
            Services
          </h2>
        </FadeIn>

        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          {services.map((s, i) => (
            <FadeIn key={i} delay={i * 0.1} y={20}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "clamp(16px,3vw,40px)", padding: "clamp(28px,4vw,48px) 0", borderBottom: "1px solid rgba(12,12,12,0.12)" }}>
                <span style={{ fontWeight: 900, fontSize: "clamp(2.5rem,7vw,100px)", color: "#0C0C0C", lineHeight: 1, flexShrink: 0, opacity: 0.08, fontFamily: "inherit" }}>
                  {s.num}
                </span>
                <div style={{ paddingTop: 8 }}>
                  <div style={{ fontWeight: 700, textTransform: "uppercase", fontSize: "clamp(1rem,2vw,1.8rem)", color: "#0C0C0C", marginBottom: 8, letterSpacing: "0.02em", fontFamily: "inherit" }}>
                    {s.name}
                  </div>
                  <div style={{ fontWeight: 300, lineHeight: 1.7, color: "#0C0C0C", opacity: 0.55, fontSize: "clamp(0.85rem,1.5vw,1.15rem)", maxWidth: 620 }}>
                    {s.desc}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* WORK STUDIES */}
      <section
        id="work"
        ref={workScrollRef}
        style={{ background: "#0C0C0C", borderRadius: "60px 60px 0 0", marginTop: -40, zIndex: 10, position: "relative", padding: "80px 20px 120px" }}
      >
        <FadeIn delay={0} y={30}>
          <h2 style={{ ...gradText, fontSize: "clamp(3rem,12vw,140px)", textAlign: "center", marginBottom: 16 }}>
            Work
          </h2>
          <p style={{ color: "#D7E2EA", opacity: 0.4, textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", fontWeight: 300, textAlign: "center", marginBottom: 60 }}>
            Click "View Work" on any card for full case study
          </p>
        </FadeIn>

        {workStudies.map((s, i) => (
          <WorkCard key={s.id} study={s} index={i} total={workStudies.length} scrollRef={workScrollRef} />
        ))}
      </section>

      {/* CONTACT FOOTER */}
      <section id="contact" style={{ background: "#0C0C0C", padding: "100px 40px 80px", borderTop: "1px solid rgba(215,226,234,0.08)", textAlign: "center" }}>
        <FadeIn delay={0} y={30}>
          <h2 style={{ ...gradText, fontSize: "clamp(3rem,10vw,100px)", marginBottom: 24 }}>
            Let&apos;s Build
          </h2>
        </FadeIn>
        <FadeIn delay={0.2} y={20}>
          <p style={{ color: "#D7E2EA", opacity: 0.5, fontWeight: 300, fontSize: "clamp(0.9rem,1.5vw,1.2rem)", marginBottom: 48, maxWidth: 500, margin: "0 auto 48px" }}>
            Open to freelance projects, full-time opportunities, and SEO collaborations. Based in Ludhiana & Mohali, Punjab, India.
          </p>
        </FadeIn>
        <FadeIn delay={0.3} y={20}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <ContactButton />
            <a
              href="https://www.linkedin.com/in/bhavya-arora018/"
              target="_blank"
              rel="noreferrer"
              style={{
                borderRadius: 9999, border: "2px solid #D7E2EA", background: "transparent",
                color: "#D7E2EA", fontFamily: "inherit", fontWeight: 500,
                textTransform: "uppercase", letterSpacing: "0.12em",
                padding: "12px 40px", fontSize: "clamp(0.75rem,1.2vw,1rem)",
                textDecoration: "none", display: "inline-block",
                transition: "background 0.2s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(215,226,234,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
            >
              LinkedIn
            </a>
          </div>
        </FadeIn>
        <FadeIn delay={0.5} y={10}>
          <div style={{ marginTop: 40, color: "#D7E2EA", opacity: 0.2, fontWeight: 300, fontSize: "0.85rem", letterSpacing: "0.1em" }}>
            © 2026 BHAVYA ARORA · SEO EXECUTIVE & DIGITAL MARKETING SPECIALIST
          </div>
        </FadeIn>
      </section>

    </div>
  );
}
