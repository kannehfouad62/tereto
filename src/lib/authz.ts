// src/lib/authz.ts
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

export type Role = "ADMIN" | "CONTRIBUTOR" | "READER";

function getRole(session: unknown): Role | undefined {
  return (session as any)?.role as Role | undefined;
}

function getUid(session: unknown): string | undefined {
  return (session as any)?.uid as string | undefined;
}

export async function requireEditor() {
  const session = await getServerSession(authOptions);
  const role = getRole(session);
  const uid = getUid(session);

  if (!session || !uid || (role !== "ADMIN" && role !== "CONTRIBUTOR")) {
    return { ok: false as const };
  }

  return { ok: true as const, session, role, uid };
}

export async function requireAdmin() {
  const session = await getServerSession(authOptions);
  const role = getRole(session);
  const uid = getUid(session);

  if (!session || !uid || role !== "ADMIN") {
    return { ok: false as const };
  }

  return { ok: true as const, session, role, uid };
}
