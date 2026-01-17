"use client";

import { useState } from "react";
import CoverUploader from "./CoverUploader";

export default function CoverImageEditField({ initialUrl }: { initialUrl: string }) {
  const [url, setUrl] = useState(initialUrl);

  return (
    <>
      <input type="hidden" name="coverImage" value={url} />
      <CoverUploader value={url} onChange={setUrl} />
    </>
  );
}
