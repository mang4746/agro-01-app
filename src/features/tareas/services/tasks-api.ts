import { isAxiosError } from 'axios';

import type { ApiResponse, Pagination, Task, TaskPayload } from '@/features/tareas/types/task';
import { api } from '@/lib/api';

export class TasksApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = 'TasksApiError';
    this.status = status;
  }
}

async function request<T>(request: () => Promise<{ data: ApiResponse<T> }>): Promise<ApiResponse<T>> {
  try {
    const response = await request();
    if (!response.data.success) {
      throw new TasksApiError(response.data.message || 'La API devolvió un error inesperado.');
    }
    return response.data;
  } catch (cause) {
    if (cause instanceof TasksApiError) {
      throw cause;
    }

    if (isAxiosError(cause)) {
      throw new TasksApiError(
        cause.response?.data?.message || 'No se pudo completar la solicitud a la API.',
        cause.response?.status,
      );
    }

    throw new TasksApiError('No se pudo conectar con la API. Verifica que el servidor esté activo.');
  }
}

export async function getTasks(page = 1, limit = 10) {
  const response = await request(() => api.get<ApiResponse<Task[]>>('/tareas', { params: { limit, page } }));
  return {
    tasks: response.data,
    pagination: response.meta?.pagination as Pagination | undefined,
  };
}

export async function getTask(id: number) {
  const response = await request(() => api.get<ApiResponse<Task>>(`/tareas/${id}`));
  return response.data;
}

export async function createTask(payload: TaskPayload) {
  const response = await request(() => api.post<ApiResponse<Task>>('/tareas', payload));
  return response.data;
}

export async function updateTask(id: number, payload: TaskPayload) {
  const response = await request(() => api.patch<ApiResponse<Task>>(`/tareas/${id}`, payload));
  return response.data;
}

export async function deleteTask(id: number) {
  await request(() => api.delete<ApiResponse<null>>(`/tareas/${id}`));
}