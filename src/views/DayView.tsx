import React, { useEffect, useRef } from 'react';
import { generateTimeSlots, formatDateFull } from '../utils/dateUtils';
import { useAppointments } from '../context/AppointmentContext';
import type { Appointment } from '../types';

interface DayViewProps {
    currentDate: Date;
    onEditAppointment: (appt: Appointment) => void;
}

export const DayView: React.FC<DayViewProps> = ({ currentDate, onEditAppointment }) => {
    const { getAppointmentsByDate } = useAppointments();
    const scrollRef = useRef<HTMLDivElement>(null);

    const timeSlots = generateTimeSlots();
    const appointments = getAppointmentsByDate(currentDate);

    // Scroll to 8:00 AM on mount
    useEffect(() => {
        if (scrollRef.current) {
            const slotHeight = 60; // 60px defined in CSS
            const startHour = 8;
            scrollRef.current.scrollTop = startHour * 2 * slotHeight;
        }
    }, []);

    const getPositionStyle = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
        const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
        const duration = endMinutes - startMinutes;

        // Each minute is 2px (60px per 30min slot)
        const top = startMinutes * 2;
        const height = duration * 2;

        return { top: `${top}px`, height: `${height}px` };
    };

    return (
        <div className="flex-1 overflow-hidden flex flex-col mx-4 mb-4 glass-panel relative">
            <div className="p-4 border-b border-white/5 bg-white/5 backdrop-blur-md sticky top-0 z-20">
                <h3 className="text-xl font-semibold text-white text-center capitalize">
                    {formatDateFull(currentDate)}
                </h3>
            </div>

            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto custom-scrollbar relative bg-black/20"
            >
                <div className="relative min-h-[2880px]"> {/* 24h * 60min * 2px = 2880px */}

                    {/* Grid Lines */}
                    {timeSlots.map((time, index) => (
                        <div
                            key={time}
                            className="absolute w-full border-t border-white/5 flex items-start group hover:bg-white/[0.02] transition-colors"
                            style={{ top: `${index * 60}px`, height: '60px' }}
                        >
                            <span className="w-16 text-right pr-4 text-xs font-medium text-white/30 -mt-2 group-hover:text-white/60 transition-colors">
                                {time}
                            </span>
                            <div className="flex-1 h-full border-l border-white/5" />
                        </div>
                    ))}

                    {/* Appointments */}
                    {appointments.map(appt => {
                        const style = getPositionStyle(appt.start, appt.end);
                        return (
                            <div
                                key={appt.id}
                                onClick={() => onEditAppointment(appt)}
                                className="absolute left-20 right-4 rounded-lg p-3 cursor-pointer hover:brightness-110 active:scale-[0.99] transition-all duration-200 border-l-4 shadow-lg group z-10 overflow-hidden"
                                style={{
                                    ...style,
                                    backgroundColor: `${appt.color}40`, // 25% opacity
                                    borderColor: appt.color,
                                    boxShadow: `0 4px 12px ${appt.color}20`
                                }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                <h4 className="font-semibold text-white text-sm truncate relative z-10 flex gap-2 items-center">
                                    {appt.title}
                                </h4>
                                {parseInt(style.height) > 40 && (
                                    <p className="text-xs text-white/70 truncate relative z-10">{appt.description}</p>
                                )}
                            </div>
                        );
                    })}

                    {/* Current Time Indicator logic could be added here */}

                </div>
            </div>
        </div>
    );
};
