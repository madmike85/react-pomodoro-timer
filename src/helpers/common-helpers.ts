import { ActionsEnum } from '../enums/actions.enum'
import { DateInterface } from '../interfaces/date.interface';
import { StatistticItemInterface } from '../interfaces/statistic-item.interface';

const daysOfWeekMap: Map<number, string> = new Map()
    .set(1, 'Понедельник')
    .set(2, 'Вторник')
    .set(3, 'Среда')
    .set(4, 'Четверг')
    .set(5, 'Пятница')
    .set(6, 'Суббота')
    .set(7, 'Воскресенье');

export const setActonName = (action: ActionsEnum): string => {
    switch(action) {
        case ActionsEnum.start:
            return 'Старт';
        case ActionsEnum.stop:
            return 'Стоп';
        case ActionsEnum.pause:
            return 'Пауза';
        case ActionsEnum.continue:
            return 'Продолжить';
        case ActionsEnum.complete:
            return 'Сделано';
        case ActionsEnum.skip:
            return 'Пропустить';
        default:
            return '';

    }
}

export const createDateObject = (): DateInterface => {
    const obj = new Date();

    const dateObj: DateInterface = {
        date: obj.getDate(),
        day: obj.getDay() === 0 ? 7 : obj.getDay(),
        month: obj.getMonth(),
        year: obj.getFullYear(),
    }

    return dateObj;
}

export const getDateStringFromDateOject = (obj: DateInterface): string => {
    return `${obj.date}_${obj.month}_${obj.year}`;
}

export const getDayName = (value: number): string => {
    if (!value) return '';

    return daysOfWeekMap.get(value) as string;
}

export const getWeek = (offset: number = 0): DateInterface[] => {
    const currOffset = offset * 7;
    const date = new Date();
    const targetDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - currOffset);
    const week: DateInterface[] = [];

    for (let i = 1; i <= 7; i++) {
        const first = targetDate.getDate() - targetDate.getDay() + i;
        const currDay = new Date(targetDate.setDate(first));

        const item: DateInterface = {
            date: currDay.getDate(),
            day: currDay.getDay() === 0 ? 7 : currDay.getDay(),
            month: currDay.getMonth(),
            year: currDay.getFullYear()
        };

        week.push(item);
    }

    return week;
}

export const getFocus = (dayStatistics: StatistticItemInterface): string => {
    if (!dayStatistics.workTime) {
        return '0%';
    }

    const focus = Math.round((dayStatistics.workTime + dayStatistics.pauseTime) / dayStatistics.workTime);
    return `${focus}%`;
}