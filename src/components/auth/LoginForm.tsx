"use client";

import type React from "react";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  EyeIcon,
  EyeOffIcon,
  ArrowRight,
  LockKeyhole,
  Mail,
} from "lucide-react";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Auto-fill demo credentials
  const fillDemoCredentials = (
    role: "doctor" | "patient" | "admin" | "nurse" | "lab"
  ) => {
    if (role === "doctor") {
      setEmail("doctor@icare.com");
      setPassword("password");
    } else if (role === "patient") {
      setEmail("patient@icare.com");
      setPassword("password");
    } else if (role === "admin") {
      setEmail("admin@icare.com");
      setPassword("password");
    } else if (role === "nurse") {
      setEmail("nurse@icare.com");
      setPassword("password");
    } else if (role === "lab") {
      setEmail("lab@icare.com");
      setPassword("password");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    setLoading(true);

    try {
      const user = await login(email, password);
      toast.success("Login successful! Redirecting...");
      // Redirect based on user role
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "lab") {
        navigate("/lab");
      } else if (user.role === "nurse") {
        navigate("/nurse");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Invalid email or password");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-xl p-8 w-full max-w-md mx-auto animate-in shadow-xl bg-white/90 dark:bg-slate-800/90 backdrop-blur-md border border-slate-200/50 dark:border-slate-700/50">
      <div className="mb-8 text-center">
        <div className="inline-block p-3 rounded-full bg-primary/10 mb-4">
          <div className="text-3xl font-bold text-medical-blue">
            <span className="text-medical-light-blue">i</span>Care
          </div>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          Sign in to your healthcare portal
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email Address
          </Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300">
              <Mail className="h-5 w-5" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="example@icare.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="glass-input pl-10 h-11 bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <a
              href="#"
              className="text-xs font-medium text-medical-blue hover:text-medical-blue/80 transition-colors"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 dark:text-gray-300">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="glass-input pl-10 pr-10 h-11 bg-white/50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <input
              id="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-medical-blue focus:ring-medical-blue"
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-medical-blue to-medical-navy hover:from-medical-navy hover:to-medical-blue transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-medical-blue/20"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <ArrowRight className="h-4 w-4 animate-pulse" />}
        </Button>

        <div className="bg-blue-50 dark:bg-slate-800/80 p-4 rounded-lg border border-blue-100 dark:border-slate-700/50 mt-6">
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-3 font-medium">
            Demo Accounts:
          </p>
          <div className="grid grid-cols-5 gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
              onClick={() => fillDemoCredentials("doctor")}
            >
              Doctor
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
              onClick={() => fillDemoCredentials("patient")}
            >
              Patient
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
              onClick={() => fillDemoCredentials("admin")}
            >
              Admin
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
              onClick={() => fillDemoCredentials("nurse")}
            >
              Nurse
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
              onClick={() => fillDemoCredentials("lab")}
            >
              Lab
            </Button>
          </div>
        </div>

        <div className="relative text-center my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
          </div>
          <div className="relative">
            <span className="bg-white dark:bg-slate-800 px-4 text-xs text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <Button
            type="button"
            variant="outline"
            className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107
              0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.615 11.615 0 006.29 1.84"
              />
            </svg>
            Twitter
          </Button>
          <Button
            type="button"
            variant="outline"
            className="text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <svg
              className="h-5 w-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                clipRule="evenodd"
              />
            </svg>
            GitHub
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500 mt-6">
          Don't have an account?{" "}
          <a
            href="#"
            className="font-semibold text-medical-blue hover:text-medical-blue/80 transition-colors"
          >
            Sign up
          </a>
        </div>
      </form>
    </div>
  );
};
