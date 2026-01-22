import { addDays, getYear } from 'date-fns';

export interface Holiday {
    name: string;
    date: Date;
}

// Calculate Easter Sunday using Meeus/Jones/Butcher algorithm
function calculateEaster(year: number): Date {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-indexed
    const day = ((h + l - 7 * m + 114) % 31) + 1;

    return new Date(year, month, day);
}

// Get all Brazilian national holidays for a given year
export function getBrazilianHolidays(year: number): Holiday[] {
    const easter = calculateEaster(year);

    return [
        // Fixed holidays
        { name: 'Ano Novo', date: new Date(year, 0, 1) },
        { name: 'Tiradentes', date: new Date(year, 3, 21) },
        { name: 'Dia do Trabalho', date: new Date(year, 4, 1) },
        { name: 'Independência', date: new Date(year, 8, 7) },
        { name: 'N. Sra. Aparecida', date: new Date(year, 9, 12) },
        { name: 'Finados', date: new Date(year, 10, 2) },
        { name: 'Proclamação da República', date: new Date(year, 10, 15) },
        { name: 'Consciência Negra', date: new Date(year, 10, 20) },
        { name: 'Natal', date: new Date(year, 11, 25) },

        // Movable holidays (based on Easter)
        { name: 'Carnaval', date: addDays(easter, -47) },
        { name: 'Sexta-feira Santa', date: addDays(easter, -2) },
        { name: 'Páscoa', date: easter },
        { name: 'Corpus Christi', date: addDays(easter, 60) },
    ];
}

// Check if a date is a Brazilian holiday
export function isHoliday(date: Date): Holiday | null {
    const year = getYear(date);
    const holidays = getBrazilianHolidays(year);

    const holiday = holidays.find(h =>
        h.date.getFullYear() === date.getFullYear() &&
        h.date.getMonth() === date.getMonth() &&
        h.date.getDate() === date.getDate()
    );

    return holiday || null;
}

// Get holiday name for a date (if it's a holiday)
export function getHolidayName(date: Date): string | null {
    const holiday = isHoliday(date);
    return holiday ? holiday.name : null;
}
