import { createStore, Reducer } from 'redux';
import { getDateStringFromDateOject } from '../helpers/common-helpers';
import { StatistticItemInterface } from '../interfaces/statistic-item.interface';
import { TaskInterface } from '../interfaces/task.interface';
import { UpdateCompletedTasksAction, UpdatePausedTimeAction, UpdateStopClicksAction, UpdateWorkTimeAction, UPDATE_COMPLETED_TASKS, UPDATE_PAUSED_TIME, UPDATE_STOP_CLICKS, UPDATE_WORK_TIME } from './statistics/action';
import { AddTaskAction, ADD_TASK, UpdateTasksAction, UPDATE_TASKS } from './tasks/action';

export type RootState = {
    tasks: TaskInterface[],
    statistics: StatistticItemInterface[],
}

const initialState: RootState = {
    tasks: [],
    statistics: [],
}

type MyAction = UpdateTasksAction | 
                AddTaskAction | 
                UpdateStopClicksAction | 
                UpdateCompletedTasksAction | 
                UpdatePausedTimeAction |
                UpdateWorkTimeAction;

const updateStopClicks = (state: RootState, action: UpdateStopClicksAction): StatistticItemInterface[] => {
    const item = state.statistics.find((el) => getDateStringFromDateOject(el.date) === getDateStringFromDateOject(action.data.date));
    if (item) {
        return state.statistics.map((el) => {
            if (getDateStringFromDateOject(el.date) === getDateStringFromDateOject(action.data.date)){
                el.stopClicks += action.data.amount;
            };
            return el;
        })
    } else {
        const newItem: StatistticItemInterface = {
            date: action.data.date,
            stopClicks: action.data.amount,
            completedTasks: 0,
            workTime: 0,
            pauseTime: 0,
        }
        return [...state.statistics, newItem];
    }
}

const updateCompletedTasks = (state: RootState, action: UpdateCompletedTasksAction): StatistticItemInterface[] => {
    const item = state.statistics.find((el) => getDateStringFromDateOject(el.date) === getDateStringFromDateOject(action.data.date));
    if (item) {
        return state.statistics.map((el) => {
            if (getDateStringFromDateOject(el.date) === getDateStringFromDateOject(action.data.date)){
                el.completedTasks += action.data.amount;
            };
            return el;
        })
    } else {
        const newItem: StatistticItemInterface = {
            date: action.data.date,
            stopClicks: 0,
            completedTasks: action.data.amount,
            workTime: 0,
            pauseTime: 0,
        }
        return [...state.statistics, newItem];
    }
}

const updatePausedTime = (state: RootState, action: UpdatePausedTimeAction): StatistticItemInterface[] => {
    const item = state.statistics.find((el) => getDateStringFromDateOject(el.date) === getDateStringFromDateOject(action.data.date));
    if (item) {
        return state.statistics.map((el) => {
            if (getDateStringFromDateOject(el.date) === getDateStringFromDateOject(action.data.date)){
                el.pauseTime += action.data.amount;
            };
            return el;
        })
    } else {
        const newItem: StatistticItemInterface = {
            date: action.data.date,
            stopClicks: 0,
            completedTasks: 0,
            workTime: 0,
            pauseTime: action.data.amount,
        }
        return [...state.statistics, newItem];
    }
}

const updateWorkTime = (state: RootState, action: UpdateWorkTimeAction): StatistticItemInterface[] => {
    const item = state.statistics.find((el) => getDateStringFromDateOject(el.date) === getDateStringFromDateOject(action.data.date));
    if (item) {
        return state.statistics.map((el) => {
            if (getDateStringFromDateOject(el.date) === getDateStringFromDateOject(action.data.date)){
                el.workTime += action.data.amount;
            };
            return el;
        })
    } else {
        const newItem: StatistticItemInterface = {
            date: action.data.date,
            stopClicks: 0,
            completedTasks: 0,
            workTime: action.data.amount,
            pauseTime: 0,
        }
        return [...state.statistics, newItem];
    }
}

export const rootReducer: Reducer<RootState, MyAction> = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_TASKS:
            return {
                ...state,
                tasks: action.data,
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.task],
            }
        case UPDATE_STOP_CLICKS:
            return {
                ...state,
                statistics: updateStopClicks(state, action),
            }
        case UPDATE_COMPLETED_TASKS:
            return {
                ...state,
                statistics: updateCompletedTasks(state, action),
            }
        case UPDATE_PAUSED_TIME:
            return {
                ...state,
                statistics: updatePausedTime(state, action)
            }
        case UPDATE_WORK_TIME:
            return {
                ...state,
                statistics: updateWorkTime(state, action)
            }
        default:
            return state;
    }
}

const saveToLocalStorage = (state: RootState): void => {
    try {
        const seriallisedState = JSON.stringify(state);
        localStorage.setItem('persistantState', seriallisedState);
    } catch (error) {
        console.warn(error)
    }
}

const loadFromLocalStorage = (): RootState | undefined => {
    try {
        const seriallisedState = localStorage.getItem('persistantState');
        if (seriallisedState === null) {
            return undefined;
        }
        return JSON.parse(seriallisedState);
    } catch (error) {
        console.warn(error)
        return undefined;
    }
}

export const store = createStore(rootReducer, loadFromLocalStorage());
store.subscribe(() => saveToLocalStorage(store.getState()));