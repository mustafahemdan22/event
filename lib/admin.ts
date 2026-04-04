import { currentUser } from "@clerk/nextjs/server";

export async function isAdminUser(): Promise<boolean> {
  const user = await currentUser();
  const role = (user?.publicMetadata as any)?.role;
  return role === "admin";
}

