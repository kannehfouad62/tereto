// src/components/press/NewPostFormClient.tsx
"use client";

import { useRef } from "react";
import CoverImageField from "@/components/press/CoverImageField";
import PostSubmitBar from "@/components/press/PostSubmitBar";
import { createPostAction } from "@/lib/posts/actions";

export default function NewPostFormClient() {
  const formRef = useRef<HTMLFormElement | null>(null);

  function getFormData() {
    return new FormData(formRef.current!);
  }

  return (
    <form
      ref={formRef}
      className="mt-8 space-y-6 rounded-2xl border bg-white p-6 shadow-sm"
    >
      {/* ✅ Cover uploader + hidden coverImage input */}
      <CoverImageField />

      <input
        name="title"
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Title"
        required
      />

      <input
        name="slug"
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Slug (optional - auto-generated if empty)"
      />

      <input
        name="excerpt"
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Short excerpt (optional)"
      />

      <textarea
        name="content"
        className="w-full rounded-xl border px-4 py-3"
        placeholder="Content (HTML allowed)"
        rows={10}
        required
      />

      <select name="status" className="w-full rounded-xl border px-4 py-3">
        <option value="DRAFT">Draft</option>
        <option value="PUBLISHED">Published</option>
      </select>

      <PostSubmitBar getFormData={getFormData} action={createPostAction} showPreview />
    </form>
  );
}
