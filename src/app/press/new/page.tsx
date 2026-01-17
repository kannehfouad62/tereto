// src/app/press/new/page.tsx
import { redirect } from "next/navigation";
import { requireEditor } from "@/lib/authz";
import NewPostFormClient from "@/components/press/NewPostFormClient";

export default async function NewPostPage() {
  const gate = await requireEditor();
  if (!gate.ok) redirect("/press/login");

  return (
    <main className="mx-auto max-w-3xl px-4 py-14">
      <h1 className="text-3xl font-bold">New Post</h1>
      <p className="mt-2 text-black/70">
        Create a new press post. You can upload a cover image, preview, and then
        publish when ready.
      </p>

      {/* ✅ Client form handles create + toast + preview */}
      <NewPostFormClient />
    </main>
  );
}
