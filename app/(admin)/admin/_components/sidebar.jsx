"use client";
import { cn } from "@/lib/utils";
import { Calendar, Car, Cog, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Navigation items
const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    label: "Cars",
    icon: Car,
    href: "/admin/cars",
  },
  {
    label: "Test Drives",
    icon: Calendar,
    href: "/admin/test-drives",
  },
  {
    label: "Settings",
    icon: Cog,
    href: "/admin/settings",
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  return (
    <>
      {/* Desktop View */}
      <div className="hidden md:flex h-full flex-col overflow-y-auto bg-white shadow hover:shadow-md border-r ">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.label}
            className={cn(
              "cursor-pointer flex items-center gap-x-2 text-slate-500 text-sm font-medium pl-6 transition-all hover:text-slate-600 hover:bg-slate-100/50 h-12 ",
              pathname === route.href
                ? "text-blue-700/80 bg-blue-100/50 hover:bg-blue-100 hover:text-blue-700"
                : ""
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </div>
      {/* Mobile view bottom header */}
      <div className="flex md:hidden bottom-0 left-0 fixed right-0 z-50 bg-white border-t justify-around items-center h-16">
        {routes.map((route) => (
          <Link
            href={route.href}
            key={route.label}
            className={cn(
              "flex flex-col justify-center items-center gap-x-2 text-slate-500 text-xs font-medium  transition-all py-1 flex-1 ",
              pathname === route.href ? "text-blue-700" : ""
            )}
          >
            <route.icon className="h-5 w-5" />
            {route.label}
          </Link>
        ))}
      </div>
      ;
    </>
  );
};

export default Sidebar;
