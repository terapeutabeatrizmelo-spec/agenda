import React from 'react';
import { format, isSameMonth, isSameDay } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { getMonthDays } from '../utils/dateUtils';
import { useAppointments } from '../context/AppointmentContext';
import type { Appointment } from '../types';

interface MonthViewProps {
    currentDate: Date;
    onEditAppointment: (appt: Appointment) => void;
}

export const MonthView: React.FC<MonthViewProps> = ({ currentDate, onEditAppointment }) => {
    const { appointments } = useAppointments();

    const monthDays = getMonthDays(currentDate);
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

    const getAppointmentsForDay = (day: Date) => {
        const dayString = day.toISOString().split('T')[0];
        return appointments.filter(appt => appt.start.startsWith(dayString));
    };

    const isToday = (day: Date) => isSameDay(day, new Date());
    const isCurrentMonth = (day: Date) => isSameMonth(day, currentDate);

    // Group days into weeks
    const weeks: Date[][] = [];
    for (let i = 0; i < monthDays.length; i += 7) {
        weeks.push(monthDays.slice(i, i + 7));
    }

    return (
        <div className="flex-1 overflow-hidden flex flex-col mx-4 mb-4 glass-panel relative">
            {/* Month Header */}
            <div className="p-4 border-b border-white/5 bg-white/5 backdrop-blur-md">
                <h3 className="text-2xl font-bold text-white text-center capitalize">
                    {format(currentDate, 'MMMM yyyy', { locale: ptBR })}
                </h3>
            </div>

            {/* Calendar Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                <div className="h-full flex flex-col min-w-[600px] md:min-w-0">
                    {/* Weekday Headers */}
                    <div className="grid grid-cols-7 gap-1 md:gap-2 mb-2">
                        {weekDays.map(day => (
                            <div key={day} className="text-center text-[10px] md:text-xs font-semibold text-white/50 uppercase tracking-wider py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Days */}
                    <div className="flex-1 grid grid-rows-[repeat(auto-fit,minmax(0,1fr))] gap-1 md:gap-2">
                        {weeks.map((week, weekIndex) => (
                            <div key={weekIndex} className="grid grid-cols-7 gap-1 md:gap-2">
                                {week.map((day, dayIndex) => {
                                    const dayAppointments = getAppointmentsForDay(day);
                                    const isCurrentMonthDay = isCurrentMonth(day);
                                    const isTodayDay = isToday(day);

                                    return (
                                        <div
                                            key={`${weekIndex}-${dayIndex}`}
                                            className={`
                                                relative rounded-lg md:rounded-xl border transition-all
                                                ${isCurrentMonthDay
                                                    ? 'bg-white/5 border-white/10 hover:bg-white/10'
                                                    : 'bg-black/20 border-white/5 opacity-40'
                                                }
                                                ${isTodayDay ? 'ring-1 md:ring-2 ring-violet-500' : ''}
                                                min-h-[60px] md:min-h-[80px] p-1 md:p-2 flex flex-col group
                                            `}
                                        >
                                            {/* Day Number */}
                                            <div className="flex justify-between items-start mb-1">
                                                <span className={`
                                                    text-xs md:text-sm font-semibold
                                                    ${isTodayDay
                                                        ? 'bg-violet-500 text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center'
                                                        : isCurrentMonthDay
                                                            ? 'text-white'
                                                            : 'text-white/30'
                                                    }
                                                `}>
                                                    {format(day, 'd')}
                                                </span>
                                                {dayAppointments.length > 0 && (
                                                    <span className="text-[8px] md:text-[10px] font-medium text-white/50 bg-white/10 px-1 md:px-1.5 py-0.5 rounded-full">
                                                        {dayAppointments.length}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Appointments */}
                                            <div className="flex-1 flex flex-col gap-0.5 md:gap-1 overflow-hidden">
                                                {dayAppointments.slice(0, 3).map(appt => (
                                                    <div
                                                        key={appt.id}
                                                        onClick={() => onEditAppointment(appt)}
                                                        className="text-[8px] md:text-[10px] font-medium px-1 md:px-2 py-0.5 md:py-1 rounded cursor-pointer hover:brightness-110 transition-all truncate border-l-[1.5px] md:border-l-2"
                                                        style={{
                                                            backgroundColor: `${appt.color}30`,
                                                            borderColor: appt.color,
                                                            color: 'white'
                                                        }}
                                                        title={`${appt.title} - ${format(new Date(appt.start), 'HH:mm')}`}
                                                    >
                                                        <span className="truncate block">
                                                            <span className="hidden md:inline">{format(new Date(appt.start), 'HH:mm')} </span>
                                                            {appt.title}
                                                        </span>
                                                    </div>
                                                ))}
                                                {dayAppointments.length > 3 && (
                                                    <div className="text-[8px] md:text-[9px] text-white/40 text-center py-0.5">
                                                        +{dayAppointments.length - 3}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
