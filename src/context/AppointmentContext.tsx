import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Appointment } from '../types';
import { getAppointments, saveAppointments } from '../utils/storage';

interface AppointmentContextType {
    appointments: Appointment[];
    addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
    updateAppointment: (id: string, updated: Partial<Appointment>) => void;
    deleteAppointment: (id: string) => void;
    getAppointmentsByDate: (date: Date) => Appointment[];
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    useEffect(() => {
        // Load initial data
        const stored = getAppointments();
        setAppointments(stored);

        // Request notification permission
        if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission();
        }
    }, []);

    useEffect(() => {
        saveAppointments(appointments);
    }, [appointments]);

    const addAppointment = (data: Omit<Appointment, 'id'>) => {
        const newAppointment: Appointment = {
            ...data,
            id: uuidv4(),
        };
        setAppointments(prev => [...prev, newAppointment]);
    };

    const updateAppointment = (id: string, updated: Partial<Appointment>) => {
        setAppointments(prev => prev.map(appt =>
            appt.id === id ? { ...appt, ...updated } : appt
        ));
    };

    const deleteAppointment = (id: string) => {
        setAppointments(prev => prev.filter(appt => appt.id !== id));
    };

    const getAppointmentsByDate = (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        return appointments.filter(appt => appt.start.startsWith(dateString));
    };

    return (
        <AppointmentContext.Provider value={{
            appointments,
            addAppointment,
            updateAppointment,
            deleteAppointment,
            getAppointmentsByDate
        }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export const useAppointments = () => {
    const context = useContext(AppointmentContext);
    if (context === undefined) {
        throw new Error('useAppointments must be used within an AppointmentProvider');
    }
    return context;
};
