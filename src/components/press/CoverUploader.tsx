"use client";

import Image from "next/image";
import { useState } from "react";

type Props = {
  value?: string;
  onChange: (url: string) => void;
};

export default function CoverUploader({ value, onChange }: Props) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | undefined>(value);

  async function upload(file: File) {
    setUploading(true);

    // 1) Get signature from our server (protected by role)
    const sigRes = await fetch("/api/cloudinary/sign", { method: "POST" });
    if (!sigRes.ok) {
      setUploading(false);
      alert("You must be logged in as Admin/Contributor to upload.");
      return;
    }

    const { timestamp, signature, folder, cloudName, apiKey } = await sigRes.json();

    // 2) Upload directly to Cloudinary
    const form = new FormData();
    form.append("file", file);
    form.append("api_key", apiKey);
    form.append("timestamp", String(timestamp));
    form.append("signature", signature);
    form.append("folder", folder);

    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body: form }
    );

    const json = await uploadRes.json();

    if (!uploadRes.ok) {
      console.error(json);
      alert("Upload failed. Check console for details.");
      setUploading(false);
      return;
    }

    const url = json.secure_url as string;
    setPreview(url);
    onChange(url);
    setUploading(false);
  }

  return (
    <div className="space-y-3">
      <div className="text-sm font-semibold text-black/70">Cover Image</div>

      <div className="rounded-2xl border bg-white p-4">
        {preview ? (
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl border">
            <Image
              src={preview}
              alt="Cover preview"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          </div>
        ) : (
          <div className="flex aspect-[16/9] items-center justify-center rounded-xl border bg-black/[0.02] text-sm text-black/50">
            No cover image yet
          </div>
        )}

        <div className="mt-4 flex items-center gap-3">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void upload(f);
            }}
            className="text-sm"
            disabled={uploading}
          />

          {uploading && (
            <span className="text-sm text-black/60">Uploading…</span>
          )}
        </div>

        <p className="mt-2 text-xs text-black/50">
          Recommended: 1600×900 (16:9). JPG/PNG/WebP.
        </p>
      </div>
    </div>
  );
}
