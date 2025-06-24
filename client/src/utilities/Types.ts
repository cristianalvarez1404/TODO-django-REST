export type TaskType = {
  readonly id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at?: string;
};

export type CreateTask = {
  title?: string;
  description?: string;
  completed?: boolean;
};
