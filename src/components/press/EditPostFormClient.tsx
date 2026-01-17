"use client";

import { useRef } from "react";
import CoverImageField from "@/components/press/CoverImageField";
import PostSubmitBar from "@/components/press/PostSubmitBar";
import { updatePostAction } from "@/lib/posts/actions";

export default function EditPostFormClient({
  post,
}: {
  post: {
    id: string;
    title: string;
    slug: string;
    excerpt: string | null;
    content: string;
    status: string;
    coverImage: string | null;
  };
}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  function getFormData() {
    return new FormData(formRef.current!);
  }

  return (
    <form
      ref={formRef}
      className="mt-8 space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <input type="hidden" name="id" value={post.id} />

      {/* Cover uploader + hidden coverImage input */}
      <CoverImageField initialUrl={post.coverImage ?? ""} />

      <input
        name="title"
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Title"
        defaultValue={post.title}
        required
      />

      <input
        name="slug"
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Slug"
        defaultValue={post.slug}
      />

      <input
        name="excerpt"
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Short excerpt"
        defaultValue={post.excerpt ?? ""}
      />

      <textarea
        name="content"
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Content (HTML allowed)"
        rows={10}
        defaultValue={post.content}
        required
      />

      <select
        name="status"
        className="w-full rounded-xl border px-4 py-3"
        defaultValue={post.status}
      >
        <option value="DRAFT">Draft</option>
        <option value="PUBLISHED">Published</option>
      </select>

      <PostSubmitBar getFormData={getFormData} action={updatePostAction} showPreview />
    </form>
  );
}
