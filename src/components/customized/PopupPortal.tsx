'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';

// <body>: <div id="popup-portal-root"></div>

interface PopupPortalProps {
  isOpen: boolean;
  onClose: () => void;
  options: Array<React.ReactNode>;
  position?:
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top left'
  | 'top right'
  | 'bottom left'
  | 'bottom right'
  | 'center';
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const PopupPortal: React.FC<PopupPortalProps> = ({
  isOpen,
  onClose,
  options,
  position = 'bottom',
  triggerRef,
}) => {
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const newStyles: React.CSSProperties = {
        position: 'absolute',
      };

      const horizontalOffset = 10;
      const verticalOffset = 10;

      switch (position) {
        case 'top':
          newStyles.top = triggerRect.top - verticalOffset + window.scrollY;
          newStyles.left = triggerRect.left + triggerRect.width / 2;
          newStyles.transform = 'translateX(-50%)';
          break;
        case 'bottom':
          newStyles.top = triggerRect.bottom + verticalOffset + window.scrollY;
          newStyles.left = triggerRect.left + triggerRect.width / 2;
          newStyles.transform = 'translateX(-50%)';
          break;
        case 'left':
          newStyles.top = triggerRect.top + triggerRect.height / 2 + window.scrollY;
          newStyles.left = triggerRect.left - horizontalOffset;
          newStyles.transform = 'translateY(-50%)';
          break;
        case 'right':
          newStyles.top = triggerRect.top + triggerRect.height / 2 + window.scrollY;
          newStyles.left = triggerRect.right + horizontalOffset;
          newStyles.transform = 'translateY(-50%)';
          break;
        case 'top left':
          newStyles.top = triggerRect.top - verticalOffset + window.scrollY;
          newStyles.left = triggerRect.left;
          break;
        case 'top right':
          newStyles.top = triggerRect.top - verticalOffset + window.scrollY;
          newStyles.left = triggerRect.right;
          newStyles.transform = 'translateX(-100%)';
          break;
        case 'bottom left':
          newStyles.top = triggerRect.bottom + verticalOffset + window.scrollY;
          newStyles.left = triggerRect.left;
          break;
        case 'bottom right':
          newStyles.top = triggerRect.bottom + verticalOffset + window.scrollY;
          newStyles.left = triggerRect.right;
          newStyles.transform = 'translateX(-100%)';
          break;
        case 'center':
          newStyles.top = triggerRect.top + triggerRect.height / 2 + window.scrollY;
          newStyles.left = triggerRect.left + triggerRect.width / 2;
          newStyles.transform = 'translate(-50%, -50%)';
          break;
        default:
          break;
      }

      newStyles.zIndex = 50;
      setMenuStyles(newStyles);
    }
  }, [isOpen, triggerRef, position]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const { tones } = useThemeController();

  const menuContent = (
    <div
      className="fixed inset-0 z-40"
      onClick={onClose}
    >
      <div
        ref={menuRef}
        style={menuStyles}
        className={`${tones.bgColor.dark} outline outline-4 ${tones.outlineColor.light} rounded-md max-w-md absolute overflow-x-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        <ul>
          {options.map((option, index) => (
            <li
              key={index}
              className={`outline outline-2 ${tones.outlineColor.light} p-2 rounded-md`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return isOpen
    ? createPortal(menuContent, document.getElementById("popup-portal-root")!)
    : null;
};

export { PopupPortal };
