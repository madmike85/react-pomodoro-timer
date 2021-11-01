import classNames from 'classnames';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { Menu } from './Menu';
import styles from './task.module.scss';

interface ITaskProps {
    title: string;
    count: number;
    completed: boolean;
    onDeleteTask: () => void;
    onUpdateTask: (count: number, title: string) => void;
}

export function Task({ title, count, completed, onDeleteTask, onUpdateTask }: ITaskProps) {
    const [taskCount, setTaskCount] = useState(count);
    const [taskTitle, setTaskTitle] = useState(title);
    const [isEditing, setIsEditing] = useState(false);
    const ref = useRef<HTMLInputElement>(null);

    const taskTitleClasses = classNames(
        styles.title,
        { [styles.completed]: completed },
    );

    const onAdd = () => {
        const newCount = taskCount + 1
        onUpdateTask(newCount, taskTitle);
        setTaskCount(newCount)
    }

    const onSubtract = () => {
        const newCount = taskCount - 1
        setTaskCount(newCount)
        onUpdateTask(newCount, taskTitle);
    }

    const onEdit = () => {
        setIsEditing(true);
    }

    const onDelete = () => {
        onDeleteTask();
    }

    const onValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value);
    }

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onUpdateTask(taskCount, taskTitle);
            setIsEditing(false);
        }
    }

    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (event.target instanceof Node && !ref.current?.contains(event.target)) {
                if (isEditing) {
                    onUpdateTask(taskCount, taskTitle);
                    setIsEditing(false);
                }
            }
        }
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    }, [onUpdateTask, isEditing, taskCount, taskTitle]);

    useEffect(() => {
        if (isEditing) {
            ref.current?.focus();
        }
    }, [isEditing])


    return (
        <div className={styles.task}>
            <div className={styles.count}>{taskCount}</div>
            {!isEditing && (
                <span className={taskTitleClasses}>{taskTitle}</span>
            )}
            {isEditing && (
                <input
                    className={styles.input}
                    type="text"
                    ref={ref}
                    value={taskTitle}
                    onChange={onValueChange}
                    onKeyDown={onKeyDown}
                />
            )}
            <div className={styles.menu}>
                <Menu
                    count={taskCount}
                    onAdd={onAdd}
                    onSubtract={onSubtract}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            </div>
        </div>
    )
}