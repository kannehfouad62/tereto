// src/lib/cloudinaryDelete.ts
import { cloudinary } from "@/lib/cloudinary";

/**
 * Extract Cloudinary public_id from a secure_url.
 * Works for URLs like:
 * https://res.cloudinary.com/<cloud>/image/upload/v123/tereto/press/file.jpg
 */
export function cloudinaryPublicIdFromUrl(url: string): string | null {
  try {
    const u = new URL(url);
    const parts = u.pathname.split("/");

    // Find "upload" segment
    const uploadIndex = parts.findIndex((p) => p === "upload");
    if (uploadIndex === -1) return null;

    // Everything after upload/ is: (optional) v123/ + public_id.ext OR transforms + v123 + public_id.ext
    const afterUpload = parts.slice(uploadIndex + 1);

    // Remove version segment if present (v123...)
    const withoutVersion =
      afterUpload[0]?.startsWith("v") && /^\d+$/.test(afterUpload[0].slice(1))
        ? afterUpload.slice(1)
        : afterUpload;

    if (withoutVersion.length === 0) return null;

    // Join remaining as path and strip extension
    const full = withoutVersion.join("/");
    const lastDot = full.lastIndexOf(".");
    if (lastDot === -1) return full;

    return full.slice(0, lastDot);
  } catch {
    return null;
  }
}

export async function deleteCloudinaryByUrl(url?: string | null) {
  if (!url) return;

  const publicId = cloudinaryPublicIdFromUrl(url);
  if (!publicId) return;

  // If image already deleted or doesn't exist, Cloudinary returns "not found"
  // We ignore errors here to keep UX smooth.
  try {
    await cloudinary.uploader.destroy(publicId, { invalidate: true });
  } catch {
    // swallow
  }
}
