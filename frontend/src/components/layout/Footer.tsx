import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-bisharod-navy border-t border-bisharod-teal/15">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Logo + Tagline */}
        <div className="flex flex-col gap-3">
          <img src="logo.png" alt="Bisharod" />
          <div className="text-white/40 text-xs">
            <p>Digital Health Data Services · FHIR-native</p>
            <p className="mt-2">© {new Date().getFullYear()} Bisharod</p>
          </div>
          {/* Copyright ✅ aligned right */}
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2">
          <p className="text-white/60 text-xs uppercase tracking-wider mb-1">
            Navigation
          </p>

          <Link
            to="/services"
            className="text-white/40 hover:text-bisharod-teal-light text-xs"
          >
            Services
          </Link>
          <Link
            to="/portal"
            className="text-white/40 hover:text-bisharod-teal-light text-xs"
          >
            Portal
          </Link>
          <Link
            to="/login"
            className="text-white/40 hover:text-bisharod-teal-light text-xs"
          >
            Sign In
          </Link>
        </div>

        {/* Contact ✅ FIXED ALIGNMENT */}
        <div className="flex flex-col gap-2 text-xs text-white/40">
          <p className="text-white/60 uppercase tracking-wider mb-1">Contact</p>

          <p>
            7533 S Center View Ct Ste N<br />
            West Jordan, UT 84084
          </p>

          <p>Phone: 385-363-3541</p>
        </div>
      </div>
    </footer>
  );
}
