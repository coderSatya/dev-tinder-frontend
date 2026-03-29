"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Camera, X, Plus, ArrowLeft } from "lucide-react";
import Link from "next/link";
import axios from "axios";

// ── Types ─────────────────────────────────────────────────────────────────────
type EditFormData = {
  firstName: string;
  lastName: string;
  age?: number;
  gender?: string;
  about?: string;
};

const schema = yup.object({
  firstName: yup.string().min(2, "Min 2 chars").required("Required"),
  lastName:  yup.string().min(2, "Min 2 chars").required("Required"),
  age:       yup.number().min(18).max(80).optional(),
  gender:    yup.string().oneOf(["male","female","other"]).optional(),
  about:     yup.string().max(200).optional(),
});

// ── Skill helpers ─────────────────────────────────────────────────────────────
const ALL_SKILLS = [
  "React","Next.js","TypeScript","Node.js","Python","Go","Rust",
  "Vue","Svelte","MongoDB","PostgreSQL","GraphQL","Docker","AWS",
  "Prisma","TailwindCSS","PyTorch","Flutter","Kotlin","Swift",
];
const MAX_SKILLS = 5;

export default function ProfileEditPage() {
  const router  = useRouter();
  const { user, setUser } = useAuthStore();

  // Photo
  const fileRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(user?.photoUrl ?? null);
  const [photoFile,    setPhotoFile]    = useState<File | null>(null);

  // Skills
  const [skills,      setSkills]      = useState<string[]>(user?.skills ?? []);
  const [skillInput,  setSkillInput]  = useState("");
  const [showSug,     setShowSug]     = useState(false);

  const filtered = ALL_SKILLS.filter(
    (s) => s.toLowerCase().includes(skillInput.toLowerCase()) && !skills.includes(s)
  );

  const addSkill = (s: string) => {
    const t = s.trim();
    if (!t || skills.includes(t) || skills.length >= MAX_SKILLS) return;
    setSkills((p) => [...p, t]);
    setSkillInput("");
    setShowSug(false);
  };

  const removeSkill = (s: string) => setSkills((p) => p.filter((x) => x !== s));

  // Form
  const { register, handleSubmit, formState: { errors } } = useForm<EditFormData>({
    resolver: yupResolver(schema) as any,
    defaultValues: {
      firstName: user?.firstName ?? "",
      lastName:  user?.lastName  ?? "",
      age:       user?.age,
      gender:    user?.gender    ?? "",
      about:     user?.about     ?? "",
    },
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saved,    setSaved]    = useState(false);

  const onSubmit = async (data: EditFormData) => {
    setIsSaving(true);
    try {
      const payload = { ...data, skills };

      // If photo was changed, convert to base64 or use FormData
      if (photoFile) {
        const reader = new FileReader();
        reader.readAsDataURL(photoFile);
        await new Promise<void>((res) => {
          reader.onload = () => {
            (payload as any).photoUrl = reader.result as string;
            res();
          };
        });
      }

      const res = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/profile/edit`,
        payload,
        { withCredentials: true }
      );

      setUser(res.data.data); // update Zustand store
      setSaved(true);
      setTimeout(() => router.push("/profile"), 800);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Mono:wght@400;500&family=DM+Sans:wght@400;500;600&display=swap');
        .pe-root{font-family:'DM Sans',sans-serif;background:#0c0c0e;color:#f0ede8;min-height:calc(100vh - 64px);position:relative;overflow:hidden;}
        .pe-root::before{content:'';position:absolute;inset:0;background-image:radial-gradient(circle,rgba(255,255,255,0.055) 1px,transparent 1px);background-size:28px 28px;pointer-events:none;}
        .pe-glow1{position:absolute;top:-80px;left:-80px;width:420px;height:420px;background:radial-gradient(circle,rgba(220,38,38,0.12) 0%,transparent 70%);pointer-events:none;}
        .pe-display{font-family:'Playfair Display',serif;font-weight:900;line-height:1.1;}
        .pe-display-italic{font-family:'Playfair Display',serif;font-style:italic;font-weight:700;}
        .pe-mono{font-family:'DM Mono',monospace;}
        .pe-label{font-family:'DM Mono',monospace;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:rgba(240,237,232,0.3);display:block;margin-bottom:6px;}
        .pe-input{width:100%;height:48px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#f0ede8;font-family:'DM Sans',sans-serif;font-size:14px;padding:0 14px;outline:none;transition:border-color .2s;box-sizing:border-box;}
        .pe-input::placeholder{color:rgba(240,237,232,0.18);}
        .pe-input:focus{border-color:rgba(220,38,38,0.5);}
        .pe-input.err{border-color:rgba(220,38,38,0.6);}
        .pe-select{width:100%;height:48px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#f0ede8;font-family:'DM Sans',sans-serif;font-size:14px;padding:0 14px;outline:none;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='rgba(240,237,232,0.3)' d='M6 8L1 3h10z'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 14px center;cursor:pointer;box-sizing:border-box;}
        .pe-select option{background:#1a1a1f;}
        .pe-select:focus{border-color:rgba(220,38,38,0.5);}
        .pe-textarea{width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:12px;color:#f0ede8;font-family:'DM Sans',sans-serif;font-size:14px;padding:12px 14px;outline:none;resize:none;line-height:1.6;box-sizing:border-box;transition:border-color .2s;}
        .pe-textarea::placeholder{color:rgba(240,237,232,0.18);}
        .pe-textarea:focus{border-color:rgba(220,38,38,0.5);}
        .pe-error{font-size:11.5px;color:rgba(220,38,38,0.75);margin-top:5px;margin-left:3px;}
        .pe-save-btn{width:100%;height:50px;background:#DC2626;color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:15px;border:none;border-radius:12px;cursor:pointer;letter-spacing:.01em;transition:background .2s,transform .15s;display:flex;align-items:center;justify-content:center;gap:8px;}
        .pe-save-btn:hover:not(:disabled){background:#b91c1c;transform:translateY(-1px);}
        .pe-save-btn:disabled{opacity:.6;cursor:not-allowed;}
        .pe-photo-ring{width:96px;height:96px;border-radius:50%;border:2px dashed rgba(255,255,255,0.18);display:flex;align-items:center;justify-content:center;cursor:pointer;transition:border-color .2s;position:relative;overflow:hidden;flex-shrink:0;}
        .pe-photo-ring:hover{border-color:rgba(220,38,38,0.5);}
        .pe-photo-ring img{width:100%;height:100%;object-fit:cover;border-radius:50%;}
        .pe-photo-overlay{position:absolute;inset:0;background:rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;border-radius:50%;opacity:0;transition:opacity .2s;}
        .pe-photo-ring:hover .pe-photo-overlay{opacity:1;}
        .pe-skill-chip{display:inline-flex;align-items:center;gap:5px;background:rgba(220,38,38,0.11);border:1px solid rgba(220,38,38,0.28);border-radius:999px;padding:4px 12px;font-family:'DM Mono',monospace;font-size:11.5px;color:rgba(240,237,232,0.7);letter-spacing:.04em;}
        .pe-rm{background:none;border:none;cursor:pointer;color:rgba(240,237,232,0.3);display:flex;align-items:center;padding:0;transition:color .15s;}
        .pe-rm:hover{color:#DC2626;}
        .pe-qa-btn{font-family:'DM Mono',monospace;font-size:11px;padding:3px 11px;border-radius:999px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);color:rgba(240,237,232,0.38);cursor:pointer;transition:all .15s;letter-spacing:.04em;}
        .pe-qa-btn:hover{background:rgba(220,38,38,0.1);border-color:rgba(220,38,38,0.3);color:rgba(240,237,232,0.7);}
        .pe-sec-div{display:flex;align-items:center;gap:10px;margin:4px 0 2px;}
        .pe-sec-div span{font-family:'DM Mono',monospace;font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:rgba(240,237,232,0.2);white-space:nowrap;}
        .pe-sec-div::before,.pe-sec-div::after{content:'';flex:1;height:1px;background:rgba(255,255,255,0.07);}
        .pe-suggestions{position:absolute;top:calc(100% + 3px);left:0;right:0;background:#1c1c22;border:1px solid rgba(255,255,255,0.1);border-radius:12px;overflow:hidden;z-index:50;max-height:180px;overflow-y:auto;}
        .pe-sug-item{padding:10px 14px;font-size:12.5px;font-family:'DM Mono',monospace;color:rgba(240,237,232,0.55);cursor:pointer;transition:background .15s;}
        .pe-sug-item:hover{background:rgba(220,38,38,0.1);color:#f0ede8;}
        @keyframes peFadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .pe-u1{animation:peFadeUp .5s .05s ease both}
        .pe-u2{animation:peFadeUp .5s .15s ease both}
        .pe-u3{animation:peFadeUp .5s .25s ease both}
        .pe-u4{animation:peFadeUp .5s .35s ease both}
        .pe-u5{animation:peFadeUp .5s .45s ease both}
        @keyframes peSpin{to{transform:rotate(360deg)}}
      `}</style>

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
                      <button type="button" onClick={() => { setPhotoPreview(null); setPhotoFile(null); }}
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
                <button type="submit" className="pe-save-btn" disabled={isSaving || saved}>
                  {saved ? (
                    "Saved ✓"
                  ) : isSaving ? (
                    <>
                      <div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "peSpin .7s linear infinite" }} />
                      Saving…
                    </>
                  ) : "Save Changes →"}
                </button>
                <Link href="/profile"
                  style={{ display: "block", textAlign: "center", width: "100%", padding: "13px 0", background: "transparent", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,237,232,0.4)", fontFamily: "'DM Sans',sans-serif", fontSize: 13.5, borderRadius: 12, textDecoration: "none", transition: "border-color .2s" }}>
                  Cancel
                </Link>
              </div>

            </div>
          </form>
        </div>
      </div>
    </>
  );
}