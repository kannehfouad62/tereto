// src/components/press/CoverImageField.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type SignResponse = {
  timestamp: number;
  signature: string;
  apiKey: string;
  cloudName: string;
  folder?: string;
};

export default function CoverImageField({
  initialUrl = "",
}: {
  initialUrl?: string;
}) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [url, setUrl] = useState<string>(initialUrl);

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    setUrl(initialUrl || "");
  }, [initialUrl]);

  function openPicker() {
    if (!uploading) fileRef.current?.click();
  }

  async function signUpload() {
    const signRes = await fetch("/api/cloudinary/sign", { method: "POST" });
    if (!signRes.ok) {
      const errText = await signRes.text();
      console.error("Sign route error:", errText);
      throw new Error("Failed to sign upload");
    }
    return (await signRes.json()) as SignResponse;
  }

  function uploadWithProgress(file: File, signed: SignResponse) {
    return new Promise<string>((resolve, reject) => {
      const endpoint = `https://api.cloudinary.com/v1_1/${signed.cloudName}/image/upload`;

      const form = new FormData();
      form.append("file", file);
      form.append("api_key", signed.apiKey);
      form.append("timestamp", String(signed.timestamp));
      form.append("signature", signed.signature);
      if (signed.folder) form.append("folder", signed.folder);

      const xhr = new XMLHttpRequest();
      xhr.open("POST", endpoint);

      xhr.upload.onprogress = (evt) => {
        if (!evt.lengthComputable) return;
        const pct = Math.round((evt.loaded / evt.total) * 100);
        setProgress(pct);
      };

      xhr.onload = () => {
        try {
          // Cloudinary returns JSON even on errors; handle both
          const text = xhr.responseText || "";
          const json = text ? JSON.parse(text) : {};

          if (xhr.status < 200 || xhr.status >= 300) {
            console.error("Cloudinary error:", text);
            reject(new Error(json?.error?.message || "Cloudinary upload failed"));
            return;
          }

          const secureUrl = json?.secure_url as string | undefined;
          if (!secureUrl) {
            console.error("Cloudinary response missing secure_url:", json);
            reject(new Error("Upload missing secure_url"));
            return;
          }

          resolve(secureUrl);
        } catch (e) {
          reject(e);
        }
      };

      xhr.onerror = () => {
        reject(new Error("Network error during upload"));
      };

      xhr.onabort = () => {
        reject(new Error("Upload aborted"));
      };

      xhr.send(form);
    });
  }

  async function handleFile(file: File) {
    setUploading(true);
    setProgress(0);

    try {
      const signed = await signUpload();
      const secureUrl = await uploadWithProgress(file, signed);
      setUrl(secureUrl);
      setProgress(100);
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Upload failed. Check console."
      );
    } finally {
      // small UX: keep 100% visible briefly, then reset
      setTimeout(() => {
        setUploading(false);
        setProgress(0);
      }, 400);
    }
  }

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <div className="text-sm font-semibold">Cover image</div>
          <div className="text-xs text-black/60">
            Upload a cover image (optional). This appears on the Press list and
            post page.
          </div>
        </div>

        <div className="flex items-center gap-2">
          {url ? (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setUrl("")}
              disabled={uploading}
            >
              Remove
            </Button>
          ) : null}

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openPicker}
            disabled={uploading}
          >
            {uploading ? `Uploading… ${progress}%` : url ? "Replace" : "Upload"}
          </Button>
        </div>
      </div>

      {/* Hidden input for server action */}
      <input type="hidden" name="coverImage" value={url} />

      {/* Hidden file picker */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const input = e.currentTarget;
          const file = input.files?.[0];
          if (!file) return;

          // clear immediately so user can reselect same file
          input.value = "";

          void handleFile(file);
        }}
      />

      {uploading ? (
        <div className="rounded-2xl border bg-white p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium">Uploading cover image…</span>
            <span className="text-black/70">{progress}%</span>
          </div>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-black/10">
            <div
              className="h-full rounded-full bg-black transition-[width]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : url ? (
        <div className="overflow-hidden rounded-2xl border bg-black/5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={url} alt="" className="h-56 w-full object-cover" />
        </div>
      ) : (
        <div className="rounded-2xl border bg-white p-6 text-sm text-black/60">
          No cover image selected.
        </div>
      )}
    </section>
  );
}
