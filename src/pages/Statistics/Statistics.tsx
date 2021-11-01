import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chart } from '../../components/Chart';
import { Bar } from '../../components/Chart/Bar';
import { CancelBigIcon, ClockBigIcon, FocusBigIcon } from '../../components/icons';
import { Select } from '../../components/ui-kit/Select';
import { getDayName, getFocus, getWeek } from '../../helpers/common-helpers';
import { convertMinutesToHHMMFormat, getFullTimeFromMinutes } from '../../helpers/convert-numerals-helpers';
import { SelectItemInterface } from '../../interfaces/select-item.interface';
import { StatistticItemInterface } from '../../interfaces/statistic-item.interface';
import { RootState } from '../../store/store';
import styles from './statistics.module.scss';

const options: SelectItemInterface[] = [
    {
        value: 0,
        title: 'Эта неделя',
    },
    {
        value: 1,
        title: 'Прошедшая неделя',
    },
    {
        value: 2,
        title: '2 недели назад',
    }
]

const daysList: SelectItemInterface[] = [
    {
        value: 1,
        title: 'Пн',
    },
    {
        value: 2,
        title: 'Вт',
    },
    {
        value: 3,
        title: 'Ср',
    },
    {
        value: 4,
        title: 'Чт',
    },
    {
        value: 5,
        title: 'Пт',
    },
    {
        value: 6,
        title: 'Сб',
    },
    {
        value: 7,
        title: 'Вс',
    },
];

const timeData: SelectItemInterface[] = [
    {
        value: 1,
        title: 0,
    },
    {
        value: 2,
        title: 0,
    },
    {
        value: 3,
        title: 0,
    },
    {
        value: 4,
        title: 0,
    },
    {
        value: 5,
        title: 0,
    },
    {
        value: 6,
        title: 0,
    },
    {
        value: 7,
        title: 0,
    },
]

const defaultDayStatistics: StatistticItemInterface = {
    date: {
        date: 0,
        day: 0,
        month: 0,
        year: 0,
    },
    stopClicks: 0,
    completedTasks: 0,
    workTime: 0,
    pauseTime: 0,
}

