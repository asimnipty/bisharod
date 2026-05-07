import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-bisharod-navy border-t border-bisharod-teal/15">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="logo.png"
            alt="Bisharod"
            className="h-8 w-auto opacity-80"
          />
          <p className="text-white/30 text-xs">
            Digital Health Data Services · FHIR-native
          </p>
        </div>

        <nav className="flex gap-6">
          {[
            { to: "/services", label: "Services" },
            { to: "/portal", label: "Portal" },
            { to: "/login", label: "Sign In" },
          ].map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className="text-xs text-white/40 hover:text-bisharod-teal-light uppercase tracking-widest transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        <p className="text-white/25 text-xs">
          © {new Date().getFullYear()} Bisharod
        </p>
      </div>
    </footer>
  );
}
