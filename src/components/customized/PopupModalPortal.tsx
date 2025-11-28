'use client';
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';
// Components
import { Button } from '@/components/common';
// Icons
import { IconClose } from '@/utils/IconsGoogle';

interface PopupModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PopupModal: React.FC<PopupModalProps> = ({ show, onClose, children }) => {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  const portalRoot = document.getElementById('popup-modal-portal-root');
  const { tones } = useThemeController();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && show) {
        onClose();
      }
    };

    if (show) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [show, onClose]);

  if (!show || !portalRoot) return null;

  const dialogContent = (
    <dialog
      ref={modalRef}
      className="bg-stone-950/90 fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-30"
    >
      <div className={`${tones.outlineColor.normal} bg-stone-200 dark:bg-stone-900 outline shadow-lg w-[90%] md:w-[50%] p-0 rounded-lg overflow-hidden transition-all`}>
        <header className="flex justify-end items-center px-4 py-2">
          <Button
            title="Cerrar menú (Esc)"
            text="Cerrar"
            rightIcon={<IconClose />}
            onClick={onClose}
          />
        </header>

        <section className="p-4 overflow-y-auto max-h-[70vh] text-stone-900 dark:text-stone-200">
          {children}
        </section>
      </div>
    </dialog>
  );

  return createPortal(dialogContent, portalRoot);
};

export { PopupModal };
