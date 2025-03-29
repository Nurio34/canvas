"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const apps = [
  {
    name: "Resizing Circles",
    href: "/resizing-circles",
  },
  {
    name: "new",
    href: "/new",
  },
  {
    name: "other",
    href: "/other",
  },
];

function SideMenu() {
  const path = usePathname();

  return (
    <nav className="py-2 pl-2 px-4 shadow-md h-screen">
      <h2 className="font-bold text-2xl">Apps</h2>
      <ul className="pt-2 px-2 space-y-2">
        {apps.map((app) => (
          <li
            key={app.name}
            className={`capitalize hover:text-base-100 py-1 px-2
                ${
                  path === app.href
                    ? "bg-primary/80 text-base-100"
                    : "hover:bg-secondary/80"
                }    
            `}
          >
            <Link href={app.href} className="block">
              {app.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
export default SideMenu;
