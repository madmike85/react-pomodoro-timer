import { TaskInterface } from '../../interfaces/task.interface';
import { ActionCreator } from 'redux'

export const UPDATE_TASKS = 'UPDATE_TASKS';
export type UpdateTasksAction = {
    type: typeof UPDATE_TASKS;
    data: TaskInterface[];
}
export const updateTasks: ActionCreator<UpdateTasksAction> = (data: TaskInterface[]) => ({
    type: UPDATE_TASKS,
    data,
})

export const ADD_TASK = 'ADD_TASK';
export type AddTaskAction = {
    type: typeof ADD_TASK;
    task: TaskInterface;
}
export const addTask: ActionCreator<AddTaskAction> = (task: TaskInterface) => ({
    type: ADD_TASK,
    task,
})