export const TASK_STATUSES = ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADA'] as const;
export const TASK_PRIORITIES = ['BAJA', 'MEDIA', 'ALTA'] as const;

export type TaskStatus = (typeof TASK_STATUSES)[number];
export type TaskPriority = (typeof TASK_PRIORITIES)[number];

export type Task = {
  id: number;
  titulo: string;
  descripcion: string;
  estado: TaskStatus;
  prioridad: TaskPriority;
  fechaVencimiento: string;
  fechaCreacion?: string;
  fechaActualizacion?: string;
};

export type TaskPayload = {
  titulo: string;
  descripcion: string;
  estado: TaskStatus;
  prioridad: TaskPriority;
  fechaVencimiento: string;
};

export type Pagination = {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  from: number;
  to: number;
};

export type ApiResponse<T> = {
  success: boolean;
  code: number;
  message: string;
  data: T;
  errors: unknown;
  meta?: {
    timestamp: string;
    path: string;
    requestId: string;
    pagination?: Pagination;
  };
};