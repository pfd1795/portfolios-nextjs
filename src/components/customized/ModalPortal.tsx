'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';
// Components
import { Button } from '@/components/common';
// Icons
import { IconClose } from '@/utils/IconsGoogle';

// <body>: <div id="modal-portal-root"></div>

interface ModalPortalProps {
  children?: React.ReactNode;
  modalTitle: string;
  actionButton?: React.ReactNode | undefined;
  actionButtonText?: string;
  leftButtonIcon?: React.ReactElement | string | undefined;
  rightButtonIcon?: React.ReactElement | string | undefined;
  classNameButton?: string;
};

const ModalPortal: React.FC<ModalPortalProps> = ({
  children,
  modalTitle,
  actionButton,
  actionButtonText = 'Open Modal',
  leftButtonIcon,
  rightButtonIcon,
  classNameButton,
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const modalRef = useRef<HTMLDialogElement | null>(null);

  const handleOpenModal = () => {
    modalRef.current?.showModal();
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    modalRef.current?.close();
    setIsOpenModal(false);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpenModal) {
        handleCloseModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpenModal]);

  const { tones } = useThemeController();

  const dialogContent = (
    <dialog
      ref={modalRef}
      className="bg-stone-950/90 fixed top-0 left-0 h-screen w-screen flex justify-center items-center z-20"
      onCancel={handleCloseModal}
    >
      <div className={`${tones.outlineColor.normal} bg-stone-200 dark:bg-stone-900 outline-2 shadow-lg w-[90%] md:w-[75%] xl:w-[50%] h-[90%] p-0 rounded-lg overflow-hidden transition-all`}>
        <header className={`${tones.bgColor.dark} border-b-2 ${tones.borderColor.normal} flex justify-between items-center px-4 py-2`}>
          <h2 className="text-stone-200 text-xl text-balance font-bold capitalize w-9/12">
            {modalTitle}
          </h2>

          <Button
            title={"cerrar menú (Esc)"}
            text={"cerrar"}
            rightIcon={<IconClose />}
            onClick={handleCloseModal}
          />
        </header>

        <section className="p-4 overflow-y-auto max-h-[80vh] text-stone-900 dark:text-stone-200">
          {children}
        </section>
      </div>
    </dialog>
  );

  return (
    <>
      {
        actionButton ?
          <div title={modalTitle} onClick={handleOpenModal}>{actionButton}</div> :
          <Button
            title={modalTitle}
            text={actionButtonText}
            rightIcon={rightButtonIcon}
            leftIcon={leftButtonIcon}
            styles={classNameButton}
            onClick={handleOpenModal}
          />
      }

      {isOpenModal && createPortal(dialogContent, document.getElementById("modal-portal-root")!)}
    </>
  );
};

export { ModalPortal };
