// src/app/contact/page.tsx
import ContactFormClient from "@/components/contact/ContactFormClient";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold">Contact Us</h1>
          <p className="mt-3 text-black/70">
            Have a question, partnership idea, or want to learn more about
            Tereto’s work? Send us a message.
          </p>

          <div className="mt-8 space-y-3 rounded-2xl border bg-white p-6">
            <div className="text-sm font-semibold">Tereto</div>
            <div className="text-sm text-black/70">
              Women and Youths in Agric-Food Systems
            </div>

            <div className="pt-2 text-sm text-black/70">
              Email:{" "}
              <a className="hover:underline" href="mailto:info@tereto.org">
                info@tereto.org
              </a>
              <br />
              Location: Jambanjelly, West Coast Region, The Gambia 
            </div>
          </div>
        </div>

        <div>
          <ContactFormClient />
        </div>
      </div>
    </main>
  );
}
