import { cookies } from "next/headers";

export async function isAdminRequest() {
  const cookieStore = await cookies();
  return Boolean(cookieStore.get("adminAuth")?.value);
}
