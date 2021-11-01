import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createDateObject } from '../../../helpers/common-helpers';
import { TimeInterface } from '../../../interfaces/time.interface';
import { updatePausedTime, updateWorkTime } from '../../../store/statistics/action';
import { PlusIcon } from '../../icons';
import styles from './clock.module.scss';

interface IClockInterface {
    time: number;
    isPaused: boolean;
    isStarted: boolean;
    isCompleted: boolean;
    onTimeOver?: () => void;
    onAdd?: () => void;
}

export function Clock({
    time,
    isPaused,
    isStarted,
    isCompleted,
    onTimeOver = () => { },
    onAdd = () => { },
}: IClockInterface) {
    const [duration, setDuration] = useState(time * 60);
    const [pauseDuration, setPauseDuration] = useState(0);
    const [paused, setPaused] = useState(false);
    const [started, setStarted] = useState(false);
    const dispatch = useDispatch();



    useEffect(() => {
        setDuration(time * 60);
    }, [time, started]);

    useEffect(() => {
        setStarted(isStarted);
    }, [isStarted]);

    useEffect(() => {
        setPaused(isPaused);
        if (!isPaused) {
            const item: TimeInterface = {
                amount: pauseDuration / 60,
                date: createDateObject(),
            }
            dispatch(updatePausedTime(item))
        }
    }, [isPaused, pauseDuration, dispatch]);

    useEffect(() => {
        if (isCompleted) {
            const item: TimeInterface = {
                amount: duration / 60,
                date: createDateObject(),
            }
            dispatch(updateWorkTime(item));
        }
        // eslint-disable-next-line    
    }, [isCompleted])

    useEffect(() => {
        let intervalTimeoutId: NodeJS.Timeout;
        let pausedIntervalTimeoutId: NodeJS.Timeout;

        const updateTimer = () => {
            if (duration > 0) {
                setDuration(duration => duration - 0.01);
            } else {
                onTimeOver();
            }
        }

        const updatePausedTimer = () => {
            setPauseDuration(pauseDuration => pauseDuration + 0.01);
        }

        if (started && !paused) {
            intervalTimeoutId = setInterval(updateTimer, 10);
        }

        if (paused) {
            pausedIntervalTimeoutId = setInterval(updatePausedTimer, 10);
        }

        return () => {
            if (intervalTimeoutId) {
                clearInterval(intervalTimeoutId);
            }

            if (pausedIntervalTimeoutId) {
                clearInterval(pausedIntervalTimeoutId);
            }
        }
    }, [paused, started, duration, onTimeOver]);

    const integerDuration = Math.ceil(duration);

    const minutes = Math.floor((integerDuration / 60) % 60);
    const seconds = Math.floor(integerDuration % 60);


    return (
        <div className={styles.container}>
            <span className={styles.clock}>
                {(minutes >= 10) ? minutes : `0${minutes}`}:
                {(seconds >= 10) ? seconds : `0${seconds}`}
            </span>
            <button className={styles.add} onClick={() => onAdd()}>
                <PlusIcon />
            </button>
        </div>
    )
}