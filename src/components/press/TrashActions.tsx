"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { hardDeletePostAction, restorePostAction } from "@/lib/posts/actions";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function TrashActions({ postId }: { postId: string }) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function restore() {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("id", postId);
      const res = await restorePostAction(fd);

      if (!res.ok) {
        toast({ title: "Error", description: res.message, variant: "destructive" });
        return;
      }

      toast({ title: "Restored", description: res.message });
      router.push(res.redirectTo ?? "/press/dashboard");
      router.refresh();
    });
  }

  function hardDelete() {
    startTransition(async () => {
      const fd = new FormData();
      fd.set("id", postId);
      const res = await hardDeletePostAction(fd);

      if (!res.ok) {
        toast({ title: "Error", description: res.message, variant: "destructive" });
        return;
      }

      toast({ title: "Deleted", description: res.message });
      router.push(res.redirectTo ?? "/press/dashboard?tab=trash");
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Button type="button" variant="outline" size="sm" className="h-8" disabled={pending} onClick={restore}>
        Restore
      </Button>

      <Dialog>
        <DialogTrigger asChild>
          <Button type="button" variant="destructive" size="sm" className="h-8" disabled={pending}>
            Delete
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Permanently delete?</DialogTitle>
            <DialogDescription>
              This will permanently delete the post. If it has a Cloudinary cover image, it will also be deleted.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="button" variant="destructive" disabled={pending} onClick={hardDelete}>
              {pending ? "Deleting..." : "Yes, delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
