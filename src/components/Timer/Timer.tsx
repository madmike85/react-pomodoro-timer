import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskInterface } from '../../interfaces/task.interface';
import { RootState } from '../../store/store';
import { Actions } from './Actions';
import { Clock } from './Clock';
import styles from './timer.module.scss';
import classNames from 'classnames';
import { useEffect } from 'react';
import { updateTasks } from '../../store/tasks/action';
import { updateCompletedTasks, updateStopClicks, updateWorkTime } from '../../store/statistics/action';
import { createDateObject } from '../../helpers/common-helpers';
import { StopClickInterface } from '../../interfaces/stop-click.interface';
import { UpdateCompletedTaskInterface } from '../../interfaces/update-completed-task.intreface';
import { TimeInterface } from '../../interfaces/time.interface';
import { breakTime, defaultTime, longBreakTime, sessionTime } from '../../constants';


export function Timer() {
    const tasksToBeDone = useSelector<RootState, TaskInterface[]>(state => state.tasks);
    const [isStart, setIsStart] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [isBreak, setIsBreak] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const [defaultState, setDefaultState] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState<string>(tasksToBeDone.length ? tasksToBeDone[0].id : '');
    const [currentTask, setCurrentTask] = useState<TaskInterface | undefined>(tasksToBeDone.find((item) => item.id === currentTaskId));
    const [time, setTime] = useState(sessionTime);
    const [numberOfBreaks, setNumberOfBreaks] = useState(0)
    const dispatch = useDispatch();


    useEffect(() => {
        setCurrentTaskId(tasksToBeDone.length ? tasksToBeDone[0].id : '');
        setCurrentTask(tasksToBeDone.find((item) => item.id === currentTaskId));
        if (tasksToBeDone.length === 0) {
            setIsBreak(false);
            setIsStart(false);
            setDefaultState(true);
            setTime(sessionTime);
        }
    }, [tasksToBeDone, currentTaskId])


    const headerClasses = classNames(
        styles.header,
        { [styles.start]: (isStart || isPaused) && !isBreak },
        { [styles.break]: (isStart || isPaused) && isBreak },
    )

    const updateTasksList = (): void => {
        let newList: TaskInterface[] = [];
        if (currentTask!.count > 1) {
            newList = tasksToBeDone.map((task: TaskInterface) => {
                if (task.id === currentTaskId) {
                    const newTask = {
                        id: task.id,
                        count: task.count - 1,
                        title: task.title,
                        completed: task.completed,
                    }
                    return newTask;
                }
                return task;
            });
        } else {
            newList = tasksToBeDone.filter((item) => item.id !== currentTaskId);
        }

        const item: UpdateCompletedTaskInterface = {
            amount: 1,
            date: createDateObject(),
        }
        dispatch(updateCompletedTasks(item));

        dispatch(updateTasks(newList))
    }

    const onStart = (): void => {
        setIsStart(true);
        setIsCompleted(false);
        setDefaultState(false);
    }

    const onPause = (): void => {
        setIsPaused(true);
    }

    const onContinue = (): void => {
        setIsPaused(false);
    }

    const onStop = (): void => {
        const item: StopClickInterface = {
            amount: 1,
            date: createDateObject(),
        }
        dispatch(updateStopClicks(item));
        setIsStart(false);
        setTime(defaultTime);
        setDefaultState(false);
    }

    const onComplete = (): void => {
        setIsCompleted(true);
        setIsStart(false);
        setIsPaused(false);
        updateTasksList();
        setIsBreak(true);
        setTime(numberOfBreaks < 4 ? breakTime : longBreakTime);
        const count = numberOfBreaks + 1;
        setNumberOfBreaks(count > 4 ? 0 : count)

    }

    const onSkip = (): void => {
        setIsCompleted(false);
        setIsStart(false);
        setIsBreak(false);
        setTime(sessionTime);
    }

    const onTimeOver = (): void => {
        setIsStart(false);
        setIsPaused(false);
        if (!isBreak) {
            const item: TimeInterface = {
                amount: sessionTime,
                date: createDateObject(),
            }
            dispatch(updateWorkTime(item));
            updateTasksList();
            setIsBreak(true);
            setTime(numberOfBreaks < 4 ? breakTime : longBreakTime);
            const count = numberOfBreaks + 1;
            setNumberOfBreaks(count > 4 ? 0 : count)
        } else {
            setIsBreak(false);
            setTime(sessionTime);
        }
    }

    const onAddTime = (): void => {
        setTime(time + 1);
    }

    return (
        <div className={styles.container}>
            <div className={headerClasses}>
                {tasksToBeDone.length > 0 && (
                    <>
                        <p className={styles.task}>{currentTask?.title}</p>
                        <p className={styles.tomatoCouter}>Помидор {currentTask?.count}</p>
                    </>
                )}
            </div>
            <div className={styles.content}>
                <Clock
                    time={time}
                    isStarted={isStart}
                    isPaused={isPaused}
                    isCompleted={isCompleted}
                    onTimeOver={onTimeOver}
                    onAdd={onAddTime}
                />
                {tasksToBeDone.length > 0 && (
                    <div className={styles.taskLine}>
                        <span className={styles.taskNumber}>Задача 1 - </span>
                        <span className={styles.taskName}>{currentTask?.title}</span>
                    </div>
                )}
                <div className={styles.actions}>
                    <Actions
                        setDefault={defaultState}
                        isBreak={isBreak}
                        onStart={onStart}
                        onPause={onPause}
                        onContinue={onContinue}
                        onStop={onStop}
                        onComplete={onComplete}
                        onSkip={onSkip}
                    />
                </div>
            </div>
        </div>
    )
}