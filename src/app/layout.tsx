import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    default: "Tereto — Women and Youths in Agric-Food Systems",
    template: "%s | Tereto",
  },
  description:
    "Tereto supports women and youth in agric-food systems through inclusive interventions.",
  icons: {
    icon: "/icon.svg",       // ✅ Browser tab favicon
    shortcut: "/icon.png",   // ✅ Legacy support
    apple: "/icon.png",      // ✅ Apple / iOS devices
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#fbfbf9] text-black flex flex-col">
        <Navbar />

        {/* Page content */}
        <main className="flex-1">{children}</main>

        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
