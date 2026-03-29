"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState, useRef } from "react";
import { Eye, EyeOff, UserPlus, Camera, X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSignup } from "@/hooks/useSignup";
import { SignupRequestData } from "@/types/auth.types";
import Link from "next/link";
import Image from "next/image";

// ── Validation ────────────────────────────────────────────────────────────────
const signupSchema = yup.object({
  firstName: yup.string().min(2, "Min 2 characters").required("Required"),
  lastName: yup.string().min(2, "Min 2 characters").required("Required"),
  emailId: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(6, "Min 6 characters").required("Required"),
  gender: yup.string().oneOf(["male", "female", "other"], "Select a gender").required("Required"),
  about: yup.string().max(200, "Max 200 characters").optional(),
  photoUrl: yup.string().required("Profile photo is required"),
}).required();

// ── Suggested skills list ─────────────────────────────────────────────────────
const SUGGESTED_SKILLS = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "Go", "Rust", "Vue", "Svelte", "MongoDB",
  "PostgreSQL", "GraphQL", "Docker", "AWS", "Prisma",
  "TailwindCSS", "PyTorch", "Flutter", "Kotlin", "Swift",
];

const MAX_SKILLS = 5;

// ── Extended type ─────────────────────────────────────────────────────────────
type SignupFormData = SignupRequestData & {
  gender: string;
  about?: string;
};

