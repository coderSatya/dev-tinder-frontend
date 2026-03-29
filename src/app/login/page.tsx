"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
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
import { useLogin } from "@/hooks/useLogin";
import { LoginRequestData } from "@/types/auth.types";

const loginSchema = yup.object({
  emailId: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

export default function LoginPage() {
  const { mutate: loginUser, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequestData>({
    resolver: yupResolver(loginSchema) as any,
  });

  const onSubmit = (data: LoginRequestData) => {
    loginUser(data);
  };

  return (
    <div className="dt-signup-root">
      <div className="dt-glow-br" />

      <Card className="dt-card dt-card-glass dt-fadein w-full max-w-md border-none shadow-2xl overflow-hidden">
        <CardHeader className="space-y-2 pb-8 text-center pt-8">
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: "50%", background: "rgba(220,38,38,0.1)", border: "1px solid rgba(220,38,38,0.2)", margin: "0 auto 1rem" }}>
            <Eye size={20} color="#DC2626" />
          </div>
          <CardTitle className="dt-display text-4xl text-[#f0ede8]">
            Welcome <span className="dt-display-italic text-[#DC2626]">Back</span>
          </CardTitle>
          <CardDescription className="text-white/40 font-medium font-sans text-sm">
            Enter your credentials to continue your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-1">
              <label htmlFor="emailId" className="dt-label">Email Address</label>
              <input
                id="emailId"
                type="email"
                placeholder="name@example.com"
                {...register("emailId")}
                className={`dt-input-custom ${errors.emailId ? "error" : ""}`}
              />
              {errors.emailId && (
                <p className="dt-error-text">{errors.emailId.message}</p>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="dt-label">Password</label>
                <a href="#" className="text-[10px] text-red-500/60 hover:text-red-500 font-bold uppercase tracking-wider transition-colors dt-mono">Forgot?</a>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={`dt-input-custom pr-12 ${errors.password ? "error" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/20 hover:text-white/40 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="dt-error-text">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="dt-submit-btn"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </span>
              ) : "Sign In →"}
            </button>

            <p className="text-center text-sm text-white/30 pt-2 font-sans">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-red-500/80 hover:text-red-500 font-bold transition-colors">Create one</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
