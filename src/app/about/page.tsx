export default function AboutPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      {/* Page header */}
      <header className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold">About Tereto</h1>
        <p className="mt-4 text-base text-black/70">
          Women and Youths in Agric-Food Systems
        </p>
      </header>

      {/* Main content */}
      <section className="mx-auto mt-10 max-w-3xl space-y-6 text-black/80 leading-relaxed">
        <p>
          <strong>Tereto</strong> is a local language word which refers to the
          annual sales season, a crucial period in The Gambia’s agricultural
          economy when farmers sell their harvest.
        </p>

        <p>
          Tereto is a youth-led NGO working to promote women and youth engagement
          and employment in agriculture and food systems. Today’s young people
          live in a world facing a convergence of challenges, including food
          insecurity, unemployment, irregular migration, inequality, and climate
          change.
        </p>

        <p>
          Applied to agriculture and food systems, the meaningful engagement of
          women and youth is essential to securing the future of food. The
          agri-food sector holds a large, yet untapped, reservoir of employment
          opportunities capable of transforming lives and communities.
        </p>

        <p>
          Tereto recognizes the urgent need to transform The Gambia’s agriculture
          and food systems to make them more attractive and rewarding for young
          people. We believe that investing in youth yields boundless returns in
          food security, poverty reduction, employment creation, peace, and
          political stability.
        </p>

        <p>
          However, limited access to land, natural resources, infrastructure,
          finance, technology, knowledge, and fair remuneration continues to push
          young people away from agriculture. As a result, many feel compelled to
          migrate to urban areas or abroad.
        </p>

        <p>
          Tereto is committed to making the agri-food sector more attractive by
          strengthening capacities, supporting income generation, and advocating
          for systems, policies, and programmes that empower women and youth.
        </p>

        <p>
          The COVID-19 pandemic served as a stark reminder of the fragility of
          global food systems and the urgency for young people to take ownership
          of agricultural production to secure The Gambia’s food future.
        </p>
      </section>

      {/* Vision / Mission / Values */}
      <section className="mx-auto mt-14 max-w-5xl">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Vision",
              text: "By 2036, half of the country’s women and youth actively engage in The Gambia’s agriculture and food systems.",
            },
            {
              title: "Mission",
              text: "Promoting women and youth engagement and employment in agriculture and food systems.",
            },
            {
              title: "Values",
              text: "Integrity, inclusion, sustainability, and impact.",
            },
          ].map((x) => (
            <div
              key={x.title}
              className="rounded-2xl border bg-white p-6 shadow-sm"
            >
              <h3 className="text-lg font-semibold">{x.title}</h3>
              <p className="mt-2 text-sm text-black/70">{x.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
