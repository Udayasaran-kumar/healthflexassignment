export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category?: string;
  status: 'running' | 'paused' | 'completed';
  completedAt?: string;
}
