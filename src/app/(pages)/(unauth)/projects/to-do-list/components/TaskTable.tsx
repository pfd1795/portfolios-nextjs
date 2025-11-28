import { FC, useState } from 'react';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';
// Types
import { TaskProps } from '../types/task.types';

interface ExpandRowProps {
  data: (TaskProps & { options: React.ReactNode[] });
  theadLenght: number;
}

const ExpandRow: FC<ExpandRowProps> = ({ data, theadLenght }) => {
  const { UI_COLORS, tones } = useThemeController();

  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <>
      <tr key={data.id} className={`${UI_COLORS.card} cursor-pointer`} onClick={toggleShowMore}>
        <td className={`border-r-2 ${tones.borderColor.normal} p-2`}>{data.name}</td>
        <td className={`p-2 text-center font-bold ${data.status ? "text-green-500" : "text-red-500"}`}>{data.status ? "FINALIZADA" : "INCOMPLETA"}</td>
      </tr>

      {showMore &&
        <tr className={`${UI_COLORS.card}`}>
          <td colSpan={theadLenght} className={`outline ${tones.outlineColor.normal} p-4`}>
            <div className="flex gap-4">
              {data.options.map((value, index) =>
                <span key={index}>{value}</span>
              )}
            </div>
          </td>
        </tr>
      }
    </>
  );
};

interface TaskTableProps {
  headers: string[];
  columns: (TaskProps & { options: React.ReactNode[] })[];
}

export const TaskTable: FC<TaskTableProps> = ({ headers, columns }) => {
  const { tones } = useThemeController();

  return (
    <table className={`outline ${tones.outlineColor.normal} rounded-xl w-full overflow-hidden`}>
      <thead className={`text-stone-200 ${tones.bgColor.normal}`}>
        <tr>
          {headers.map((header, index) =>
            <th key={index} className="p-2">
              {header}
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {
          columns.length > 0 ?
            columns.map((data) =>
              <ExpandRow key={data.id} data={data} theadLenght={headers.length} />
            ) :
            <tr>
              <td className={`border-r-2 ${tones.borderColor.normal} p-2 text-center`} colSpan={2}>No hay filas</td>
            </tr>
        }
      </tbody>
    </table>
  );
}
