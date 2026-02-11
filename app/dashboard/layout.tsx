import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { supabaseServer } from "@/lib/supabase/server";
import { redirect } from "next/dist/client/components/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabaseAuth = await supabaseServer();
  const {
    data: { user },
  } = await supabaseAuth.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // GET DATA
  const [{
    data: redditAccount
  },{
    data: userInfo
  }] = await Promise.all([
    const { data: redditAccount } = await supabaseAdmin.
      from("reddit_accounts")
      .select("id, username")
      .eq("user_id", user.id)
      .single(),
    supabaseAdmin.from("user").select("id, points").eq("id", user.id).single(),
  ]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="data-vertical:h-4 data-vertical:self-auto"
          />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
