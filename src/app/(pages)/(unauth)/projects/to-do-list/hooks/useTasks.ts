import { useEffect, useState } from 'react';
import { TaskProps } from '../types/task.types';
import { getAllTask } from '../services/taskApi';

const useTasks = () => {
  const [listTasks, setListTasks] = useState<TaskProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const data: TaskProps[] = await getAllTask();
        setListTasks(data);
      } catch (err) {
        setError('Error loading data. Please try again.');
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const createTask = (data: TaskProps): void => {
    setIsLoading(true);

    try {
      const newTask = {
        id: new Date().getTime(),
        name: data.name,
        status: data.status,
      };

      setListTasks((prevTasks) => [newTask, ...prevTasks]);
    } catch (err) {
      setError('Error create task.');
      console.error('Error loading data:', err);
    } finally {
      console.log(listTasks)
      setIsLoading(false);
    }
  };

  const editTask = (data: TaskProps): void => {
    setIsLoading(true);

    try {
      console.log('data edit!!!')
      console.log(data)
      setListTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === data.id ? { ...task, name: data.name, status: data.status } : task
        )
      );
      console.log('list edit!!!')
      console.log(listTasks)
    } catch (err) {
      setError('Error edit task.');
      console.error('Error loading data:', err);
    } finally {
      console.log(listTasks)
      setIsLoading(false);
    }
  };

  const removeTask = (dataId: number): void => {
    setIsLoading(true);

    try {
      setListTasks((prevTasks) => prevTasks.filter((task) => task.id !== dataId));
    } catch (err) {
      setError('Error remove task.');
      console.error('Error loading data:', err);
    } finally {
      console.log(listTasks)
      setIsLoading(false);
    }
  };

  return {
    createTask,
    editTask,
    error,
    isLoading,
    listTasks,
    removeTask
  };
};

export default useTasks;
