"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/interventions", label: "Our Interventions" },
  { href: "/projects", label: "Projects" },
  { href: "/press", label: "Press" },
  { href: "/contact", label: "Contact Us" },
];

export function Navbar() {
  const pathname = usePathname();

  const linkClass = (href: string) => {
    const isActive =
      pathname === href || pathname.startsWith(href + "/");

    return [
      "text-sm font-medium transition-colors",
      isActive
        ? "text-tereto-brown font-semibold"
        : "text-black/70 hover:text-black",
    ].join(" ");
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Tereto Logo"
            className="h-10 w-auto object-contain"
          />
          <div className="leading-tight">
            <div className="font-semibold">Tereto</div>
            <div className="text-xs text-black/60">
              Women and Youths in Agric-Food Systems
            </div>
          </div>
        </Link>

        {/* Nav */}
        <nav className="hidden gap-6 md:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className={linkClass(n.href)}>
              {n.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/press/login"
          className="rounded-xl bg-tereto-brown px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
        >
          Press Login
        </Link>
      </div>
    </header>
  );
}
