import { ChangeEvent, FormEvent, useState } from 'react';
// Components
import { Button } from '@/components/common';
import { Checkbox, InputField } from '@/components/form';
import { ModalPortal } from '@/components/customized';
// Icons
import { IconAddCircle, IconEdit } from '@/utils/IconsGoogle';
// Types
import { TaskProps } from '../types/task.types';

interface TaskFormProps {
  formData?: TaskProps;
  onSubmit: (task: TaskProps) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  formData = { id: 0, name: '', status: false },
  onSubmit,
}) => {
  const [name, setName] = useState(formData.name);
  const [status, setStatus] = useState(formData.status);
  const [error, setError] = useState('');

  const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    if (event.target.value.trim() !== '') {
      setError('');
    }
  };

  const handleChangeStatus = () => {
    setStatus(!status);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (name.trim() === '') {
      setError('El nombre de la tarea no puede estar vacío.');
      return;
    }

    const taskData = {
      id: formData.id,
      name: name.trim(),
      status,
    };

    onSubmit(taskData);

    setName('');
    setStatus(false);
    setError('');
  };

  return (
    <ModalPortal
      actionButtonText={formData.id ? 'Editar' : 'Crear Tarea'}
      modalTitle={formData.id ? 'Editar tarea' : 'Crear Tarea'}
      rightButtonIcon={formData.id ? <IconEdit /> : <IconAddCircle />}
    >
      <form className="grid gap-6 p-4" onSubmit={handleSubmit}>
        <InputField
          label="Nombre Tarea:"
          required
          name="name"
          onChange={handleChangeName}
          placeholder="Introduce la tarea"
          type="text"
          value={name}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}

        <Checkbox
          label="Estado Tarea"
          name="status"
          text={status ? "FINALIZADA" : "INCOMPLETA"}
          checked={status}
          onChange={handleChangeStatus}
        />

        <div className="flex justify-center gap-2 mt-4">
          <Button
            text={formData.id ? "Actualizar" : "Guardar"}
            type="submit"
            aria-label="Guardar tarea"
          />
        </div>
      </form>
    </ModalPortal>
  );
}
