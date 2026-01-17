// src/app/press/[slug]/page.tsx
import { notFound } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

export default async function PressPostPage(props: {
  params: Promise<{ slug?: string }>;
}) {
  const { slug } = await props.params;

  if (!slug) return notFound();

  const post = await prisma.post.findUnique({
    where: { slug },
  });

  // Only show published + not soft-deleted
  if (!post || post.status !== "PUBLISHED" || post.deletedAt) return notFound();

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      {post.coverImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={post.coverImage}
          alt=""
          className="w-full rounded-2xl object-cover"
        />
      ) : null}

      <h1 className="mt-6 text-3xl font-bold">{post.title}</h1>

      {post.excerpt ? (
        <p className="mt-2 text-black/70">{post.excerpt}</p>
      ) : null}

      <article
        className="prose mt-8 max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </main>
  );
}
