// src/app/press/dashboard/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { requireEditor } from "@/lib/authz";
import TrashActions from "@/components/press/TrashActions";
import SoftDeleteButton from "@/components/press/SoftDeleteButton";

export default async function PressDashboardPage({
  searchParams,
}: {
  searchParams: { tab?: string };
}) {
  const gate = await requireEditor();
  if (!gate.ok) redirect("/press/login");

  const tab = searchParams.tab === "trash" ? "trash" : "posts";

  const whereBase = gate.role === "CONTRIBUTOR" ? { authorId: gate.uid } : {};
  const where =
    tab === "trash"
      ? { ...whereBase, deletedAt: { not: null } }
      : { ...whereBase, deletedAt: null };

  const posts = await prisma.post.findMany({
    where,
    orderBy: { updatedAt: "desc" },
    take: 50,
  });

  return (
    <main className="mx-auto max-w-6xl px-4 py-14">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Press Dashboard</h1>
          <p className="mt-2 text-black/70">
            {gate.role === "ADMIN"
              ? "Admin: manage all posts, trash, restore, and permanent delete."
              : "Contributor: manage your posts only."}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/press/dashboard?tab=posts"
            className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
              tab === "posts" ? "bg-black text-white" : "bg-white"
            }`}
          >
            Posts
          </Link>

          <Link
            href="/press/dashboard?tab=trash"
            className={`rounded-xl border px-4 py-2 text-sm font-semibold ${
              tab === "trash" ? "bg-black text-white" : "bg-white"
            }`}
          >
            Trash
          </Link>

          <Link
            href="/press/new"
            className="rounded-xl bg-tereto-brown px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
          >
            New Post
          </Link>
        </div>
      </div>

      <div className="mt-10 overflow-hidden rounded-2xl border bg-white">
        <div className="grid grid-cols-12 gap-2 border-b px-4 py-3 text-xs font-semibold text-black/60">
          <div className="col-span-6">Title</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-2">Updated</div>
          <div className="col-span-2 text-right">Action</div>
        </div>

        {posts.length === 0 ? (
          <div className="px-4 py-10 text-center text-sm text-black/60">
            {tab === "trash" ? "Trash is empty." : "No posts yet. Click New Post to create one."}
          </div>
        ) : (
          posts.map((p) => (
            <div
              key={p.id}
              className="grid grid-cols-12 items-center gap-2 border-b px-4 py-3 text-sm last:border-b-0"
            >
              <div className="col-span-6 font-medium">{p.title}</div>
              <div className="col-span-2">{p.status}</div>
              <div className="col-span-2">{new Date(p.updatedAt).toLocaleDateString()}</div>

              <div className="col-span-2 flex justify-end gap-2">
                {tab === "posts" ? (
                  <>
                    <Link
                      className="font-semibold text-tereto-green hover:underline"
                      href={`/press/edit/${p.id}`}
                    >
                      Edit
                    </Link>

                    {gate.role === "ADMIN" && <SoftDeleteButton postId={p.id} />}
                  </>
                ) : (
                  gate.role === "ADMIN" && <TrashActions postId={p.id} />
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
