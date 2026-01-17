"use client";

import { useTransition } from "react";

export default function DeletePostButton({
  postId,
  action,
}: {
  postId: string;
  action: (formData: FormData) => Promise<void>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <form
      action={(fd) => {
        const ok = window.confirm("Delete this post permanently?");
        if (!ok) return;

        startTransition(async () => {
          await action(fd);
        });
      }}
    >
      <input type="hidden" name="id" value={postId} />
      <button
        type="submit"
        className="font-semibold text-red-600 hover:underline disabled:opacity-60"
        disabled={pending}
      >
        {pending ? "Deleting..." : "Delete"}
      </button>
    </form>
  );
}
