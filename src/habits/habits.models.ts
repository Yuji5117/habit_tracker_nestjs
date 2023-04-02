export interface HabitResponse {
  habitId: number;
  title: string;
  habitStatuses: HabitStatusResponse[];
  createdAt: Date;
  updatedAt: Date;
}

export interface HabitStatusResponse {
  habitId: number;
  habitStatusId?: number;
  isCompleted: boolean;
  targetedDate: Date;
}
