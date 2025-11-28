import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';
// Local Components
import { ThemeColorPicker } from '@/components/ThemeColorPicker';
// Icons
import { IconKeyboardArrowDown, IconKeyboardArrowUp, IconSettings, IconDeployedCode, IconHome, IconSportsEsports } from '@/utils/IconsGoogle';

const links = [
  { url: 'home', label: 'inicio', icon: <IconHome /> },
  { url: 'projects', label: 'proyectos', icon: <IconDeployedCode /> },
  { url: 'memory-game', label: 'juegos', icon: <IconSportsEsports /> },
];

export const NavBar = ({ onClose }: { onClose: () => void }) => {
  const [accordionOpen, setAccordionOpen] = useState(false);

  const pathname = usePathname();

  const { tones } = useThemeController();

  const handleOpenAccordion = () => setAccordionOpen((prev) => !prev);

  return (
    <>
      <nav className="flex flex-col justify-between h-full">
        <ul className="text-stone-900 dark:text-stone-200 font-semibold space-y-1">
          {links.map((route, index) =>
            <li key={index}>
              <Link
                href={route.url}
                onClick={onClose}
                className={`text-xl py-1 px-2 flex items-center gap-2 space-x-2 ${pathname === "/" + route.url ? `${tones.bgColor.normal} text-stone-200` : "hover:bg-stone-400 hover:dark:bg-stone-700"}`}
              >
                <span className={`${pathname === "/" + route.url ? "fill-stone-200" : "fill-stone-900 dark:fill-stone-200"}`}>{route.icon}</span>

                <span>{route.label}</span>
              </Link>
            </li>
          )}
        </ul>

        <section>
          <header
            className={`border-t-2 ${tones.borderColor.normal} flex justify-between items-center py-1 pl-2 pr-4 md:pr-2 cursor-pointer`}
            onClick={handleOpenAccordion}
          >
            <div className="flex items-center gap-2 space-x-2">
              <IconSettings className="fill-stone-900 dark:fill-stone-200" />

              <h3 className="text-stone-900 dark:text-stone-200 text-xl uppercase font-bold">configurar</h3>
            </div>

            <span>{accordionOpen ? <IconKeyboardArrowDown className="fill-stone-900 dark:fill-stone-200" /> : <IconKeyboardArrowUp className="fill-stone-900 dark:fill-stone-200" />}</span>
          </header>

          {accordionOpen && <ThemeColorPicker />}
        </section>
      </nav>
    </>
  )
}
