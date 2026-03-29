"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ProfilePage() {
  const { user, connections, requests, fetchConnections, fetchRequests } = useAuthStore();

  useEffect(() => {
    fetchConnections();
    fetchRequests();
  }, [fetchConnections, fetchRequests]);

  if (!user) return null;

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName?.[0] ?? ""}${user.lastName?.[0] ?? ""}`.toUpperCase();
  const complete = [user.age, user.about, user.photoUrl, user.skills?.length]
    .filter(Boolean).length;
  const strength = Math.round((complete / 4) * 100);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        .pv-root{font-family:'DM Sans',sans-serif;background:#0c0c0e;color:#f0ede8;min-height:calc(100vh - 64px);position:relative;overflow:hidden;}
        .pv-root::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.055) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;z-index:0;}
        .pv-glow1{position:absolute;top:-80px;left:-80px;width:420px;height:420px;background:radial-gradient(circle,rgba(220,38,38,0.13) 0%,transparent 70%);pointer-events:none;}
        .pv-glow2{position:absolute;bottom:-60px;right:-60px;width:360px;height:360px;background:radial-gradient(circle,rgba(124,58,237,0.09) 0%,transparent 70%);pointer-events:none;}
        .pv-display{font-family:'Playfair Display',serif;font-weight:900;line-height:1.1;}
        .pv-mono{font-family:'DM Mono',monospace;}
        .pv-section-label{font-family:'DM Mono',monospace;font-size:9.5px;letter-spacing:.13em;text-transform:uppercase;color:rgba(240,237,232,0.25);margin-bottom:10px;}
        .pv-chip{font-family:'DM Mono',monospace;font-size:11px;padding:4px 13px;border-radius:999px;background:rgba(220,38,38,0.1);border:1px solid rgba(220,38,38,0.25);color:rgba(240,237,232,0.75);letter-spacing:.05em;}
        .pv-detail-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:11px;padding:12px 14px;}
        .pv-stat-card{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:14px 12px;display:flex;flex-direction:column;gap:3px;}
        .pv-prog-track{height:4px;background:rgba(255,255,255,0.08);border-radius:999px;overflow:hidden;margin-top:6px;}
        .pv-prog-fill{height:100%;border-radius:999px;background:#DC2626;}
        .pv-divider{height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent);margin:4px 0;}
        @keyframes pvFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .pv-u1{animation:pvFadeUp .5s .05s ease both}
        .pv-u2{animation:pvFadeUp .5s .15s ease both}
        .pv-u3{animation:pvFadeUp .5s .25s ease both}
        .pv-u4{animation:pvFadeUp .5s .35s ease both}
        .pv-u5{animation:pvFadeUp .5s .45s ease both}
      `}</style>

      <div className="pv-root">
        <div className="pv-glow1" />
        <div className="pv-glow2" />

        <div className="pv-u1" style={{ position: "relative", height: 220, overflow: "hidden", zIndex: 1 }}>
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a0808 0%,#0c0c0e 60%,#080c1a 100%)" }} />
          <div style={{ position: "absolute", inset: 0, backgroundImage: "repeating-linear-gradient(45deg,rgba(220,38,38,0.04) 0,rgba(220,38,38,0.04) 1px,transparent 0,transparent 50%)", backgroundSize: "20px 20px" }} />
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end", padding: "0 2rem 1.5rem", gap: "1.5rem", maxWidth: 860, margin: "0 auto", left: 0, right: 0 }}>
            <div style={{ position: "relative", flexShrink: 0 }}>
              {user.photoUrl ? (
                <Image
                  src={user.photoUrl}
                  alt={fullName}
                  width={110}
                  height={110}
                  style={{ borderRadius: "50%", objectFit: "cover", border: "3px solid rgba(220,38,38,0.6)" }}
                />
              ) : (
                <div style={{ width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#DC2626)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display',serif", fontSize: "2.5rem", color: "#fff", fontWeight: 700, border: "3px solid rgba(220,38,38,0.5)" }}>
                  {initials}
                </div>
              )}
              <span style={{ position: "absolute", bottom: 6, right: 6, width: 18, height: 18, borderRadius: "50%", background: "#22c55e", border: "3px solid #0c0c0e", display: "block" }} />
            </div>

            <div style={{ paddingBottom: 4 }}>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: ".1em", color: "rgba(240,237,232,0.35)", textTransform: "uppercase", marginBottom: 5 }}>
                {user.gender? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "Developer"}
                {user.age ? ` · ${user.age}` : ""}
              </p>
              <h1 className="pv-display" style={{ fontSize: "clamp(1.6rem,4vw,2rem)", color: "#f0ede8" }}>{fullName}</h1>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                <span style={{ fontSize: 12, color: "rgba(240,237,232,0.4)" }}>Active now · Member since 2026</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "1.5rem 2rem 3rem", display: "flex", flexDirection: "column", gap: "1.5rem", position: "relative", zIndex: 1 }}>
          <div className="pv-u2">
            <p className="pv-section-label">Your stats</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
              {[
                { label: "Matches", value: 12, sub: "developers" },
                { label: "Connections", value: connections.length, sub: "active chats" },
                { label: "Views", value: 48, sub: "this week" },
                { label: "Liked by", value: requests.length, sub: "today" },
              ].map(({ label, value, sub }) => (
                <div key={label} className="pv-stat-card">
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: ".1em", color: "rgba(240,237,232,0.3)", textTransform: "uppercase" }}>{label}</span>
                  <span className="pv-display" style={{ fontSize: "1.8rem", color: label === "Matches" || label === "Liked by" ? "#DC2626" : "#f0ede8" }}>{value}</span>
                  <span style={{ fontSize: 11, color: "rgba(240,237,232,0.3)" }}>{sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pv-u2">
            <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(240,237,232,0.3)" }}>Profile strength</span>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#DC2626", fontWeight: 500 }}>{strength}%</span>
              </div>
              <div className="pv-prog-track">
                <div className="pv-prog-fill" style={{ width: `${strength}%` }} />
              </div>
              {strength < 100 && (
                <p style={{ fontSize: 12, color: "rgba(240,237,232,0.3)", marginTop: 8 }}>
                  {!user.age ? "Add your age · " : ""}
                  {!user.about ? "Add a bio · " : ""}
                  {!user.photoUrl ? "Upload a photo · " : ""}
                  {!user.skills?.length ? "Add skills" : ""}
                  to strengthen your profile.
                </p>
              )}
            </div>
          </div>

          {user.about && (
            <div className="pv-u3">
              <p className="pv-section-label">About</p>
              <p style={{ fontSize: 14, color: "rgba(240,237,232,0.6)", lineHeight: 1.75, fontStyle: "italic", fontFamily: "'Playfair Display',serif" }}>
                "{user.about}"
              </p>
            </div>
          )}

          <div className="pv-divider" />

          {user.skills && user.skills.length > 0 && (
            <div className="pv-u3">
              <p className="pv-section-label">Stack</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {user.skills.map((s) => (
                  <span key={s} className="pv-chip">{s}</span>
                ))}
              </div>
            </div>
          )}

          <div className="pv-divider" />

          <div className="pv-u4">
            <p className="pv-section-label">Details</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { label: "Age", value: user.age?.toString() ?? "—" },
                { label: "Gender", value: user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "—" },
                { label: "Email", value: user.emailId },
                { label: "Looking for", value: "Collaborator · Co-founder" },
              ].map(({ label, value }) => (
                <div key={label} className="pv-detail-card">
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, letterSpacing: ".1em", color: "rgba(240,237,232,0.25)", textTransform: "uppercase", marginBottom: 4 }}>{label}</p>
                  <p style={{ fontSize: 13.5, color: "#f0ede8", fontWeight: 500 }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {requests.length > 0 && (
            <div className="pv-u5">
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                <p className="pv-section-label">Pending Requests ({requests.length})</p>
                <Link href="/request" style={{ fontSize: 11, color: "#DC2626", textDecoration: "none", fontWeight: 600 }}>Review all →</Link>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {requests.slice(0, 3).map((req) => (
                  <div key={req._id} className="pv-detail-card" style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {req.fromUserId.photoUrl ? (
                      <img src={req.fromUserId.photoUrl} alt="" style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "1px solid rgba(220,38,38,0.2)" }} />
                    ) : (
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(220,38,38,0.1)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#DC2626" }}>
                        {req.fromUserId.firstName.charAt(0)}
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 14, color: "#f0ede8" }}>{req.fromUserId.firstName} {req.fromUserId.lastName}</p>
                      <p style={{ margin: 0, fontSize: 11, color: "rgba(240,237,232,0.4)" }} className="truncate max-w-[200px]">{req.fromUserId.about || "Wants to connect"}</p>
                    </div>
                    <Link href="/request" className="pv-chip" style={{ fontSize: 10 }}>Review</Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pv-u5">
            <Link
              href="/profile/edit"
              style={{ display: "block", width: "100%", textAlign: "center", background: "rgba(220,38,38,0.12)", border: "1px solid rgba(220,38,38,0.3)", color: "#DC2626", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 14, borderRadius: 11, padding: "14px 0", textDecoration: "none", letterSpacing: ".01em", transition: "background .2s" }}
            >
              Edit Profile →
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}