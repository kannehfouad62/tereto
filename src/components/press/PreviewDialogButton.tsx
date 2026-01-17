"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PreviewData = {
  title: string;
  excerpt: string;
  coverImage: string;
  content: string;
};

export default function PreviewDialogButton({
  getFormData,
  disabled,
}: {
  getFormData: () => FormData;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<PreviewData>({
    title: "",
    excerpt: "",
    coverImage: "",
    content: "",
  });

  function loadPreview() {
    const fd = getFormData(); // ✅ called only on click (not render)
    setData({
      title: String(fd.get("title") || ""),
      excerpt: String(fd.get("excerpt") || ""),
      coverImage: String(fd.get("coverImage") || ""),
      content: String(fd.get("content") || ""),
    });
    setOpen(true);
  }

  const title = data.title || "Untitled post";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button type="button" variant="outline" disabled={disabled} onClick={loadPreview}>
        Preview
      </Button>

      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Preview</DialogTitle>
          <DialogDescription>How your post will look on the Press page.</DialogDescription>
        </DialogHeader>

        <article className="prose max-w-none">
          {data.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.coverImage}
              alt=""
              className="w-full rounded-xl object-cover"
            />
          ) : null}

          <h1 className="mt-4">{title}</h1>
          {data.excerpt ? <p className="text-black/70">{data.excerpt}</p> : null}

          <div
            dangerouslySetInnerHTML={{
              __html: data.content || "<p>(No content)</p>",
            }}
          />
        </article>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
