"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { softDeletePostAction } from "@/lib/posts/actions";

export default function SoftDeleteButton({ postId }: { postId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  return (
    <Button
      type="button"
      variant="destructive"
      size="sm"
      className="h-8"
      disabled={pending}
      onClick={() => {
        startTransition(async () => {
          const fd = new FormData();
          fd.set("id", postId);
          const res = await softDeletePostAction(fd);

          if (!res.ok) {
            toast({ title: "Error", description: res.message, variant: "destructive" });
            return;
          }

          toast({ title: "Moved to Trash", description: res.message });
          router.push(res.redirectTo ?? "/press/dashboard?tab=trash");
          router.refresh();
        });
      }}
    >
      {pending ? "Moving..." : "Trash"}
    </Button>
  );
}
