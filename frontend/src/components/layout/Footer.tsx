import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-bisharod-navy border-t border-bisharod-teal/15">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Logo */}
        <div className="flex flex-col gap-3">
          <img
            src="logo.png"
            alt="Bisharod"
            className="h-8 w-auto opacity-80"
          />
          <p className="text-white/30 text-xs">
            Digital Health Data Services · FHIR-native
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-3">
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

        {/* Contact Info ✅ NEW */}
        <div className="text-xs text-white/40">
          <p className="text-white/60 mb-2 uppercase tracking-wider">
            Contact
          </p>

          <p>
            7533 S Center View Ct Ste N<br />
            West Jordan, UT 84084
          </p>

          <p className="mt-2">
            Phone: 385-363-3541
          </p>
        </div>

        {/* Copyright */}
        <div className="text-xs text-white/25 flex items-end">
          © {new Date().getFullYear()} Bisharod
        </div>

      </div>
    </footer>
  );
}
