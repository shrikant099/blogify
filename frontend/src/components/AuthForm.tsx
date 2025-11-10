"use client";

import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import axios from "axios";
import { auth, BaseUrl } from "@/apiEndpoints";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserData } from "@/features/userSlice";
type AuthMode = "login" | "signup";

interface AuthFormProps {
  mode: AuthMode;
  className?: string;
}

export function AuthForm({ mode, className }: AuthFormProps) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [message, setMessage] = React.useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);

  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const title = mode === "login" ? "Welcome back" : "Create your account";
  const desc =
    mode === "login"
      ? "Sign in to continue to Blogify."
      : "Join Blogify and start sharing your stories.";
  const cta = mode === "login" ? "Sign in" : "Create account";

  function validate(): string | null {
    if (!email || !/^\S+@\S+\.\S+$/.test(email))
      return "Please enter a valid email address.";
    if (mode === "signup" && name.trim().length < 2)
      return "Name must be at least 2 characters.";
    if (!password || password.length < 6)
      return "Password must be at least 6 characters.";
    if (mode === "signup" && password !== confirm)
      return "Passwords do not match.";
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }

    try {
      setLoading(true);

      let res;

      if (mode === "signup") {
        // Signup API call
        res = await axios.post(
          `${BaseUrl}${auth.cerateUser}`,
          {
            name: name.trim(),
            email: email.trim(),
            password,
          },
          { withCredentials: true }
        );
        toast.success(
          res.data.message || "Registration successful! Please sign in."
        );
        console.log("SignUp data: ", res.data);
        navigate("/signin");
      } else {
        // Login API call
        res = await axios.post(
          `${BaseUrl}${auth.loginUser}`,
          {
            email: email.trim(),
            password,
          },
          { withCredentials: true }
        );
        toast.success(res.data.message || "Login successful!");
        dispatch(setUserData(res.data?.data));
        navigate("/");
      }

      if (!res.data.success) {
        toast.error(res.data.message || "Something went wrong!");
        throw new Error(res.data.message);
      }

      setMessage({ type: "success", text: res.data.message });

      setEmail("");
      setPassword("");
      setName("");
      setConfirm("");
    } catch (error: any) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          error.message ||
          "Something went wrong. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card
      className={cn("bg-card text-card-foreground border-border", className)}
    >
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl md:text-3xl text-balance">
          {title}
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          {desc}
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                placeholder="Alex Writer"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
          )}

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "login" ? "current-password" : "new-password"
              }
              required
            />
          </div>

          {mode === "signup" && (
            <div className="grid gap-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="••••••••"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                autoComplete="new-password"
                required
              />
            </div>
          )}

          {message && (
            <div
              role="status"
              aria-live="polite"
              className={cn(
                "rounded-md px-3 py-2 text-sm",
                message.type === "error"
                  ? "bg-destructive/10 text-destructive-foreground"
                  : "bg-secondary text-secondary-foreground"
              )}
            >
              {message.text}
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading
              ? mode === "login"
                ? "Signing in..."
                : "Creating..."
              : cta}
          </Button>

          {mode === "login" && (
            <>
              <div className="relative my-2">
                <span className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </span>
                <span className="relative bg-card px-2 text-xs text-muted-foreground">
                  or
                </span>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full cursor-pointer bg-transparent"
                aria-label="Continue with Google"
              >
                <FaGoogle />
                Continue with Google
              </Button>
            </>
          )}
        </form>
      </CardContent>

      <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
        {mode === "login" ? (
          <>
            <span>New to Blogify?</span>
            <Link
              to="/signup"
              className="text-primary hover:underline underline-offset-4"
              aria-label="Create an account"
            >
              Create an account
            </Link>
          </>
        ) : (
          <>
            <span>Already have an account?</span>
            <Link
              to="/signin"
              className="text-primary hover:underline underline-offset-4"
              aria-label="Sign in to your account"
            >
              Sign in
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
