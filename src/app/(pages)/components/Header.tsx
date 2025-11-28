import Link from "next/link";
// Components
import { SidebarPortal } from "@/components/customized";

export const Header = () =>
  <header className="flex justify-between items-center p-1 md:px-4">
    <Link href="home" title="ir a inicio" className="group text-center">
      <h1 className="text-stone-400 group-hover:text-stone-200 transition-colors duration-200 text-2xl font-semibold">Pablo F. Diaz</h1>

      <h2 className="text-stone-500 group-hover:text-stone-200 transition-colors duration-200 text-base uppercase italic">desarrollador web</h2>
    </Link>

    <SidebarPortal />
  </header>