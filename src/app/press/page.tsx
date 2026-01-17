// src/app/press/page.tsx
import Link from "next/link";
import { prisma } from "@/lib/db/prisma";

export const revalidate = 0; // ✅ always fresh (prevents deleted posts from lingering)

export default async function PressPage() {
  const posts = await prisma.post.findMany({
    where: {
      status: "PUBLISHED",
      deletedAt: null, // ✅ hide soft-deleted posts
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: 50,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      coverImage: true,
      publishedAt: true,
      updatedAt: true,
    },
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Press</h1>
          <p className="mt-2 text-black/70">
            News, updates, and stories from Tereto — Women and Youths in
            Agric-Food Systems.
          </p>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="mt-10 rounded-2xl border bg-white p-10 text-center text-sm text-black/60">
          No published posts yet.
        </div>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <Link
              key={p.id}
              href={`/press/${p.slug}`}
              className="group overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-md"
            >
              {p.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.coverImage}
                  alt=""
                  className="h-44 w-full object-cover transition group-hover:scale-[1.02]"
                />
              ) : (
                <div className="flex h-44 items-center justify-center bg-black/5 text-sm text-black/40">
                  No cover image
                </div>
              )}

              <div className="p-5">
                <div className="text-xs text-black/50">
                  {(p.publishedAt ?? p.updatedAt).toLocaleDateString()}
                </div>

                <h2 className="mt-2 line-clamp-2 text-lg font-semibold">
                  {p.title}
                </h2>

                {p.excerpt ? (
                  <p className="mt-2 line-clamp-3 text-sm text-black/70">
                    {p.excerpt}
                  </p>
                ) : (
                  <p className="mt-2 line-clamp-3 text-sm text-black/50">
                    Read more…
                  </p>
                )}

                <div className="mt-4 text-sm font-semibold text-tereto-green">
                  Read post →
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
