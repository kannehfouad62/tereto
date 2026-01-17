import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative border-t bg-white">
      {/* If any overlay/background exists, it will never block clicks */}
      <div className="pointer-events-none absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="text-lg font-semibold">Tereto</div>
            <p className="mt-2 text-sm text-black/70">
              Women and Youths in Agric-Food Systems. Building resilient
              communities through sustainable agriculture, skills, and inclusive
              value chains.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link className="inline-block hover:underline" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="inline-block hover:underline" href="/interventions">
                  Interventions
                </Link>
              </li>
              <li>
                <Link className="inline-block hover:underline" href="/projects">
                  Projects
                </Link>
              </li>
              <li>
                <Link className="inline-block hover:underline" href="/press">
                  Press
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="font-semibold">Contact</div>
            <p className="mt-2 text-sm text-black/70">
              Email:{" "}
              <a className="hover:underline" href="mailto:info@tereto.org">
                info@tereto.org
              </a>
              <br />
              Phone: + (220) 733-3301 <br />
              Location: Jambanjelly, West Coast Region, The Gambia
            </p>
          </div>
        </div>

        <div className="mt-8 text-xs text-black/50">
          © {new Date().getFullYear()} Tereto. All rights reserved | Developed by fouadkanneh.com
        </div>
      </div>
    </footer>
  );
}
