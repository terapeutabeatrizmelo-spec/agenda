import { describe, it, expect, beforeEach, vi } from 'vitest';
import { saveAppointments, getAppointments } from './storage';
import type { Appointment } from '../types';

describe('storage utils', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.clearAllMocks();
    });

    const mockAppointment: Appointment = {
        id: '1',
        title: 'Test Appointment',
        start: '2026-01-20T10:00',
        end: '2026-01-20T11:00',
        description: 'Test Desc',
        category: 'work',
        color: '#000'
    };

    it('should save appointments to localStorage', () => {
        saveAppointments([mockAppointment]);
        const stored = localStorage.getItem('agenda_premium_data');
        expect(stored).toBe(JSON.stringify([mockAppointment]));
    });

    it('should retrieve appointments from localStorage', () => {
        localStorage.setItem('agenda_premium_data', JSON.stringify([mockAppointment]));
        const appointments = getAppointments();
        expect(appointments).toHaveLength(1);
        expect(appointments[0]).toEqual(mockAppointment);
    });

    it('should return empty array if storage is empty', () => {
        const appointments = getAppointments();
        expect(appointments).toEqual([]);
    });

    it('should handle JSON parse errors gracefully', () => {
        localStorage.setItem('agenda_premium_data', 'invalid-json');
        const spy = vi.spyOn(console, 'error').mockImplementation(() => { });

        const appointments = getAppointments();
        expect(appointments).toEqual([]);
        expect(spy).toHaveBeenCalled();
    });
});
