import React from 'react';
import { nanoid } from 'nanoid'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TaskInterface } from '../../interfaces/task.interface';
import { Button } from '../ui-kit/Button';
import { Input } from '../ui-kit/Input';
import styles from './tasks-container.module.scss';
import { TasksList } from './TasksList';
import { addTask } from '../../store/tasks/action';

export function TasksContainer() {
    const dispatch = useDispatch();
    const [taskTitle, setTaskTitle] = useState<string>('');

    const onTaskTitleChange = (value: string) => {
        setTaskTitle(value);
    }

    const onTaskCreated = () => {
        if (taskTitle) {
            const task: TaskInterface = {
                id: nanoid(),
                title: taskTitle,
                count: 1,
                completed: false,
            }

            dispatch(addTask(task));

            setTaskTitle('');
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.input}>
                <Input placeholder='Название задачи' onChange={onTaskTitleChange} value={taskTitle} />
            </div>
            <div className={styles.button}>
                <Button theme='green' onClick={onTaskCreated}>
                    Добавить
                </Button>
            </div>
            <TasksList />
        </div>
    )
}