import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, LayoutDashboard } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/services", label: "Services" },
    { to: "/about", label: "About" },
    { to: "/blog", label: "Blog" },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-bisharod-navy/95 backdrop-blur border-b border-bisharod-teal/20">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <img src="logo.png" alt="Bisharod" className="h-12 w-auto" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              className={({ isActive }) =>
                `text-sm font-medium tracking-wide transition-colors ${
                  isActive
                    ? "text-bisharod-teal-light"
                    : "text-white/60 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Auth actions */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <>
              <Link
                to="/portal"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-bisharod-teal-light transition-colors"
              >
                <LayoutDashboard size={15} />
                Portal
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm text-white/50 hover:text-white/80 transition-colors"
              >
                <LogOut size={14} />
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded bg-bisharod-teal text-bisharod-navy text-sm font-semibold hover:bg-bisharod-teal-light transition-colors"
            >
              Sign In
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white/70"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-bisharod-navy border-t border-white/10 px-6 py-4 flex flex-col gap-4">
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-bisharod-teal-light" : "text-white/70"}`
              }
            >
              {label}
            </NavLink>
          ))}
          {user ? (
            <Link
              to="/portal"
              onClick={() => setOpen(false)}
              className="text-sm text-bisharod-teal-light"
            >
              Portal
            </Link>
          ) : (
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="text-sm text-bisharod-teal"
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
