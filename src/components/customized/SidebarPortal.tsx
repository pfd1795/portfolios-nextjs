"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
// Hooks
import { useThemeController } from "@/libs/hooks/useThemeController";
// Components
import { Button } from "@/components/common";
// Icons
import { IconClose, IconMenu } from "@/utils/IconsGoogle";
import { NavBar } from "@/app/(pages)/components/NavBar";

export const SidebarPortal = ({ position = "right", }: { position?: "left" | "right"; }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const portalRoot = useRef<HTMLElement | null>(null);

  useEffect(() => {
    portalRoot.current = document.getElementById("sidebar-portal-root");
  }, []);

  const handleOpenMenu = () => {
    setOpenMenu(true);
    setTimeout(() => {
      menuRef.current?.focus(); // Mueve el foco al menú cuando se abre
    }, 0);
  };

  const handleCloseMenu = useCallback(() => {
    setOpenMenu(false);
    buttonRef.current?.focus(); // Devuelve el foco al botón de apertura
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && openMenu) handleCloseMenu();
    };

    if (openMenu) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openMenu, handleCloseMenu]);

  const { tones } = useThemeController();

  const menuContent = (
    <div className="bg-stone-950/90 h-screen w-screen fixed top-0 left-0 z-10">
      <aside
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`bg-stone-300 dark:bg-stone-900 h-dvh w-4/5 sm:w-2/4 lg:w-1/4 ${tones.borderColor.normal} border-2 rounded-xl absolute top-0 ${position === "right" ? "right-0" : "left-0"} space-y-2 flex flex-col md:px-2 transition-all`}
      >
        <header className={`${tones.borderColor.normal} border-b-2 flex justify-between items-center py-1 px-3`}>
          <h2 className="text-stone-900 dark:text-stone-200 uppercase font-bold">menú</h2>

          <Button
            title="Cerrar menú (Esc)"
            text="cerrar"
            rightIcon={<IconClose />}
            onClick={handleCloseMenu}
          />
        </header>

        <NavBar onClose={handleCloseMenu} />
      </aside>
    </div>
  );

  return (
    <>
      <Button
        ref={buttonRef}
        title="Abrir menú"
        text="menú"
        rightIcon={<IconMenu />}
        onClick={handleOpenMenu}
        styles="fixed top-2 right-2 md:right-4"
      />
      {openMenu && portalRoot.current && createPortal(menuContent, portalRoot.current)}
    </>
  );
};
