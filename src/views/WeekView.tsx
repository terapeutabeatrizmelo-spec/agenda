import React, { useEffect, useRef } from 'react';
import { format, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getWeekDays, generateTimeSlots } from '../utils/dateUtils';
import { useAppointments } from '../context/AppointmentContext';
import type { Appointment } from '../types';

interface WeekViewProps {
    currentDate: Date;
    onEditAppointment: (appt: Appointment) => void;
}

export const WeekView: React.FC<WeekViewProps> = ({ currentDate, onEditAppointment }) => {
    const { appointments } = useAppointments();
    const scrollRef = useRef<HTMLDivElement>(null);

    const weekDays = getWeekDays(currentDate);
    const timeSlots = generateTimeSlots();

    // Scroll to 8:00 AM on mount
    useEffect(() => {
        if (scrollRef.current) {
            const slotHeight = 60;
            const startHour = 8;
            scrollRef.current.scrollTop = startHour * 2 * slotHeight;
        }
    }, []);

    const getAppointmentsForDay = (day: Date) => {
        const dayString = day.toISOString().split('T')[0];
        return appointments.filter(appt => appt.start.startsWith(dayString));
    };

    const getPositionStyle = (start: string, end: string) => {
        const startDate = new Date(start);
        const endDate = new Date(end);

        const startMinutes = startDate.getHours() * 60 + startDate.getMinutes();
        const endMinutes = endDate.getHours() * 60 + endDate.getMinutes();
        const duration = endMinutes - startMinutes;

        const top = startMinutes * 2;
        const height = duration * 2;

        return { top: `${top}px`, height: `${height}px` };
    };

    const isToday = (day: Date) => isSameDay(day, new Date());

    return (
        <div className="flex-1 overflow-hidden flex flex-col mx-4 mb-4 glass-panel relative">
            {/* Week Container with Horizontal Scroll support */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                {/* Header */}
                <div className="border-b border-white/5 bg-white/5 backdrop-blur-md z-20 overflow-hidden shrink-0" ref={el => {
                    // Sync header scroll with content scroll if needed, though grid structure handles alignment
                    if (el && scrollRef.current) {
                        el.scrollLeft = scrollRef.current.scrollLeft;
                    }
                }}>
                    <div className="grid grid-cols-[60px_repeat(7,minmax(120px,1fr))] md:grid-cols-[80px_repeat(7,1fr)] min-w-[900px]">
                        <div className="p-4" /> {/* Empty corner */}
                        {weekDays.map((day) => (
                            <div
                                key={day.toISOString()}
                                className={`p-2 md:p-4 text-center border-l border-white/5 ${isToday(day) ? 'bg-violet-500/10' : ''
                                    }`}
                            >
                                <div className={`text-[10px] md:text-xs font-medium uppercase tracking-wider ${isToday(day) ? 'text-violet-400' : 'text-white/50'
                                    }`}>
                                    {format(day, 'EEE', { locale: ptBR }).replace('.', '')}
                                </div>
                                <div className={`text-xl md:text-2xl font-bold mt-1 ${isToday(day)
                                    ? 'text-white bg-violet-500 rounded-full w-8 h-8 md:w-10 md:h-10 flex items-center justify-center mx-auto'
                                    : 'text-white'
                                    }`}>
                                    {format(day, 'd', { locale: ptBR })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scrollable Grid */}
                <div
                    ref={scrollRef}
                    className="flex-1 overflow-auto custom-scrollbar relative bg-black/20"
                >
                    <div className="relative min-h-[2880px] min-w-[900px]">
                        {/* Time Grid with sticky time labels */}
                        <div className="grid grid-cols-[60px_repeat(7,minmax(120px,1fr))] md:grid-cols-[80px_repeat(7,1fr)] absolute inset-0">
                            {/* Time Labels Column */}
                            <div className="relative border-r border-white/5 bg-black/40 sticky left-0 z-10 backdrop-blur-sm">
                                {timeSlots.map((time, index) => (
                                    <div
                                        key={time}
                                        className="absolute w-full flex items-start justify-end pr-2"
                                        style={{ top: `${index * 60}px`, height: '60px' }}
                                    >
                                        <span className="text-[10px] font-medium text-white/30 -mt-2">
                                            {time}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Day Columns */}
                            {weekDays.map((day, dayIndex) => {
                                const dayAppointments = getAppointmentsForDay(day);
                                return (
                                    <div
                                        key={day.toISOString()}
                                        className="relative border-l border-white/5 first:border-l-0"
                                    >
                                        {/* Hour Lines */}
                                        {timeSlots.map((time, index) => (
                                            <div
                                                key={`${dayIndex}-${time}`}
                                                className="absolute w-full border-t border-white/5 hover:bg-white/[0.02] transition-colors"
                                                style={{ top: `${index * 60}px`, height: '60px' }}
                                            />
                                        ))}

                                        {/* Appointments */}
                                        {dayAppointments.map(appt => {
                                            const style = getPositionStyle(appt.start, appt.end);
                                            return (
                                                <div
                                                    key={appt.id}
                                                    onClick={() => onEditAppointment(appt)}
                                                    className="absolute left-1 right-1 rounded-lg p-1.5 md:p-2 cursor-pointer hover:brightness-110 active:scale-[0.99] transition-all duration-200 border-l-4 shadow-lg group z-10 overflow-hidden"
                                                    style={{
                                                        ...style,
                                                        backgroundColor: `${appt.color}40`,
                                                        borderColor: appt.color,
                                                        boxShadow: `0 4px 12px ${appt.color}20`
                                                    }}
                                                >
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    <h4 className="font-semibold text-white text-[10px] md:text-xs truncate relative z-10">
                                                        {appt.title}
                                                    </h4>
                                                    {parseInt(style.height) > 40 && (
                                                        <p className="text-[9px] md:text-[10px] text-white/70 truncate relative z-10 mt-0.5 md:mt-1">
                                                            {format(new Date(appt.start), 'HH:mm')}
                                                        </p>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
