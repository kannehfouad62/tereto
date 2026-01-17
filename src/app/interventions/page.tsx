export default function InterventionsPage() {
    const items = [
      { title: "Inclusive Pathways to Agricultural Employment", desc: "Provide an enabling environment for Women and Youth engagement and employment in agriculture and food systems." },
      { title: "Dignified and Rewarding Livelihoods", desc: "Secure, dignified, attractive, and rewarding livelihoods for Women and Youth." },
      { title: "Equitable Access to Resources and Markets", desc: "Increase equitable access of Women and Youth to resources, infrastructure, and markets." },
      { title: "Skills, Knowledge, and Opportunity", desc: "Enhance equitable access to knowledge, education, and skills of Women and Youth." },
      { title: "Innovation for Inclusive Growth", desc: "Foster sustainable and inclusive innovations for Women and Youth." },
    ];
  
    return (
      <main className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-bold">Our 5-Point Call to Action </h1>
        <p className="mt-4 max-w-3xl text-black/70">
          We design interventions that move people from skills to income to resilience.
        </p>
  
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {items.map((i) => (
            <div key={i.title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-xl font-semibold">{i.title}</div>
              <p className="mt-2 text-sm text-black/70">{i.desc}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }
  