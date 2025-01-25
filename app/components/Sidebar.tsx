"use client";

import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, History, Mail, LogIn } from "lucide-react";

const menuItems = [
  {
    title: "ログイン",
    href: "/auth/signin",
    icon: LogIn,
  },
  {
    title: "履歴",
    href: "/history",
    icon: History,
  },
  {
    title: "問い合わせ",
    href: "/contact",
    icon: Mail,
  },
];

const Sidebar = () => {
  return (
    <>
      {/* モバイル用サイドバー */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden fixed left-4 top-4">
          <Button variant="outline" size="icon">
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-64 p-0">
          <nav className="flex flex-col space-y-2 p-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md transition-colors"
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* デスクトップ用サイドバー */}
      <aside className="hidden lg:block w-64 h-screen bg-background border-r fixed left-0 top-0">
        <nav className="flex flex-col space-y-2 p-4">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 px-4 py-2 hover:bg-accent rounded-md transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
