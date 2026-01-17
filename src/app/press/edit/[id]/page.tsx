// src/app/press/edit/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { requireEditor } from "@/lib/authz";
import EditPostFormClient from "@/components/press/EditPostFormClient";

export default async function EditPostPage(props: {
  params: Promise<{ id?: string }>;
}) {
  const gate = await requireEditor();
  if (!gate.ok) redirect("/press/login");

  const { id } = await props.params;
  if (!id) return notFound();

  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return notFound();

  // ✅ Contributors can only edit their own posts
  if (gate.role === "CONTRIBUTOR" && post.authorId !== gate.uid) {
    redirect("/press/dashboard");
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold">Edit Post</h1>

      <EditPostFormClient post={post} />
    </main>
  );
}
