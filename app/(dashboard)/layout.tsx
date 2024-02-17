import { getUserProfile } from "@/services/profile";
import { redirect } from "next/navigation";

const verifySession = async (): Promise<boolean> => {
  try {
    const response = await getUserProfile();

    if ("message" in response) {
      return false;
    }

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifySession();

  if (!session) {
    return redirect("/");
  }

  return <main>{children}</main>;
}
