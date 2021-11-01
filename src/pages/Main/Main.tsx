import React from 'react';
import { Legend } from '../../components/Legend';
import { TasksContainer } from '../../components/TasksContainer';
import { Timer } from '../../components/Timer';
import styles from './main.module.scss';

export function Main() {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.legend}>
                    <Legend />
                </div>
                <TasksContainer />
            </div>
            <div className={styles.right}>
                <Timer />
            </div>
        </div>
    )
}