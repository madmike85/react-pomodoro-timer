import React from 'react';
import { LogoIcon, EqualizerIcon } from '../icons';
import { NavLink } from 'react-router-dom'
import styles from './header.module.scss';

export function Header() {
    return (
        <header className={styles.header}>
            <NavLink to='/' className={styles.logo}>
                <div className={styles.logoIcon}>
                    <LogoIcon />
                </div>
                <span className={styles.logoText}>
                    pomodoro_box
                </span>
            </NavLink>
            <NavLink to='/statistics' className={styles.statistics}>
                <div className={styles.statisticsIcon}>
                    <EqualizerIcon />
                </div>
                <span className={styles.statisticsText}>
                    Статистика
                </span>
            </NavLink>
        </header>
    )
}