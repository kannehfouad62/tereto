"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function PressLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleLogin() {
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (res?.error) {
      setError("Invalid email or password");
      return;
    }

    // Successful login → go to dashboard
    window.location.href = "/press/dashboard";
  }

  return (
    <main className="mx-auto max-w-md px-4 py-14">
      <h1 className="text-3xl font-bold">Press Login</h1>
      <p className="mt-2 text-black/70">
        Admins and contributors can post news and blogs.
      </p>

      <div className="mt-8 space-y-4 rounded-2xl border bg-white p-6 shadow-sm">
        {error && (
          <div className="rounded-xl bg-red-50 px-4 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <input
          type="email"
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          className="w-full rounded-xl border px-4 py-3"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full rounded-xl bg-tereto-green px-5 py-3 text-sm font-semibold text-white hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>
    </main>
  );
}
