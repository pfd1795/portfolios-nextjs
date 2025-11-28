import { useState } from 'react';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';
// Types
import { TaskProps } from '../types/task.types';

interface TaskCardProps {
  data: (TaskProps & { options: React.ReactNode[] });
}

export const TaskCard: React.FC<TaskCardProps> = ({ data }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  const { UI_COLORS } = useThemeController();

  return (
    <article className={`${UI_COLORS.card} p-2 rounded-xl cursor-pointer space-y-2`}>
      <div onClick={toggleShowMore}>
        <p><span className="uppercase border-b-2 border-sky-700">id tarea</span>: {data.id}</p>
        <h3><span className="uppercase border-b-2 border-sky-700">tarea</span>: {data.name}</h3>
        <p><span className="uppercase border-b-2 border-sky-700">estado</span>: <span className={`font-bold ${data.status ? "text-green-500" : "text-red-500"}`}>{data.status ? "FINALIZADA" : "INCOMPLETA"}</span></p>
      </div>

      {showMore &&
        <div className="flex gap-4">
          {data.options.map((value, index) =>
            <span key={index}>{value}</span>
          )}
        </div>
      }
    </article>
  );
}
