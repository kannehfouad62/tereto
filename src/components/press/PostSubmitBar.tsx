"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import PreviewDialogButton from "@/components/press/PreviewDialogButton";

export default function PostSubmitBar({
  getFormData,
  action,
  showPreview = true,
}: {
  getFormData: () => FormData;
  action: (fd: FormData) => Promise<{ ok: boolean; message: string; redirectTo?: string }>;
  showPreview?: boolean;
}) {
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function submit() {
    const fd = getFormData(); // ✅ only when clicking Save

    startTransition(async () => {
      const res = await action(fd);

      if (!res.ok) {
        toast({ title: "Error", description: res.message, variant: "destructive" });
        return;
      }

      toast({ title: "Success", description: res.message });
      if (res.redirectTo) router.push(res.redirectTo);
      router.refresh();
    });
  }

  return (
    <div className="flex flex-wrap items-center justify-end gap-2">
      {showPreview && <PreviewDialogButton getFormData={getFormData} disabled={pending} />}

      <Button type="button" onClick={submit} disabled={pending}>
        {pending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}
