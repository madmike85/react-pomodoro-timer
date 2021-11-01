import React from 'react';
import styles from './chart.module.scss';

interface IChartProps {
    children: React.ReactNode;
}

export function Chart({ children }: IChartProps) {

    return (
        <div className={styles.chart}>
            {children}
        </div>
    )
}