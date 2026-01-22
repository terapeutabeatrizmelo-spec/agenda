import type { Appointment } from '../types';

const STORAGE_KEY = 'agenda_premium_data';

export const saveAppointments = (appointments: Appointment[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appointments));
    } catch (error) {
        console.error('Failed to save appointments:', error);
    }
};

export const getAppointments = (): Appointment[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load appointments:', error);
        return [];
    }
};
