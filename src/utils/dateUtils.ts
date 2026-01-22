import { format, addDays, subDays, startOfWeek, endOfWeek, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMinutes, startOfDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const formatDateFull = (date: Date) => {
    return format(date, "EEEE, d 'de' MMMM", { locale: ptBR });
};

export const formatTime = (date: Date) => {
    return format(date, 'HH:mm', { locale: ptBR });
};

export const formatMonthYear = (date: Date) => {
    return format(date, 'MMMM yyyy', { locale: ptBR });
};

export const getWeekDays = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 0 }); // Sunday start
    const end = endOfWeek(date, { weekStartsOn: 0 });
    return eachDayOfInterval({ start, end });
};

export const generateTimeSlots = () => {
    const slots = [];
    let current = startOfDay(new Date());
    for (let i = 0; i < 48; i++) { // 24h * 2 (30min slots)
        slots.push(format(current, 'HH:mm'));
        current = addMinutes(current, 30);
    }
    return slots;
};

export const getMonthDays = (date: Date) => {
    const start = startOfMonth(date);
    const end = endOfMonth(date);
    const days = eachDayOfInterval({ start, end });

    // Add padding days from previous month to start on Sunday
    const firstDayOfWeek = startOfWeek(start, { weekStartsOn: 0 });
    const paddingStart = isSameDay(start, firstDayOfWeek)
        ? []
        : eachDayOfInterval({ start: firstDayOfWeek, end: subDays(start, 1) });

    // Add padding days from next month to complete the grid
    const lastDayOfWeek = endOfWeek(end, { weekStartsOn: 0 });
    const paddingEnd = isSameDay(end, lastDayOfWeek)
        ? []
        : eachDayOfInterval({ start: addDays(end, 1), end: lastDayOfWeek });

    return [...paddingStart, ...days, ...paddingEnd];
};

export { addDays, subDays, isSameDay, startOfMonth, startOfWeek, addMinutes };
