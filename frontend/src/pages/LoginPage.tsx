import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock, Mail, AlertCircle } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

// Basic static credentials — swap handleSubmit for a real API call when DB auth is ready
const STATIC_USERS = [
  {
    email: "admin@bisharod.com",
    password: "bisharod2026",
    name: "Admin",
    role: "admin" as const,
  },
  {
    email: "editor@bisharod.com",
    password: "editor2026",
    name: "Editor",
    role: "clinician" as const,
  },
];

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500));

    const match = STATIC_USERS.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password,
    );

    if (match) {
      login({
        id: match.email,
        name: match.name,
        email: match.email,
        role: match.role,
      });
      navigate("/portal");
    } else {
      setError("Invalid email or password.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bisharod-navy flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <Link to="/">
            <img src="/logo.png" alt="Bisharod" className="h-12 mx-auto mb-6" />
          </Link>
          <h1 className="font-display text-2xl text-white mb-1">
            Authorized Access
          </h1>
          <p className="text-white/40 text-sm">
            Sign in to the Bisharod data portal
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white/[0.04] border border-bisharod-teal/20 rounded-xl p-8 space-y-5"
        >
          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
              Email
            </label>
            <div className="relative">
              <Mail
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@bisharod.com"
                required
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-bisharod-teal transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/60 uppercase tracking-widest mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                size={14}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-9 pr-4 py-2.5 bg-white/5 border border-white/15 rounded-lg text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-bisharod-teal transition-colors"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-xs bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
              <AlertCircle size={13} /> {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-bisharod-teal text-bisharod-navy font-semibold text-sm rounded-lg hover:bg-bisharod-teal-light transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p className="text-center text-white/25 text-xs pt-1">
            SMART on FHIR · OAuth 2.0 secured
          </p>
        </form>
      </div>
    </div>
  );
}
