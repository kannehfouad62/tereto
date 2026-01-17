export default function ProjectsPage() {
    const projects = [
      { title: "Women & Youth Agribusiness Empowerment Project", status: "Active", location: "Region A" },
      { title: "Market Access & Resource Inclusion Project", status: "Active", location: "Region B" },
      { title: "Skills, Innovation & Sustainable Agriculture Project", status: "Active", location: "Region C" },
    ];
  
    return (
      <main className="mx-auto max-w-6xl px-4 py-14">
        <h1 className="text-3xl font-bold">Projects</h1>
        <p className="mt-4 max-w-3xl text-black/70">
          Explore Tereto projects and impact stories.
        </p>
  
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((p) => (
            <div key={p.title} className="rounded-2xl border bg-white p-6 shadow-sm">
              <div className="text-lg font-semibold">{p.title}</div>
              <div className="mt-2 text-sm text-black/70">
                <div><span className="font-semibold">Status:</span> {p.status}</div>
                <div><span className="font-semibold">Location:</span> {p.location}</div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }
  