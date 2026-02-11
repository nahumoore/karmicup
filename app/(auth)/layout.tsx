import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseAuth = await supabaseServer();

  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();
  if (user) {
    redirect("/dashboard");
  }

  return <>{children}</>;
}
