"use client";
import { Home, User, LogIn, LogOut, Settings, UserPlus } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { signOut, useSession } from "next-auth/react";

export function AppSidebar() {
  const { data: session, status } = useSession();

  // クライアントサイドレンダリングの場合のみレンダリングするため
  const isClient = typeof window !== "undefined";

  // セッションがロード中の間は固定のレイアウトを表示
  if (!isClient || status === "loading") {
    return (
      <Sidebar>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Application</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <div className="flex">
                      <Home />
                      <span className="ml-5">Home</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    );
  }

  const items = [
    {
      title: "Home",
      url: "/",
      icon: Home,
    },
    session
      ? {
          title: "ログイン中",
          icon: User,
          name: session.user?.name,
        }
      : {
          title: "ログイン",
          icon: LogIn,
          url: "/auth/signin",
        },
    session
      ? {
          title: "ログアウト",
          handler: signOut,
          icon: LogOut,
        }
      : {
          title: "新規登録",
          url: "/auth/signup",
          icon: UserPlus,
        },
  ];
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item?.name && (
                    <SidebarMenuButton>
                      <div className="flex">
                        <item.icon size={16} />
                        <span className="ml-5">
                          {item.title}: {item.name}
                        </span>
                      </div>
                    </SidebarMenuButton>
                  )}
                  {item?.handler && (
                    <SidebarMenuButton onClick={() => item.handler()}>
                      <div className="flex">
                        <item.icon size={16} />
                        <span className="ml-5">{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  )}
                  {item?.url && (
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex">
                        <item.icon />
                        <span className="ml-5">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
