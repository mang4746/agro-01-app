import { useCallback, useEffect, useState } from 'react';

import { deleteTask, getTasks, TasksApiError } from '@/features/tareas/services/tasks-api';
import type { Pagination, Task } from '@/features/tareas/types/task';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [pagination, setPagination] = useState<Pagination>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>();
  const [isDeleting, setIsDeleting] = useState(false);

  const loadTasks = useCallback(async (page = 1) => {
    setIsLoading(true);
    setError(undefined);
    try {
      const result = await getTasks(page);
      setTasks(result.tasks);
      setPagination(result.pagination);
    } catch (cause) {
      setError(cause instanceof TasksApiError ? cause.message : 'No se pudieron cargar las tareas.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const removeTask = useCallback(async (id: number) => {
    setIsDeleting(true);
    try {
      await deleteTask(id);
      await loadTasks(pagination?.current_page ?? 1);
    } finally {
      setIsDeleting(false);
    }
  }, [loadTasks, pagination?.current_page]);

  useEffect(() => {
    const timeoutId = setTimeout(() => void loadTasks(), 0);
    return () => clearTimeout(timeoutId);
  }, [loadTasks]);

  return { tasks, pagination, isLoading, isDeleting, error, loadTasks, removeTask };
}