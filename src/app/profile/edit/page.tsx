"use client";

import Link from "next/link";
import { Camera, X, Plus, ArrowLeft } from "lucide-react";
import { useProfileEdit, MAX_SKILLS, ALL_SKILLS } from "./useProfileEdit";
import "./profile-edit.css";

export default function ProfileEditPage() {
  const {
    fileRef,
    photoPreview,
    skills,
    skillInput,
    showSug,
    filtered,
    isSaving,
    errors,
    register,
    handleSubmit,
    onSubmit,
    handlePhotoChange,
    removePhoto,
    addSkill,
    removeSkill,
    setSkillInput,
    setShowSug,
  } = useProfileEdit();

  return (
    <div className="pe-root">
      <div className="pe-glow1" />

      <div style={{ maxWidth: 620, margin: "0 auto", padding: "2rem 1.5rem 3rem", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div className="pe-u1" style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: "2rem" }}>
          <Link href="/profile" style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 38, height: 38, borderRadius: 10, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", color: "rgba(240,237,232,0.5)", textDecoration: "none", transition: "border-color .2s", flexShrink: 0 }}>
            <ArrowLeft size={16} />
          </Link>
          <div>
            <h1 className="pe-display" style={{ fontSize: "1.8rem", color: "#f0ede8" }}>
              Edit{" "}
              <span className="pe-display-italic" style={{ color: "#DC2626" }}>Profile</span>
            </h1>
            <p style={{ fontSize: 13, color: "rgba(240,237,232,0.35)", marginTop: 2 }}>
              Keep your profile fresh to get better matches.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>

            {/* Photo */}
            <div className="pe-u1">
              <div className="pe-sec-div"><span>Profile photo</span></div>
              <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14 }}>
                <div className="pe-photo-ring" onClick={() => fileRef.current?.click()}>
                  {photoPreview ? (
                    <>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={photoPreview} alt="Preview" />
                      <div className="pe-photo-overlay">
                        <Camera size={18} color="#fff" />
                      </div>
                    </>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
                      <Camera size={22} color="rgba(240,237,232,0.22)" />
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 9, color: "rgba(240,237,232,0.2)", letterSpacing: ".07em" }}>UPLOAD</span>
                    </div>
                  )}
                </div>
                <div>
                  <p style={{ fontSize: 12.5, color: "rgba(240,237,232,0.4)", lineHeight: 1.65, marginBottom: 8 }}>
                    JPG or PNG · Max 5MB<br />Square photos work best.
                  </p>
                  <button type="button" onClick={() => fileRef.current?.click()}
                    style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "#DC2626", background: "none", border: "none", cursor: "pointer", letterSpacing: ".06em", padding: 0 }}>
                    {photoPreview ? "CHANGE PHOTO →" : "CHOOSE FROM DEVICE →"}
                  </button>
                  {photoPreview && (
                    <button type="button" onClick={removePhoto}
                      style={{ fontFamily: "'DM Mono',monospace", fontSize: 11, color: "rgba(240,237,232,0.22)", background: "none", border: "none", cursor: "pointer", letterSpacing: ".06em", padding: 0, display: "block", marginTop: 4 }}>
                      REMOVE
                    </button>
                  )}
                </div>
                <input ref={fileRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
              </div>
            </div>

            {/* Name */}
            <div className="pe-u2">
              <div className="pe-sec-div"><span>Basic info</span></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
                <div>
                  <label className="pe-label">First Name</label>
                  <input className={`pe-input ${errors.firstName ? "err" : ""}`} {...register("firstName")} />
                  {errors.firstName && <p className="pe-error">{errors.firstName.message}</p>}
                </div>
                <div>
                  <label className="pe-label">Last Name</label>
                  <input className={`pe-input ${errors.lastName ? "err" : ""}`} {...register("lastName")} />
                  {errors.lastName && <p className="pe-error">{errors.lastName.message}</p>}
                </div>
              </div>
            </div>

            {/* Age + Gender */}
            <div className="pe-u2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label className="pe-label">Age</label>
                <input type="number" className={`pe-input ${errors.age ? "err" : ""}`} min={18} max={80} {...register("age")} />
                {errors.age && <p className="pe-error">{errors.age.message}</p>}
              </div>
              <div>
                <label className="pe-label">Gender</label>
                <select className="pe-select" {...register("gender")}>
                  <option value="">Select…</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* About */}
            <div className="pe-u3">
              <label className="pe-label">About <span style={{ color: "rgba(240,237,232,0.18)", fontSize: 9 }}>(max 200 chars)</span></label>
              <textarea className="pe-textarea" rows={3} placeholder="Tell other devs who you are…" {...register("about")} />
              {errors.about && <p className="pe-error">{errors.about.message}</p>}
            </div>

            {/* Skills */}
            <div className="pe-u4">
              <div className="pe-sec-div"><span>Your stack</span></div>
              <div style={{ marginTop: 14 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                  <label className="pe-label" style={{ margin: 0 }}>Skills</label>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: 10, color: skills.length >= MAX_SKILLS ? "#DC2626" : "rgba(240,237,232,0.25)", letterSpacing: ".06em" }}>
                    {skills.length}/{MAX_SKILLS}
                  </span>
                </div>

                {/* Chips */}
                {skills.length > 0 && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 10 }}>
                    {skills.map((s) => (
                      <span key={s} className="pe-skill-chip">
                        {s}
                        <button type="button" className="pe-rm" onClick={() => removeSkill(s)}><X size={11} /></button>
                      </span>
                    ))}
                  </div>
                )}

                {/* Input */}
                {skills.length < MAX_SKILLS && (
                  <div style={{ position: "relative" }}>
                    <div style={{ position: "relative" }}>
                      <input
                        className="pe-input"
                        placeholder="e.g. Rust, GraphQL…"
                        value={skillInput}
                        onChange={(e) => { setSkillInput(e.target.value); setShowSug(true); }}
                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); filtered.length ? addSkill(filtered[0]) : addSkill(skillInput); }}}
                        onFocus={() => setShowSug(true)}
                        onBlur={() => setTimeout(() => setShowSug(false), 150)}
                        style={{ paddingRight: 55 }}
                      />
                      {skillInput && (
                        <button type="button" onMouseDown={(e) => { e.preventDefault(); addSkill(skillInput); }}
                          style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(220,38,38,0.14)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "3px 9px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#DC2626", fontSize: 11, fontFamily: "'DM Mono',monospace", letterSpacing: ".05em" }}>
                          <Plus size={11} /> ADD
                        </button>
                      )}
                    </div>
                    {showSug && filtered.length > 0 && (
                      <div className="pe-suggestions">
                        {filtered.slice(0, 7).map((s) => (
                          <div key={s} className="pe-sug-item" onMouseDown={(e) => { e.preventDefault(); addSkill(s); }}>
                            {s}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Quick adds */}
                {skills.length < MAX_SKILLS && !skillInput && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                    {ALL_SKILLS.filter((s) => !skills.includes(s)).slice(0, 8).map((s) => (
                      <button key={s} type="button" className="pe-qa-btn" onClick={() => addSkill(s)}>+ {s}</button>
                    ))}
                  </div>
                )}

                {skills.length >= MAX_SKILLS && (
                  <p style={{ fontSize: 11.5, color: "rgba(220,38,38,0.6)", marginTop: 6 }}>Max 5 skills reached. Remove one to add another.</p>
                )}
              </div>
            </div>

            {/* Save / Cancel */}
            <div className="pe-u5" style={{ display: "flex", flexDirection: "column", gap: 10, marginTop: 4 }}>
              <button type="submit" className="pe-save-btn" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "peSpin .7s linear infinite" }} />
                    Saving…
                  </>
                ) : (
                  "Save Changes →"
                )}
              </button>
              <Link
                href="/profile"
                style={{
                  display: "block",
                  textAlign: "center",
                  width: "100%",
                  padding: "13px 0",
                  background: "transparent",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "rgba(240,237,232,0.4)",
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13.5,
                  borderRadius: 12,
                  textDecoration: "none",
                  transition: "border-color .2s",
                }}
              >
                Cancel
              </Link>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}