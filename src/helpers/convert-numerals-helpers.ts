import { NumeralForms } from '../interfaces/numeral-forms.interface';

const minutesUnits: NumeralForms = {single: 'минуты', multi: 'минут', plural: 'минут'};
const hoursUnits: NumeralForms = {single: 'часа', multi: 'часов', plural: 'часов'};

const convertNumerals = (count: number, units: NumeralForms): string => {
    let unit = '';

    if (count >= 11 && count <= 14) {
        unit = units.plural;
    } else {
        const lastNumber = count % 10;

        if (lastNumber === 0 || (lastNumber >= 5 && lastNumber <= 9)) {
            unit = units.plural;
        } else if (lastNumber === 1) {
            unit = units.single;
        } else if (lastNumber >= 2 && lastNumber <= 4) {
            unit = units.multi;
        }
    }

    return unit;
}

const getTimeObjectFromMinutes = (totalMinutes: number): {hours: number, minutes: number} => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);

    return {hours, minutes};
}

export const convertMinutesToHHMMFormat = (totalMinutes: number): string => {
    const { hours, minutes } = getTimeObjectFromMinutes(totalMinutes);
    return `${hours > 0 ? `${hours}ч ` : ''}${minutes}м`;
}

export const getFullTimeFromMinutes = (totalMinutes: number): string => {
    const { hours, minutes } = getTimeObjectFromMinutes(totalMinutes);
    return `${hours > 0 ? `${hours} ${convertNumerals(hours, hoursUnits)} ` : ''}${minutes} ${convertNumerals(minutes, minutesUnits)}`;
}