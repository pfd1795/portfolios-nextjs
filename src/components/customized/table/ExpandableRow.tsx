'use client';
import { useState } from 'react';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';

export interface ExpandableRowProps {
  columns: (string | number | React.ReactNode)[];
  subRow?: (string | number | React.ReactNode) | null;
}

const ExpandableRow: React.FC<ExpandableRowProps> = ({
  columns = [],
  subRow = null
}) => {
  const [expandRow, setExpandRow] = useState(false)

  const handleOpenButton = () => {
    setExpandRow(!expandRow);
  };

  const { tones } = useThemeController();

  return (
    <>
      <tr
        className={`${expandRow && "bg-stone-400 dark:bg-stone-800"} hover:bg-stone-400 hover:dark:bg-stone-800 ${tones.borderColor.normal} border-t-4 cursor-pointer transition-colors`}
        onClick={handleOpenButton}
        title={!expandRow ? "abrir" : "cerrar"}
      >
        {columns.map((data, i) => <td key={i} className="text-center p-1 md:px-2">{data}</td>)}
      </tr>

      {subRow && expandRow &&
        <tr className={`${expandRow && "bg-stone-400 dark:bg-stone-800"}`}>
          <td colSpan={10} className="p-2 md:px-2">
            {subRow}
          </td>
        </tr>
      }
    </>
  );
}

export { ExpandableRow };
