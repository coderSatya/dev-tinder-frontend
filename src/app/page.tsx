"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
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
  const {
    user,
    isAuthenticated,
    connections,
    requests,
    feed,
    fetchConnections,
    fetchRequests,
    fetchFeed,
  } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchConnections();
      fetchRequests();
      fetchFeed();
    }
  }, [isAuthenticated, fetchConnections, fetchRequests, fetchFeed]);

  return (
    <>
      <main className="dt-content flex-grow flex flex-col items-center justify-center p-4">
        {/* ══════════════════════════════════════════════
              AUTHENTICATED VIEW
          ══════════════════════════════════════════════ */}
        {isAuthenticated && user ? (
          <div
            style={{
              width: "100%",
              maxWidth: 860,
              margin: "0 auto",
              padding: "2rem 1rem",
            }}
          >
            {/* Live badge */}
            {/* <div
              className="dt-fade-up"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1.75rem",
              }}
            >
              <span className="dt-pill">
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    background: "#22c55e",
                    display: "inline-block",
                  }}
                />
                3 developers liked your profile today
              </span>
            </div> */}

            {/* Heading */}
            <div
              className="dt-fade-up-1"
              style={{ textAlign: "center", marginBottom: "1.5rem" }}
            >
              <h1
                className="dt-display"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                  color: "#f0ede8",
                  marginBottom: "0.5rem",
                }}
              >
                Welcome back,{" "}
                <span
                  className="dt-display-italic"
                  style={{ color: "#DC2626" }}
                >
                  {user?.firstName}
                </span>
              </h1>
              <p
                style={{
                  color: "rgba(240,237,232,0.5)",
                  fontSize: "1.05rem",
                  marginTop: "0.5rem",
                }}
              >
                Your next collaborator is one swipe away.
              </p>
            </div>

            {/* Avatar + skills */}
            <div
              className="dt-fade-up-2"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
                marginBottom: "2rem",
              }}
            >
              <div style={{ position: "relative" }}>
                <Image
                  src={user?.photoUrl ?? "/default-avatar.png"}
                  alt={`${user?.firstName}'s profile`}
                  width={88}
                  height={88}
                  style={{
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "3px solid rgba(220,38,38,0.5)",
                  }}
                />
                <span
                  style={{
                    position: "absolute",
                    bottom: 3,
                    right: 3,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "#22c55e",
                    border: "2px solid #0c0c0e",
                    display: "block",
                  }}
                />
              </div>

              {user?.skills && user.skills.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    gap: 8,
                  }}
                >
                  {user.skills.map((skill) => (
                    <span key={skill} className="dt-chip">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Stats row */}
            <div
              className="dt-fade-up-3"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 10,
                marginBottom: "1.75rem",
              }}
            >
              {[
                { label: "Matches", value: "12", sub: "developers" },
                {
                  label: "Connections",
                  value: connections.length.toString(),
                  sub: "chatting",
                },
                // { label: "Profile views", value: "48", sub: "this week" },
                {
                  label: "Requests  ",
                  value: requests.length.toString(),
                  sub: "this week",
                },
              ].map(({ label, value, sub }) => (
                <div key={label} className="dt-stat">
                  <span
                    className="dt-mono"
                    style={{
                      color: "rgba(240,237,232,0.4)",
                      textTransform: "uppercase",
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontSize: "1.9rem",
                      fontWeight: 700,
                      fontFamily: "'Playfair Display', serif",
                      color: "#DC2626",
                    }}
                  >
                    {value}
                  </span>
                  <span
                    style={{ fontSize: 12, color: "rgba(240,237,232,0.4)" }}
                  >
                    {sub}
                  </span>
                </div>
              ))}
            </div>

            {/* Nearby devs */}
            <div
              className="dt-fade-up-4 dt-card"
              style={{ marginBottom: "1.5rem" }}
            >
              <p
                className="dt-mono"
                style={{
                  color: "rgba(240,237,232,0.35)",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Developers near your stack
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {feed && feed.data?.length > 0 ? (
                  feed.data?.slice(0, 3).map((p, i) => (
                    <div key={p._id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 14,
                          padding: "12px 0",
                        }}
                      >
                        {p.photoUrl ? (
                          <img
                            src={p.photoUrl}
                            alt=""
                            style={{
                              width: 44,
                              height: 44,
                              borderRadius: "50%",
                              objectFit: "cover",
                              border: "1px solid rgba(220,38,38,0.2)",
                            }}
                          />
                        ) : (
                          <div
                            className="dt-avatar"
                            style={{ width: 44, height: 44, fontSize: 16 }}
                          >
                            {p.firstName.charAt(0)}
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              margin: 0,
                              fontWeight: 600,
                              fontSize: 14,
                              color: "#f0ede8",
                            }}
                          >
                            {p.firstName} {p.lastName}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 12,
                              color: "rgba(240,237,232,0.4)",
                            }}
                            className="truncate max-w-[220px]"
                          >
                            {p.skills?.slice(0, 3).join(" · ") ||
                              p.about ||
                              "Developer"}
                          </p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                          <Link
                            href="/feed"
                            className="dt-chip"
                            style={{ fontSize: 10, padding: "2px 10px" }}
                          >
                            Discover
                          </Link>
                        </div>
                      </div>
                      {i < Math.min(feed.data.length, 3) - 1 && (
                        <div className="dt-divider" />
                      )}
                    </div>
                  ))
                ) : (
                  <div style={{ padding: "20px 0", textAlign: "center" }}>
                    <p style={{ fontSize: 13, color: "rgba(240,237,232,0.3)" }}>
                      No new developers found in your area.
                    </p>
                    <Link
                      href="/feed"
                      style={{
                        fontSize: 12,
                        color: "#DC2626",
                        textDecoration: "none",
                        fontWeight: 600,
                      }}
                    >
                      Explore more →
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Pending Requests Section (New) */}
            {requests.length > 0 && (
              <div
                className="dt-fade-up-4 dt-card"
                style={{
                  marginBottom: "1.5rem",
                  background: "rgba(220,38,38,0.03)",
                  border: "1px solid rgba(220,38,38,0.1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 14,
                  }}
                >
                  <p
                    className="dt-mono"
                    style={{
                      color: "#DC2626",
                      textTransform: "uppercase",
                      fontSize: 11,
                      fontWeight: 600,
                    }}
                  >
                    Pending Requests ({requests.length})
                  </p>
                  <Link
                    href="/request"
                    style={{
                      fontSize: 11,
                      color: "rgba(240,237,232,0.4)",
                      textDecoration: "none",
                    }}
                  >
                    View all →
                  </Link>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 0 }}
                >
                  {requests.slice(0, 2).map((req, i) => (
                    <div key={req._id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          padding: "10px 0",
                        }}
                      >
                        {req.fromUserId.photoUrl ? (
                          <img
                            src={req.fromUserId.photoUrl}
                            alt=""
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            className="dt-avatar"
                            style={{ width: 36, height: 36, fontSize: 14 }}
                          >
                            {req.fromUserId.firstName.charAt(0)}
                          </div>
                        )}
                        <div style={{ flex: 1 }}>
                          <p
                            style={{
                              margin: 0,
                              fontWeight: 600,
                              fontSize: 13,
                              color: "#f0ede8",
                            }}
                          >
                            {req.fromUserId.firstName} {req.fromUserId.lastName}
                          </p>
                          <p
                            style={{
                              margin: 0,
                              fontSize: 11,
                              color: "rgba(240,237,232,0.4)",
                            }}
                            className="truncate max-w-[180px]"
                          >
                            {req.fromUserId.about ||
                              "Interested in connecting!"}
                          </p>
                        </div>
                        <Link
                          href="/request"
                          className="dt-chip"
                          style={{
                            fontSize: 10,
                            padding: "2px 10px",
                            borderColor: "rgba(220,38,38,0.3)",
                            color: "#DC2626",
                          }}
                        >
                          Review
                        </Link>
                      </div>
                      {i < Math.min(requests.length, 2) - 1 && (
                        <div className="dt-divider" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="dt-fade-up-5">
              <Link href="/feed" className="dt-btn-primary">
                Start Swiping →
              </Link>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "rgba(240,237,232,0.25)",
                  fontStyle: "italic",
                  marginTop: "1rem",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                "Code is temporary. Good collaborators are forever."
              </p>
            </div>
          </div>
        ) : (
          /* ══════════════════════════════════════════════
                UNAUTHENTICATED / LANDING VIEW
            ══════════════════════════════════════════════ */
          <div
            style={{
              width: "100%",
              maxWidth: 980,
              margin: "0 auto",
              padding: "3rem 1.25rem",
            }}
          >
            {/* Top label */}
            <div
              className="dt-fade-up"
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "2rem",
              }}
            >
              <span className="dt-pill dt-mono">
                <span style={{ color: "#DC2626" }}>♥</span>&nbsp; Tinder, but
                for developers
              </span>
            </div>

            {/* Hero headline */}
            <div
              className="dt-fade-up-1"
              style={{ textAlign: "center", marginBottom: "1.5rem" }}
            >
              <h1
                className="dt-display dt-hero-title"
                style={{
                  fontSize: "clamp(3.2rem, 8vw, 6rem)",
                  color: "#f0ede8",
                  marginBottom: "0.75rem",
                }}
              >
                Find Your
                <br />
                <span
                  className="dt-display-italic"
                  style={{ color: "#DC2626" }}
                >
                  Code-mate.
                </span>
              </h1>
              <p
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.2rem)",
                  color: "rgba(240,237,232,0.5)",
                  maxWidth: 520,
                  margin: "0 auto",
                  lineHeight: 1.7,
                }}
              >
                Swipe through developers, match on your stack,
                <br />
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
            <div
              className="dt-fade-up-3 dt-profiles-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 14,
                margin: "2rem 0",
              }}
            >
              {FAKE_PROFILES.map((p) => (
                <div key={p.name} className="dt-card">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      marginBottom: 14,
                    }}
                  >
                    <div
                      className="dt-avatar"
                      style={{ background: p.color, width: 48, height: 48 }}
                    >
                      {p.avatar}
                    </div>
                    <div>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 700,
                          fontSize: 14,
                          color: "#f0ede8",
                        }}
                      >
                        {p.name}
                      </p>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 11,
                          color: "rgba(240,237,232,0.4)",
                        }}
                      >
                        {p.role}
                      </p>
                    </div>
                  </div>
                  <p
                    style={{
                      fontSize: 12.5,
                      color: "rgba(240,237,232,0.55)",
                      fontStyle: "italic",
                      lineHeight: 1.6,
                      marginBottom: 14,
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    "{p.quote}"
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 6,
                      marginBottom: 14,
                    }}
                  >
                    {p.stack.map((s) => (
                      <span key={s} className="dt-chip">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        color: "rgba(240,237,232,0.3)",
                        letterSpacing: "0.06em",
                      }}
                      className="dt-mono"
                    >
                      MATCH SCORE
                    </span>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: "#DC2626",
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      {p.match}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Social proof numbers */}
            <div
              className="dt-fade-up-4"
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "3rem",
                margin: "2rem 0",
                flexWrap: "wrap",
              }}
            >
              {[
                { num: "12K+", label: "Developers" },
                { num: "3.4K", label: "Matches made" },
                { num: "240+", label: "Projects shipped" },
              ].map(({ num, label }) => (
                <div key={label} className="dt-hero-stat">
                  <span
                    className="dt-display"
                    style={{ fontSize: "2.4rem", color: "#f0ede8" }}
                  >
                    {num}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: "rgba(240,237,232,0.35)",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                    }}
                    className="dt-mono"
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div
              className="dt-fade-up-5"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 14,
              }}
            >
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
              <Link
                href="/login"
                className="dt-btn-outline"
                style={{ fontSize: 15 }}
              >
                I already have an account
              </Link>
              <p
                style={{
                  fontSize: 12,
                  color: "rgba(240,237,232,0.2)",
                  marginTop: "0.5rem",
                  fontStyle: "italic",
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                "Love at first `git commit`."
              </p>
            </div>
          </div>
        )}
      </main>

      <footer className="dt-footer">
        <p>
          © 2026 DevTinder &nbsp;·&nbsp; Built for developers, by developers
          &nbsp;·&nbsp; All rights reserved.
        </p>
      </footer>
    </>
  );
}
