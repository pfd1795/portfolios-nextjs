import { TaskProps } from '../types/task.types';

const API_URL = 'http://localhost:3000/tasks.json';

const listTask: TaskProps[] = [
  {
    id: 111,
    name: 'comprar leche',
    status: true
  },
  {
    id: 112,
    name: 'comprar sal',
    status: false
  },
  {
    id: 113,
    name: 'comprar manteca',
    status: true
  }
];

const getLocalJsonTasks = async (): Promise<TaskProps[]> => {
  try {
    const response = await fetch('/path/to/local/tasks.json');
    if (response.ok) {
      const jsonTasks = await response.json();
      return jsonTasks.map((task: TaskProps) => ({
        ...task,
        name: `${task.name} - tarea json`,
      }));
    } else {
      throw new Error('JSON local no encontrado');
    }
  } catch (error) {
    console.error('Error al cargar el JSON local:', error);
    return listTask;
  }
}

export const getAllTask = async (): Promise<TaskProps[]> => {
  return listTask;
  try {
    const response = await fetch(API_URL);
    if (response.ok) {
      const tasks = await response.json();
      return tasks;
    } else {
      throw new Error('Error al conectar con la base de datos');
    }
  } catch (error) {
    console.error('Error de conexión:', error)
    return await getLocalJsonTasks();
  }
}
