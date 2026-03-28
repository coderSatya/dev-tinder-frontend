"use client";

import { useAuthStore } from "@/store/useAuthStore";
import Image from "next/image";
import Link from "next/link";

// ─── Static fake profiles for the hero visual ───────────────────────────────
const FAKE_PROFILES = [
  {
    name: "Sara Chen",
    role: "Full-Stack Engineer",
    stack: ["React", "Go", "Postgres"],
    avatar: "SC",
    color: "#7C3AED",
    match: "94%",
    quote: "I write clean code and messier commit messages.",
  },
  {
    name: "Marcus Lee",
    role: "Indie Hacker",
    stack: ["Next.js", "Prisma", "Stripe"],
    avatar: "ML",
    color: "#059669",
    match: "89%",
    quote: "Shipped 4 SaaS products. Still looking for a co-founder.",
  },
  {
    name: "Priya Das",
    role: "ML Engineer",
    stack: ["Python", "PyTorch", "Rust"],
    avatar: "PD",
    color: "#DC2626",
    match: "81%",
    quote: "Turning data into decisions, one epoch at a time.",
  },
];

const TAGLINES = [
  { emoji: "💻", text: "Ship side projects together." },
  { emoji: "❤️", text: "Find your pair-programmer soulmate." },
  { emoji: "🚀", text: "Build startups. Build relationships." },
];

