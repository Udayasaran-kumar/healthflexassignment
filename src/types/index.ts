// export type TimerStatus = 'running' | 'paused' | 'completed';

// export interface Timer {
//   id: string;
//   name: string;
//   category?: string;
//   duration: number;
//   remainingTime: number;
//   status: TimerStatus;
//   completedAt?: Date;
// }


export interface Timer {
  id: string;
  name: string;
  duration: number;
  remainingTime: number;
  category?: string;
  status: 'running' | 'paused' | 'completed';
  completedAt?: string;
}
