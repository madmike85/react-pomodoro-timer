import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TaskInterface } from '../../../interfaces/task.interface';
import { RootState } from '../../../store/store';
import { updateTasks } from '../../../store/tasks/action';
import { Modal } from './Modal';
import { Task } from './Task/Task';
import styles from './tasks-list.module.scss';


export function TasksList() {
    const tasks = useSelector<RootState, TaskInterface[]>(state => state.tasks);
    const [totalTime, setTotalTime] = useState(0);
    const [isModalShown, setIsModalShow] = useState(false);
    const [currentTaskId, setCurrentTaskId] = useState('');
    useEffect(() => {
        const calculateTotalTime = () => {
            const total = tasks.reduce((acc: number, curr: TaskInterface) => {
                return acc + (25 * curr.count);
            }, 0);
            setTotalTime(total);
        }
        calculateTotalTime();
    }, [tasks])

    const dispatch = useDispatch();

    const showModal = (id: string) => {
        setCurrentTaskId(id);
        setIsModalShow(true);
    }

    const closeModal = () => {
        setIsModalShow(false);
    }

    const deleteTask = () => {
        setIsModalShow(false);
        const newList = tasks.filter((task: TaskInterface) => task.id !== currentTaskId);
        dispatch(updateTasks(newList));
    }

    const updateTask = (id: string, count: number, title: string) => {
        const newList = tasks.map((task: TaskInterface) => {
            if (task.id === id) {
                const newTask = {
                    id: task.id,
                    count,
                    title,
                }
                return newTask;
            }
            return task;
        });

        dispatch(updateTasks(newList));
    }

    return (
        <>
            {tasks.length > 0 && (
                <div>
                    <ul className={styles.list}>
                        <AnimatePresence>
                            {tasks.map((task: TaskInterface) => (
                                <motion.li
                                    key={task.id}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.5 }}
                                    transition={{ cubicBezier: [.36, -0.64, .34, 1.76] }}
                                    className={styles.item}
                                >
                                    <Task
                                        title={task.title}
                                        count={task.count}
                                        completed={task.completed}
                                        onDeleteTask={() => showModal(task.id)}
                                        onUpdateTask={(count, title) => updateTask(task.id, count, title)}
                                    />
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                    <p className={styles.time}>
                        {totalTime} мин
                    </p>
                </div>
            )}
            {isModalShown &&
                <Modal
                    onConfirm={deleteTask}
                    onCancel={closeModal}
                    onClose={closeModal}
                />
            }
        </>
    )
}