"use client";

import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  type RedditAccount,
  useRedditAccount,
} from "@/hooks/use-reddit-account";
import { type UserInfo, useUserInfo } from "@/hooks/use-user-info";
import {
  IconArrowBigUp,
  IconCoin,
  IconCompass,
  IconNotes,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const navItems = [
  {
    title: "Community Feed",
    url: "/dashboard/feed",
    icon: IconCompass,
  },
  {
    title: "My Submissions",
    url: "/dashboard/my-submissions",
    icon: IconNotes,
  },
];

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  userInfo: UserInfo;
  redditAccount: RedditAccount;
}

export function AppSidebar({
  userInfo,
  redditAccount,
  ...props
}: AppSidebarProps) {
  const pathname = usePathname();
  const { setUserInfoData, setIsLoadingUserInfo } = useUserInfo();
  const {
    setRedditAccountData,
    setActiveRedditAccount,
    setIsLoadingRedditAccount,
  } = useRedditAccount();

  React.useEffect(() => {
    setUserInfoData(userInfo);
    setIsLoadingUserInfo(false);

    setRedditAccountData(redditAccount);
    setActiveRedditAccount(redditAccount);
    setIsLoadingRedditAccount(false);
  }, [
    userInfo,
    redditAccount,
    setUserInfoData,
    setRedditAccountData,
    setActiveRedditAccount,
  ]);

  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" className="flex items-center gap-2.5 group">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground group-hover:scale-105 transition-transform duration-200">
                  <IconArrowBigUp size={17} stroke={2.5} />
                </span>
                <span className="text-lg font-bold text-foreground tracking-tight">
                  karmic<span className="text-primary">up</span>
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {/* Points balance */}
        <div className="mx-1 p-3 rounded-xl bg-primary/8 border border-primary/15">
          <p className="text-[10px] font-semibold text-primary/60 uppercase tracking-widest mb-1.5">
            Points Balance
          </p>
          <div className="flex items-center gap-1.5">
            <IconCoin className="w-4 h-4 text-primary" />
            <span className="text-xl font-bold tracking-tight">
              {userInfo.points.toLocaleString()}
            </span>
            <span className="text-xs text-muted-foreground font-medium">
              pts
            </span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  isActive={pathname.startsWith(item.url)}
                >
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <NavUser
          user={{
            name: userInfo.name,
            email: `u/${redditAccount.username}`,
            avatar: "",
          }}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