export default function SignupPage() {
  const { mutate: signupUser, isPending } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  // Photo
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);

  // Skills
  const [skills, setSkills] = useState<string[]>([]);
  const [skillInput, setSkillInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = SUGGESTED_SKILLS.filter(
    (s) =>
      s.toLowerCase().includes(skillInput.toLowerCase()) &&
      !skills.includes(s)
  );

  const addSkill = (skill: string) => {
    const trimmed = skill.trim();
    if (!trimmed || skills.includes(trimmed) || skills.length >= MAX_SKILLS) return;
    setSkills((prev) => [...prev, trimmed]);
    setSkillInput("");
    setShowSuggestions(false);
  };

  const removeSkill = (skill: string) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  const handleSkillKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (filteredSuggestions.length > 0) addSkill(filteredSuggestions[0]);
      else addSkill(skillInput);
    }
  };

  // Photo handler
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhotoFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setPhotoPreview(result);
      setValue("photoUrl", result, { shouldValidate: true });
    };
    reader.readAsDataURL(file);
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema) as any,
  });

  const onSubmit = (data: SignupFormData) => {
    // Pass skills and photoUrl (dataURL) alongside form data
    signupUser({ ...data, skills } as any);
  };

  return (
    <div className="dt-signup-root">
      <div className="dt-glow-br" />

      <div className="dt-card dt-card-glass dt-fadein max-w-[500px]">
        {/* ── Header ── */}
        <div style={{ padding: "2rem 2rem 1.25rem", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: "50%", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", marginBottom: "1rem" }}>
            <UserPlus size={20} color="#DC2626" />
          </div>
          <h1 className="dt-display" style={{ fontSize: "2.2rem", color: "#f0ede8", marginBottom: "0.4rem" }}>
            Join the{" "}
            <span className="dt-display-italic" style={{ color: "#DC2626" }}>Circle</span>
          </h1>
          <p style={{ color: "rgba(240,237,232,0.35)", fontSize: "13.5px", fontFamily: "'DM Sans', sans-serif" }}>
            Connect with developers and build the future together
          </p>
        </div>

        {/* ── Form ── */}
        <div style={{ padding: "0 2rem 2rem" }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>

              {/* ── Photo upload ── */}
              <div>
                <div className="dt-section-divider"><span>Profile photo</span></div>
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 14 }}>
                  <div
                    className={`dt-photo-ring ${errors.photoUrl ? "border-red-500/50" : ""}`}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {photoPreview ? (
                      <>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={photoPreview} alt="Preview" />
                        <div className="dt-photo-overlay">
                          <Camera size={18} color="#fff" />
                        </div>
                      </>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <Camera size={22} color="rgba(240,237,232,0.25)" />
                        <span style={{ fontSize: 10, fontFamily: "'DM Mono', monospace", color: "rgba(240,237,232,0.2)", letterSpacing: "0.06em", textAlign: "center", lineHeight: 1.4 }}>UPLOAD</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, color: "rgba(240,237,232,0.55)", fontFamily: "'DM Sans', sans-serif", lineHeight: 1.6, marginBottom: 8 }}>
                      Upload a clear photo — first impressions matter.
                    </p>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#DC2626", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em", padding: 0 }}
                    >
                      {photoPreview ? "CHANGE PHOTO →" : "CHOOSE FROM DEVICE →"}
                    </button>
                    {photoPreview && (
                      <button
                        type="button"
                        onClick={() => { setPhotoPreview(null); setPhotoFile(null); }}
                        style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "rgba(240,237,232,0.25)", background: "none", border: "none", cursor: "pointer", letterSpacing: "0.06em", padding: 0, display: "block", marginTop: 4 }}
                      >
                        REMOVE
                      </button>
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handlePhotoChange}
                  />
                </div>
                {errors.photoUrl && (
                  <p className="dt-error-text" style={{ marginTop: 12 }}>
                    {errors.photoUrl.message}
                  </p>
                )}
              </div>

              {/* ── Name row ── */}
              <div>
                <div className="dt-section-divider"><span>Basic info</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
                  <div>
                    <label className="dt-label">First Name</label>
                    <input
                      className={`dt-input-custom ${errors.firstName ? "error" : ""}`}
                      placeholder="John"
                      {...register("firstName")}
                    />
                    {errors.firstName && <p className="dt-error-text">{errors.firstName.message}</p>}
                  </div>
                  <div>
                    <label className="dt-label">Last Name</label>
                    <input
                      className={`dt-input-custom ${errors.lastName ? "error" : ""}`}
                      placeholder="Doe"
                      {...register("lastName")}
                    />
                    {errors.lastName && <p className="dt-error-text">{errors.lastName.message}</p>}
                  </div>
                </div>
              </div>

              {/* ── Email ── */}
              <div>
                <label className="dt-label">Email Address</label>
                <input
                  type="email"
                  className={`dt-input-custom ${errors.emailId ? "error" : ""}`}
                  placeholder="john@example.com"
                  {...register("emailId")}
                />
                {errors.emailId && <p className="dt-error-text">{errors.emailId.message}</p>}
              </div>

              {/* ── Password ── */}
              <div>
                <label className="dt-label">Password</label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`dt-input-custom ${errors.password ? "error" : ""}`}
                    placeholder="••••••••"
                    style={{ paddingRight: 48 }}
                    {...register("password")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(240,237,232,0.25)", display: "flex", alignItems: "center" }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="dt-error-text">{errors.password.message}</p>}
              </div>

              {/* ── Gender ── */}
              <div>
                <label className="dt-label">Gender</label>
                <select
                  className={`dt-select-custom ${errors.gender ? "error" : ""}`}
                  {...register("gender")}
                  defaultValue=""
                >
                  <option value="" disabled>Select your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="dt-error-text">{errors.gender.message}</p>}
              </div>

              {/* ── About ── */}
              <div>
                <label className="dt-label">About <span style={{ color: "rgba(240,237,232,0.2)", fontSize: 9 }}>(optional)</span></label>
                <textarea
                  className="dt-textarea-custom"
                  rows={3}
                  placeholder="I build things at night and break them by morning..."
                  {...register("about")}
                />
                {errors.about && <p className="dt-error-text">{errors.about.message}</p>}
              </div>

              {/* ── Skills ── */}
              <div>
                <div className="dt-section-divider"><span>Your stack</span></div>
                <div style={{ marginTop: 14 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
                    <label className="dt-label" style={{ margin: 0 }}>Skills</label>
                    <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, color: skills.length >= MAX_SKILLS ? "#DC2626" : "rgba(240,237,232,0.25)", letterSpacing: "0.06em" }}>
                      {skills.length}/{MAX_SKILLS}
                    </span>
                  </div>

                  {/* Selected chips */}
                  {skills.length > 0 && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 10 }}>
                      {skills.map((skill) => (
                        <span key={skill} className="dt-skill-chip-interactive">
                          {skill}
                          <button type="button" onClick={() => removeSkill(skill)}>
                            <X size={11} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Input + suggestions */}
                  {skills.length < MAX_SKILLS && (
                    <div style={{ position: "relative" }}>
                      <div style={{ position: "relative" }}>
                        <input
                          className="dt-input-custom"
                          placeholder="e.g. React, Go, Python…"
                          value={skillInput}
                          onChange={(e) => { setSkillInput(e.target.value); setShowSuggestions(true); }}
                          onKeyDown={handleSkillKeyDown}
                          onFocus={() => setShowSuggestions(true)}
                          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
                          style={{ paddingRight: 44 }}
                        />
                        {skillInput && (
                          <button
                            type="button"
                            onMouseDown={(e) => { e.preventDefault(); addSkill(skillInput); }}
                            style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "3px 8px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, color: "#DC2626", fontSize: 11, fontFamily: "'DM Mono', monospace" }}
                          >
                            <Plus size={11} /> ADD
                          </button>
                        )}
                      </div>

                      {showSuggestions && filteredSuggestions.length > 0 && (
                        <div className="dt-suggestions">
                          {filteredSuggestions.slice(0, 8).map((s) => (
                            <div
                              key={s}
                              className="dt-suggestion-item"
                              onMouseDown={(e) => { e.preventDefault(); addSkill(s); }}
                            >
                              {s}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {skills.length >= MAX_SKILLS && (
                    <p style={{ fontSize: 11.5, color: "rgba(220,38,38,0.6)", fontFamily: "'DM Sans', sans-serif", marginTop: 6 }}>
                      Max 5 skills reached. Remove one to add another.
                    </p>
                  )}

                  {/* Quick-add suggestions when input is empty */}
                  {skills.length < MAX_SKILLS && !skillInput && (
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 10 }}>
                      {SUGGESTED_SKILLS.filter((s) => !skills.includes(s)).slice(0, 8).map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => addSkill(s)}
                          style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, padding: "3px 11px", borderRadius: 999, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(240,237,232,0.4)", cursor: "pointer", transition: "all 0.15s", letterSpacing: "0.04em" }}
                        >
                          + {s}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Submit ── */}
              <button type="submit" className="dt-submit-btn" disabled={isPending} style={{ marginTop: 4 }}>
                {isPending ? (
                  <>
                    <div className="dt-spin" style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} />
                    Generating profile...
                  </>
                ) : "Create Account →"}
              </button>

              <p style={{ textAlign: "center", fontSize: 13, color: "rgba(240,237,232,0.25)", fontFamily: "'DM Sans', sans-serif" }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "#DC2626", fontWeight: 600, textDecoration: "none" }}>
                  Login here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}