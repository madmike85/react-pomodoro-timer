import { DateInterface } from './date.interface';

export interface StatistticItemInterface {
    date: DateInterface;
    stopClicks: number;
    completedTasks: number;
    workTime: number;
    pauseTime: number;
}