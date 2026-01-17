"use client";

import { useRef, useTransition } from "react";
import { submitContactAction } from "@/lib/contact/actions";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

export default function ContactFormClient() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [pending, startTransition] = useTransition();

  function submit() {
    const fd = new FormData(formRef.current!);

    startTransition(async () => {
      const res = await submitContactAction(fd);

      if (!res.ok) {
        toast({
          title: "Could not send",
          description: res.message,
          variant: "destructive",
        });
        return;
      }

      toast({ title: "Sent!", description: res.message });
      formRef.current?.reset();
    });
  }

  return (
    <form
      ref={formRef}
      className="rounded-2xl border bg-white p-6 shadow-sm space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div>
        <label className="text-sm font-medium">Name</label>
        <input
          name="name"
          className="mt-1 w-full rounded-xl border px-4 py-3"
          placeholder="Your name"
          required
          disabled={pending}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          name="email"
          type="email"
          className="mt-1 w-full rounded-xl border px-4 py-3"
          placeholder="you@example.com"
          required
          disabled={pending}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Subject (optional)</label>
        <input
          name="subject"
          className="mt-1 w-full rounded-xl border px-4 py-3"
          placeholder="Partnership / Question / Support"
          disabled={pending}
        />
      </div>

      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea
          name="message"
          className="mt-1 w-full rounded-xl border px-4 py-3"
          placeholder="Write your message..."
          rows={6}
          required
          disabled={pending}
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={pending}>
          {pending ? "Sending..." : "Send message"}
        </Button>
      </div>
    </form>
  );
}