export function Statistics() {
    const statistics = useSelector<RootState, StatistticItemInterface[]>(state => state.statistics)
    const [selectedItemOption, setSelectedOption] = useState(options[0]);
    const [currentDayId, setCurrentDayId] = useState(1);
    const [selectedDay, setSelectedDay] = useState(getDayName(1));
    const [weekStatistics, setWeekStatistics] = useState<StatistticItemInterface[]>([])
    const [activityData, setActivityData] = useState<SelectItemInterface[]>(timeData);
    const [dayStatistics, setDayStatistics] = useState<StatistticItemInterface>(defaultDayStatistics)

    useEffect(() => {
        const week = getWeek(selectedItemOption.value);
        const weekData = statistics.filter(item => week.some(t => {
            return t.date === item.date.date &&
                t.day === item.date.day &&
                t.month === item.date.month &&
                t.year === item.date.year
        }));
        setWeekStatistics(weekData);
    }, [selectedItemOption, statistics]);

    useEffect(() => {
        const barData = timeData.map((el: SelectItemInterface) => {
            const val = weekStatistics.find((item: StatistticItemInterface) => item.date.day === el.value);
            if (val) {
                el.title = val.workTime + val.pauseTime;
            } else {
                el.title = 0;
            }
            return el;
        })
        setActivityData(barData);
    }, [weekStatistics]);

    useEffect(() => {
        const dayData = weekStatistics.find((item: StatistticItemInterface) => item.date.day === currentDayId);
        if (dayData) {
            setDayStatistics(dayData);
        } else {
            setDayStatistics(defaultDayStatistics);
        }
    }, [weekStatistics, currentDayId]);

    const onOptionSelect = (item: SelectItemInterface): void => {
        setSelectedOption(item);
    }

    const onLegendItemClick = (value: number): void => {
        setCurrentDayId(value);
        setSelectedDay(getDayName(value));
    }

    const focusClasses = classNames(
        styles.dataContainer,
        { [styles.focus]: dayStatistics.workTime + dayStatistics.pauseTime > 0 },
    )

    const pauseClasses = classNames(
        styles.dataContainer,
        { [styles.pause]: dayStatistics.workTime + dayStatistics.pauseTime > 0 },
    )

    const stopsClasses = classNames(
        styles.dataContainer,
        { [styles.stops]: dayStatistics.workTime + dayStatistics.pauseTime > 0 },
    )

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Ваша активность</h2>
                <div className={styles.select}>
                    <Select options={options} selectedItem={selectedItemOption} onSelect={(item) => onOptionSelect(item)} />
                </div>
            </div>
            <div className={styles.content}>
                <div className={styles.dayActivity}>
                    <p className={styles.dayTitle}>{selectedDay}</p>
                    {dayStatistics.workTime + dayStatistics.pauseTime === 0 && (
                        <p className={styles.dayText}>
                            Нет данных
                        </p>
                    )}
                    {dayStatistics.workTime + dayStatistics.pauseTime > 0 && (
                        <p className={styles.dayText}>
                            Вы работали над задачами в течение <span>{getFullTimeFromMinutes(dayStatistics.workTime + dayStatistics.pauseTime)}</span>
                        </p>
                    )}
                </div>
                <div className={styles.pomodoroContainer}>
                    {dayStatistics.workTime + dayStatistics.pauseTime === 0 && (
                        <div className={styles.emptyPomodoro}>
                            <img src="./assets/images/tomato-big.png" alt="tomato-big" />
                        </div>
                    )}
                    {dayStatistics.workTime + dayStatistics.pauseTime > 0 && (
                        <>
                            <div className={styles.pomodoroCounter}>
                                <img src="./assets/images/tomato-small.png" alt="tomato-small" />
                                <p>x {dayStatistics.completedTasks}</p>
                            </div>
                            <div className={styles.pomodoroTitle}>
                                <p>{dayStatistics.completedTasks} помидора</p>
                            </div>
                        </>
                    )}
                </div>
                <div className={styles.chart}>
                    <div className={styles.barChart}>
                        <Chart>
                            {activityData.map((item) => (
                                <div
                                    key={item.value}
                                    className={styles.bar}
                                    onClick={() => onLegendItemClick(item.value)}
                                >
                                    <Bar width={77} height={item.title as number} isActive={currentDayId === item.value} />
                                </div>
                            ))}
                        </Chart>
                    </div>
                    <ul className={styles.legend}>
                        {daysList.map((item) => (
                            <li
                                className={`${styles.legendItem} ${currentDayId === item.value ? styles.activeItem : ''}`}
                                key={item.value}
                                onClick={() => onLegendItemClick(item.value)}
                            >
                                {item.title}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.background}>
                        <div className={styles.line}>
                            <div className={styles.dash}></div>
                            <p className={styles.lineTime}>25 мин</p>
                        </div>
                        <div className={styles.line}>
                            <div className={styles.dash}></div>
                            <p className={styles.lineTime}>50 мин</p>
                        </div>
                        <div className={styles.line}>
                            <div className={styles.dash}></div>
                            <p className={styles.lineTime}>1 ч 15 мин</p>
                        </div>
                        <div className={styles.line}>
                            <div className={styles.dash}></div>
                            <p className={styles.lineTime}>1 ч 40 мин</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.dataRow}>
                <div className={focusClasses}>
                    <div className={styles.dataColumn}>
                        <p className={styles.dataTitle}>Фокус</p>
                        <p className={styles.dataValue}>
                            {getFocus(dayStatistics)}
                        </p>
                    </div>
                    <div className={styles.dataIcon}>
                        <FocusBigIcon />
                    </div>
                </div>
                <div className={pauseClasses}>
                    <div className={styles.dataColumn}>
                        <p className={styles.dataTitle}>Время на паузе</p>
                        <p className={styles.dataValue}>{convertMinutesToHHMMFormat(dayStatistics.pauseTime)}</p>
                    </div>
                    <div className={styles.dataIcon}>
                        <ClockBigIcon />
                    </div>
                </div>
                <div className={stopsClasses}>
                    <div className={styles.dataColumn}>
                        <p className={styles.dataTitle}>Остановки</p>
                        <p className={styles.dataValue}>{dayStatistics.stopClicks}</p>
                    </div>
                    <div className={styles.dataIcon}>
                        <CancelBigIcon />
                    </div>
                </div>
            </div>
        </div>
    )
}