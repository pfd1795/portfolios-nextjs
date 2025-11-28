// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';

export interface TableHeaderProps {
  columns: (string | number)[];
  subRow?: (string | number | React.ReactNode) | null;
}

export const TableHeader: React.FC<TableHeaderProps> = ({
  columns = [],
  subRow = null
}) => {
  const { tones } = useThemeController();

  return (
    <thead className={`${tones.bgColor.normal} ${tones.textColor} sticky top-0`}>
      {columns.length > 0 ?
        <tr>
          {columns.map((data, i) =>
            <th key={i} className="py-1 px-2 uppercase">{data}</th>
          )}
        </tr> :
        <tr>
          <th className="py-1 px-2 uppercase">Encabezado vacío.</th>
        </tr>
      }
      {subRow &&
        <tr>
          <td colSpan={columns.length}>
            {subRow}
          </td>
        </tr>
      }
    </thead>
  );
}
