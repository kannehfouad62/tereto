import { HeroSlider } from "@/components/site/HeroSlider";

export default function HomePage() {
  return (
    <main>
      <HeroSlider />

      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { title: "Capacity Building", text: "Training, mentorship, and enterprise support." },
            { title: "Market Access", text: "Linking producers to buyers and value chains." },
            { title: "Climate-Smart Agriculture", text: "Resilience, innovation, and sustainability." },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <div className="text-sm font-semibold text-tereto-brown">Tereto Focus</div>
              <div className="mt-2 text-xl font-semibold">{c.title}</div>
              <p className="mt-2 text-sm text-black/70">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-tereto-green p-10 text-white">
          <div className="text-2xl font-bold">Our Mission</div>
          <p className="mt-2 max-w-3xl text-white/90">
          Promoting Women and Youth Engagement and Employment in Agriculture and Food Systems.
          </p>
        </div>
      </section>
    </main>
  );
}
