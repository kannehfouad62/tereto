// src/lib/posts/actions.ts
"use server";

import { prisma } from "@/lib/db/prisma";
import { requireAdmin, requireEditor } from "@/lib/authz";
import { revalidatePath } from "next/cache";
import { deleteCloudinaryByUrl } from "@/lib/cloudinaryDelete";

function normalizeSlug(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export type ActionResult =
  | { ok: true; message: string; redirectTo: string }
  | { ok: false; message: string };

export async function createPostAction(formData: FormData): Promise<ActionResult> {
  const gate = await requireEditor();
  if (!gate.ok) return { ok: false, message: "Unauthorized" };

  const title = String(formData.get("title") || "").trim();
  const slugRaw = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const status = String(formData.get("status") || "DRAFT");
  const coverImage = String(formData.get("coverImage") || "").trim();

  if (!title || !content) return { ok: false, message: "Title and content are required." };

  const slug = normalizeSlug(slugRaw || title);

  const existing = await prisma.post.findUnique({ where: { slug } });
  const finalSlug = existing ? `${slug}-${Date.now()}` : slug;

  await prisma.post.create({
    data: {
      title,
      slug: finalSlug,
      excerpt: excerpt || null,
      content,
      coverImage: coverImage || null,
      status: status as any,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      authorId: gate.uid,
      deletedAt: null,
    },
  });

  revalidatePath("/press");
  revalidatePath("/press/dashboard");

  return { ok: true, message: "Post saved successfully.", redirectTo: "/press/dashboard" };
}

export async function updatePostAction(formData: FormData): Promise<ActionResult> {
  const gate = await requireEditor();
  if (!gate.ok) return { ok: false, message: "Unauthorized" };

  const id = String(formData.get("id") || "").trim();
  const title = String(formData.get("title") || "").trim();
  const slugRaw = String(formData.get("slug") || "").trim();
  const excerpt = String(formData.get("excerpt") || "").trim();
  const content = String(formData.get("content") || "").trim();
  const status = String(formData.get("status") || "DRAFT");
  const coverImage = String(formData.get("coverImage") || "").trim();

  if (!id) return { ok: false, message: "Missing post id." };

  const existing = await prisma.post.findUnique({ where: { id } });
  if (!existing) return { ok: false, message: "Post not found." };

  if (gate.role === "CONTRIBUTOR" && existing.authorId !== gate.uid) {
    return { ok: false, message: "You can only edit your own posts." };
  }

  const slug = normalizeSlug(slugRaw || title);

  const conflict = await prisma.post.findFirst({
    where: { slug, NOT: { id } },
    select: { id: true },
  });
  const finalSlug = conflict ? `${slug}-${Date.now()}` : slug;

  const oldCover = existing.coverImage || null;
  const newCover = coverImage || null;

  await prisma.post.update({
    where: { id },
    data: {
      title,
      slug: finalSlug,
      excerpt: excerpt || null,
      content,
      coverImage: newCover,
      status: status as any,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
    },
  });

  if (oldCover && oldCover !== newCover) {
    await deleteCloudinaryByUrl(oldCover);
  }

  revalidatePath("/press");
  revalidatePath("/press/dashboard");

  return { ok: true, message: "Post updated successfully.", redirectTo: "/press/dashboard" };
}

/** Soft delete (Admin-only). Keeps DB row. */
export async function softDeletePostAction(formData: FormData): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return { ok: false, message: "Unauthorized" };

  const id = String(formData.get("id") || "").trim();
  if (!id) return { ok: false, message: "Missing post id." };

  await prisma.post.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  revalidatePath("/press");
  revalidatePath("/press/dashboard");

  return { ok: true, message: "Post moved to Trash.", redirectTo: "/press/dashboard?tab=trash" };
}

/** Restore (Admin-only) */
export async function restorePostAction(formData: FormData): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return { ok: false, message: "Unauthorized" };

  const id = String(formData.get("id") || "").trim();
  if (!id) return { ok: false, message: "Missing post id." };

  await prisma.post.update({
    where: { id },
    data: { deletedAt: null },
  });

  revalidatePath("/press");
  revalidatePath("/press/dashboard");

  return { ok: true, message: "Post restored.", redirectTo: "/press/dashboard" };
}

/** Permanent delete (Admin-only) + Cloudinary cleanup */
export async function hardDeletePostAction(formData: FormData): Promise<ActionResult> {
  const gate = await requireAdmin();
  if (!gate.ok) return { ok: false, message: "Unauthorized" };

  const id = String(formData.get("id") || "").trim();
  if (!id) return { ok: false, message: "Missing post id." };

  const post = await prisma.post.findUnique({
    where: { id },
    select: { coverImage: true },
  });

  await prisma.post.delete({ where: { id } });

  if (post?.coverImage) {
    await deleteCloudinaryByUrl(post.coverImage);
  }

  revalidatePath("/press");
  revalidatePath("/press/dashboard");

  return { ok: true, message: "Post permanently deleted.", redirectTo: "/press/dashboard?tab=trash" };
}
