import { ActionCreator } from 'redux';
import { TimeInterface } from '../../interfaces/time.interface';
import { StopClickInterface } from '../../interfaces/stop-click.interface';
import { UpdateCompletedTaskInterface } from '../../interfaces/update-completed-task.intreface';

export const UPDATE_STOP_CLICKS = 'UPDATE_STOP_CLICKS';
export type UpdateStopClicksAction = {
    type: typeof UPDATE_STOP_CLICKS;
    data: StopClickInterface;
}
export const updateStopClicks: ActionCreator<UpdateStopClicksAction> = (data: StopClickInterface) => ({
    type: UPDATE_STOP_CLICKS,
    data,
});

export const UPDATE_COMPLETED_TASKS = 'UPDATE_COMPLETED_TASKS';
export type UpdateCompletedTasksAction = {
    type: typeof UPDATE_COMPLETED_TASKS;
    data: UpdateCompletedTaskInterface;
}
export const updateCompletedTasks: ActionCreator<UpdateCompletedTasksAction> = (data: UpdateCompletedTaskInterface) => ({
    type: UPDATE_COMPLETED_TASKS,
    data,
});

export const UPDATE_PAUSED_TIME = 'UPDATE_PAUSED_TIME';
export type UpdatePausedTimeAction = {
    type: typeof UPDATE_PAUSED_TIME;
    data: TimeInterface;
}
export const updatePausedTime: ActionCreator<UpdatePausedTimeAction> = (data: UpdateCompletedTaskInterface) => ({
    type: UPDATE_PAUSED_TIME,
    data,
});

export const UPDATE_WORK_TIME = 'UPDATE_WORK_TIME';
export type UpdateWorkTimeAction = {
    type: typeof UPDATE_WORK_TIME;
    data: TimeInterface;
}
export const updateWorkTime: ActionCreator<UpdateWorkTimeAction> = (data: UpdateCompletedTaskInterface) => ({
    type: UPDATE_WORK_TIME,
    data,
})