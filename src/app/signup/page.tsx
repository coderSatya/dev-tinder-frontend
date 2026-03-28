"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Eye, EyeOff, UserPlus } from "lucide-react";
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

const signupSchema = yup.object({
  firstName: yup.string().min(2, "First name must be at least 2 characters").required("First name is required"),
  lastName: yup.string().min(2, "Last name must be at least 2 characters").required("Last name is required"),
  emailId: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
}).required();

export default function SignupPage() {
  const { mutate: signupUser, isPending } = useSignup();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupRequestData>({
    resolver: yupResolver(signupSchema) as any,
  });

  const onSubmit = (data: SignupRequestData) => {
    signupUser(data);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50/50 px-4 py-8">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-red-500 animate-in fade-in zoom-in-95 duration-500">
        <CardHeader className="space-y-1">
          <div className="mx-auto bg-red-100 p-3 rounded-full w-fit mb-2">
            <UserPlus className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-2xl text-center font-bold tracking-tight">Create an account</CardTitle>
          <CardDescription className="text-center">
            Join DevTinder and start matching with developers
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  {...register("firstName")}
                  className={errors.firstName ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 font-medium">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Doe"
                  {...register("lastName")}
                  className={errors.lastName ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.lastName && (
                  <p className="text-xs text-red-500 font-medium">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="emailId">Email</Label>
              <Input
                id="emailId"
                type="email"
                placeholder="john@example.com"
                {...register("emailId")}
                className={errors.emailId ? "border-red-500 focus-visible:ring-red-500" : ""}
              />
              {errors.emailId && (
                <p className="text-xs text-red-500 font-medium">{errors.emailId.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password")}
                  className={errors.password ? "border-red-500 pr-10 focus-visible:ring-red-500" : "pr-10"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-red-500 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 font-medium">{errors.password.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 font-bold transition-all py-6" disabled={isPending}>
              {isPending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Creating account...
                </div>
              ) : "Sign Up"}
            </Button>
          </form>
          
          <div className="mt-6 text-center text-sm">
            <span className="text-gray-500">Already have an account? </span>
            <Link href="/login" className="text-red-500 font-semibold hover:underline">
              Login here
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
