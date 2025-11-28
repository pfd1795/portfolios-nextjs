'use client';
import { useState } from 'react';
// Hooks
import { useThemeController } from '@/libs/hooks/useThemeController';
// Components
import { ModalPortal } from '@/components/customized';
import { InputSelect } from '@/components/form';
// Icons
import { IconInfo } from '@/utils/IconsGoogle';
// Types
import { TaskProps } from './types/task.types';
// Local Hooks
import useTasks from './hooks/useTasks';
// Local Components
import { TaskCard, TaskForm, TaskFormRemove, TaskList, TaskTable } from './components';

const VIEW_OPTIONS = [{ key: 'lista', value: 'lista' }, { key: 'tabla', value: 'tabla' }, { key: 'tarjeta', value: 'tarjeta' }];

export function ToDoListScreen() {
  const { createTask, editTask, removeTask, error, isLoading, listTasks } = useTasks();

  const [viewOption, setViewOption] = useState(VIEW_OPTIONS[0].key);

  const handleViewOptions = (data: string) => {
    setViewOption(data);
  };

  const handleSubmitForm = (taskData: TaskProps) => {
    if (taskData.id) {
      editTask(taskData);
    } else {
      createTask(taskData);
    }
  }

  const handleSubmitFormRemove = (id: TaskProps['id']) => {
    removeTask(id)
  }

  const { UI_COLORS, tones } = useThemeController();

  const RenderViewComponent = () => {
    switch (viewOption) {
      case 'lista':
        return (
          <TaskList
            list={listTasks.map((task) => ({
              ...task,
              options: [
                <TaskForm key={`form-${task.id}`} formData={task} onSubmit={handleSubmitForm} />,
                <TaskFormRemove key={`remove-${task.id}`} formData={task} onSubmit={handleSubmitFormRemove} />
              ]
            }))}
          />
        );
      case 'tabla':
        return (
          <TaskTable
            headers={['Tarea', 'Estado']}
            columns={listTasks.map((task) => ({
              ...task,
              options: [
                <TaskForm key={`form-${task.id}`} formData={task} onSubmit={handleSubmitForm} />,
                <TaskFormRemove key={`remove-${task.id}`} formData={task} onSubmit={handleSubmitFormRemove} />
              ]
            }))}
          />
        );
      case 'tarjeta':
        return (
          <div className='flex flex-wrap items-center gap-4'>
            {
              listTasks.length > 0 ?
                listTasks.map((task) =>
                  <TaskCard
                    key={task.id}
                    data={{
                      ...task,
                      options: [
                        <TaskForm key={`form-${task.id}`} formData={task} onSubmit={handleSubmitForm} />,
                        <TaskFormRemove key={`remove-${task.id}`} formData={task} onSubmit={handleSubmitFormRemove} />
                      ]
                    }}
                  />
                ) :
                <span>No hay tarjetas</span>
            }
          </div>
        );
      default:
        return <p>no hay nad</p>;
    }
  };

  return (
    <section className={`${UI_COLORS.container} rounded-xl p-4 md:p-4 space-y-4`}>
      <header className="flex justify-between items-center">
        <h3 className="text-2xl text-balance">Administrador de Tareas</h3>

        <ModalPortal
          modalTitle="Informacion: Juego de Memoria"
          actionButtonText="Información"
          rightButtonIcon={<IconInfo />}
        >
          <section className="space-y-8">
            <header className={`border-b-4 ${tones.borderColor.normal}`}>
              <h3 className="text-2xl">Administrador de Tareas</h3>
              <h4>Este proyecto básico de React presenta un CRUD completo (crear, leer, actualizar, eliminar) para administrar una lista de tareas.</h4>
            </header>

            <section className={`space-y-2`}>
              <p><span className={`${tones.bgColor.dark} py-1 px-2 ${tones.textColor}`}><strong className="uppercase">Información</strong></span> Desarrollo de un CRUD de tareas, con visualización en tres formatos: lista, tabla y tarjetas.</p>
              <p><span className={`${tones.bgColor.dark} py-1 px-2 ${tones.textColor}`}><strong className="uppercase">Detalles</strong></span> Las modificaciones y alteraciones realizadas en esta versión no afectan ninguna base de datos.</p>
              <p><span className={`${tones.bgColor.dark} py-1 px-2 ${tones.textColor}`}><strong className="uppercase">Versión</strong></span> 1.0.0</p>
            </section>
          </section>
        </ModalPortal>
      </header>

      <div className={`border-y-2 ${tones.borderColor.normal} py-4 flex justify-between items-center`}>
        <TaskForm onSubmit={handleSubmitForm} />

        <InputSelect
          placeholder="Ver:"
          name="viewOption"
          options={VIEW_OPTIONS}
          onChange={handleViewOptions}
          value={viewOption}
          disabled={isLoading}
        />
      </div>

      <div>
        {isLoading ? 
          <p>Cargando Tareas...</p>
         : error ? 
          <p className="text-red-500">{error}</p>
         : 
          <RenderViewComponent />
        }
      </div>
    </section>
  );
}