export default function Home() {
  const { user, isAuthenticated } = useAuthStore();

  return (
    <>
      {/* ── Google Fonts ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');

        .dt-root {
          font-family: 'DM Sans', sans-serif;
          background: #0c0c0e;
          color: #f0ede8;
          min-height: calc(100vh - 64px);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }

        /* dot grid background */
        .dt-root::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          pointer-events: none;
          z-index: 0;
        }

        /* red glow top-left */
        .dt-root::after {
          content: '';
          position: absolute;
          top: -120px;
          left: -120px;
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, rgba(220,38,38,0.18) 0%, transparent 70%);
          pointer-events: none;
          z-index: 0;
        }

        .dt-content { position: relative; z-index: 1; }

        /* ── Typography ── */
        .dt-display {
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.02em;
        }
        .dt-display-italic {
          font-family: 'Playfair Display', Georgia, serif;
          font-style: italic;
          font-weight: 700;
        }
        .dt-mono {
          font-family: 'DM Mono', monospace;
          font-size: 0.72rem;
          letter-spacing: 0.08em;
        }

        /* ── Pill badge ── */
        .dt-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 5px 14px;
          font-size: 11.5px;
          color: rgba(240,237,232,0.6);
          letter-spacing: 0.04em;
        }

        /* ── Skill chip ── */
        .dt-chip {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          padding: 3px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.12);
          color: rgba(240,237,232,0.65);
          letter-spacing: 0.06em;
        }

        /* ── Profile card ── */
        .dt-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          border-radius: 18px;
          padding: 20px;
          transition: transform 0.2s ease, border-color 0.2s ease;
        }
        .dt-card:hover {
          transform: translateY(-3px);
          border-color: rgba(220,38,38,0.35);
        }

        /* ── Stat card ── */
        .dt-stat {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 18px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* ── CTA button ── */
        .dt-btn-primary {
          background: #DC2626;
          color: #fff;
          font-weight: 600;
          font-size: 15px;
          border-radius: 12px;
          padding: 14px 0;
          width: 100%;
          text-align: center;
          display: block;
          text-decoration: none;
          transition: background 0.2s ease, transform 0.15s ease;
          letter-spacing: 0.01em;
        }
        .dt-btn-primary:hover { background: #b91c1c; transform: translateY(-1px); }

        .dt-btn-outline {
          background: transparent;
          color: #f0ede8;
          font-weight: 600;
          font-size: 18px;
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 999px;
          padding: 16px 44px;
          text-decoration: none;
          transition: border-color 0.2s, background 0.2s;
          letter-spacing: 0.01em;
        }
        .dt-btn-outline:hover {
          border-color: rgba(255,255,255,0.5);
          background: rgba(255,255,255,0.05);
        }

        /* ── Divider line ── */
        .dt-divider {
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent);
          margin: 8px 0;
        }

        /* ── Avatar circle ── */
        .dt-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          font-weight: 500;
          flex-shrink: 0;
          color: #fff;
        }

        /* ── Footer ── */
        .dt-footer {
          background: rgba(0,0,0,0.4);
          border-top: 1px solid rgba(255,255,255,0.06);
          text-align: center;
          padding: 28px 16px;
          font-size: 12.5px;
          color: rgba(240,237,232,0.3);
          letter-spacing: 0.04em;
          position: relative;
          z-index: 1;
        }

        /* ── Tagline strip ── */
        .dt-tagline-strip {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin: 2rem 0;
        }
        .dt-tagline-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 999px;
          padding: 8px 18px;
          font-size: 13px;
          color: rgba(240,237,232,0.7);
        }

        /* ── Hero big numbers ── */
        .dt-hero-stat {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        @keyframes floatUp {
          0% { opacity: 0; transform: translateY(24px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .dt-fade-up { animation: floatUp 0.7s ease forwards; }
        .dt-fade-up-1 { animation: floatUp 0.7s 0.1s ease both; }
        .dt-fade-up-2 { animation: floatUp 0.7s 0.25s ease both; }
        .dt-fade-up-3 { animation: floatUp 0.7s 0.4s ease both; }
        .dt-fade-up-4 { animation: floatUp 0.7s 0.55s ease both; }
        .dt-fade-up-5 { animation: floatUp 0.7s 0.7s ease both; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .dt-hero-title { font-size: 3.2rem !important; }
          .dt-profiles-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div className="dt-root">
        <main className="dt-content flex-grow flex flex-col items-center justify-center p-4">

          {/* ══════════════════════════════════════════════
              AUTHENTICATED VIEW
          ══════════════════════════════════════════════ */}
          {isAuthenticated && user ? (
            <div style={{ width: "100%", maxWidth: 860, margin: "0 auto", padding: "2rem 1rem" }}>

              {/* Live badge */}
              <div className="dt-fade-up" style={{ display: "flex", justifyContent: "center", marginBottom: "1.75rem" }}>
                <span className="dt-pill">
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                  3 developers liked your profile today
                </span>
              </div>

              {/* Heading */}
              <div className="dt-fade-up-1" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <h1 className="dt-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", color: "#f0ede8", marginBottom: "0.5rem" }}>
                  Welcome back,{" "}
                  <span className="dt-display-italic" style={{ color: "#DC2626" }}>{user?.firstName}</span>
                </h1>
                <p style={{ color: "rgba(240,237,232,0.5)", fontSize: "1.05rem", marginTop: "0.5rem" }}>
                  Your next collaborator is one swipe away.
                </p>
              </div>

              {/* Avatar + skills */}
              <div className="dt-fade-up-2" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: "2rem" }}>
                <div style={{ position: "relative" }}>
                  <Image
                    src={user?.photoUrl ?? "/default-avatar.png"}
                    alt={`${user?.firstName}'s profile`}
                    width={88}
                    height={88}
                    style={{ borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(220,38,38,0.5)" }}
                  />
                  <span style={{ position: "absolute", bottom: 3, right: 3, width: 16, height: 16, borderRadius: "50%", background: "#22c55e", border: "2px solid #0c0c0e", display: "block" }} />
                </div>

                {user?.skills && user.skills.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 8 }}>
                    {user.skills.map((skill) => (
                      <span key={skill} className="dt-chip">{skill}</span>
                    ))}
                  </div>
                )}
              </div>

              {/* Stats row */}
              <div className="dt-fade-up-3" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: "1.75rem" }}>
                {[
                  { label: "Matches", value: "12", sub: "developers" },
                  { label: "Connections", value: "5", sub: "chatting" },
                  { label: "Profile views", value: "48", sub: "this week" },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="dt-stat">
                    <span className="dt-mono" style={{ color: "rgba(240,237,232,0.4)", textTransform: "uppercase" }}>{label}</span>
                    <span style={{ fontSize: "1.9rem", fontWeight: 700, fontFamily: "'Playfair Display', serif", color: "#DC2626" }}>{value}</span>
                    <span style={{ fontSize: 12, color: "rgba(240,237,232,0.4)" }}>{sub}</span>
                  </div>
                ))}
              </div>

              {/* Nearby devs */}
              <div className="dt-fade-up-4 dt-card" style={{ marginBottom: "1.5rem" }}>
                <p className="dt-mono" style={{ color: "rgba(240,237,232,0.35)", textTransform: "uppercase", marginBottom: 14 }}>
                  Developers near your stack
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                  {FAKE_PROFILES.map((p, i) => (
                    <div key={p.name}>
                      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 0" }}>
                        <div className="dt-avatar" style={{ background: p.color }}>{p.avatar}</div>
                        <div style={{ flex: 1 }}>
                          <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#f0ede8" }}>{p.name}</p>
                          <p style={{ margin: 0, fontSize: 12, color: "rgba(240,237,232,0.4)" }}>{p.role}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: "#DC2626", fontFamily: "'Playfair Display', serif" }}>{p.match}</span>
                          <p style={{ margin: 0, fontSize: 10, color: "rgba(240,237,232,0.3)", letterSpacing: "0.05em" }}>MATCH</p>
                        </div>
                      </div>
                      {i < FAKE_PROFILES.length - 1 && <div className="dt-divider" />}
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="dt-fade-up-5">
                <Link href="/feed" className="dt-btn-primary">
                  Start Swiping →
                </Link>
                <p style={{ textAlign: "center", fontSize: 12, color: "rgba(240,237,232,0.25)", fontStyle: "italic", marginTop: "1rem", fontFamily: "'Playfair Display', serif" }}>
                  "Code is temporary. Good collaborators are forever."
                </p>
              </div>
            </div>

          ) : (

            /* ══════════════════════════════════════════════
                UNAUTHENTICATED / LANDING VIEW
            ══════════════════════════════════════════════ */
            <div style={{ width: "100%", maxWidth: 980, margin: "0 auto", padding: "3rem 1.25rem" }}>

              {/* Top label */}
              <div className="dt-fade-up" style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
                <span className="dt-pill dt-mono">
                  <span style={{ color: "#DC2626" }}>♥</span>&nbsp; Tinder, but for developers
                </span>
              </div>

              {/* Hero headline */}
              <div className="dt-fade-up-1" style={{ textAlign: "center", marginBottom: "1.5rem" }}>
                <h1 className="dt-display dt-hero-title" style={{ fontSize: "clamp(3.2rem, 8vw, 6rem)", color: "#f0ede8", marginBottom: "0.75rem" }}>
                  Find Your<br />
                  <span className="dt-display-italic" style={{ color: "#DC2626" }}>Code-mate.</span>
                </h1>
                <p style={{ fontSize: "clamp(1rem, 2.5vw, 1.2rem)", color: "rgba(240,237,232,0.5)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
                  Swipe through developers, match on your stack,<br />
                  and build something <em>remarkable</em> together.
                </p>
              </div>

              {/* Tagline pills */}
              <div className="dt-fade-up-2 dt-tagline-strip">
                {TAGLINES.map((t) => (
                  <span key={t.text} className="dt-tagline-item">
                    <span>{t.emoji}</span>
                    <span>{t.text}</span>
                  </span>
                ))}
              </div>

              {/* Fake profile cards */}
              <div className="dt-fade-up-3 dt-profiles-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, margin: "2rem 0" }}>
                {FAKE_PROFILES.map((p) => (
                  <div key={p.name} className="dt-card">
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                      <div className="dt-avatar" style={{ background: p.color, width: 48, height: 48 }}>{p.avatar}</div>
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, fontSize: 14, color: "#f0ede8" }}>{p.name}</p>
                        <p style={{ margin: 0, fontSize: 11, color: "rgba(240,237,232,0.4)" }}>{p.role}</p>
                      </div>
                    </div>
                    <p style={{ fontSize: 12.5, color: "rgba(240,237,232,0.55)", fontStyle: "italic", lineHeight: 1.6, marginBottom: 14, fontFamily: "'Playfair Display', serif" }}>
                      "{p.quote}"
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                      {p.stack.map((s) => (
                        <span key={s} className="dt-chip">{s}</span>
                      ))}
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 11, color: "rgba(240,237,232,0.3)", letterSpacing: "0.06em" }} className="dt-mono">MATCH SCORE</span>
                      <span style={{ fontSize: 16, fontWeight: 700, color: "#DC2626", fontFamily: "'Playfair Display', serif" }}>{p.match}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social proof numbers */}
              <div className="dt-fade-up-4" style={{ display: "flex", justifyContent: "center", gap: "3rem", margin: "2rem 0", flexWrap: "wrap" }}>
                {[
                  { num: "12K+", label: "Developers" },
                  { num: "3.4K", label: "Matches made" },
                  { num: "240+", label: "Projects shipped" },
                ].map(({ num, label }) => (
                  <div key={label} className="dt-hero-stat">
                    <span className="dt-display" style={{ fontSize: "2.4rem", color: "#f0ede8" }}>{num}</span>
                    <span style={{ fontSize: 12, color: "rgba(240,237,232,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }} className="dt-mono">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="dt-fade-up-5" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
                <Link
                  href="/signup"
                  style={{
                    background: "#DC2626",
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 17,
                    borderRadius: 999,
                    padding: "16px 56px",
                    textDecoration: "none",
                    letterSpacing: "0.01em",
                    transition: "background 0.2s, transform 0.15s",
                    fontFamily: "'DM Sans', sans-serif",
                  }}
                >
                  Join the Community
                </Link>
                <Link href="/login" className="dt-btn-outline" style={{ fontSize: 15 }}>
                  I already have an account
                </Link>
                <p style={{ fontSize: 12, color: "rgba(240,237,232,0.2)", marginTop: "0.5rem", fontStyle: "italic", fontFamily: "'Playfair Display', serif" }}>
                  "Love at first `git commit`."
                </p>
              </div>
            </div>
          )}
        </main>

        <footer className="dt-footer">
          <p>© 2026 DevTinder &nbsp;·&nbsp; Built for developers, by developers &nbsp;·&nbsp; All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}