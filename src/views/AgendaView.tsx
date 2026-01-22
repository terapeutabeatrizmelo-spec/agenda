import React from 'react';
import { format, isSameDay, isPast } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';
import { useAppointments } from '../context/AppointmentContext';
import type { Appointment } from '../types';

interface AgendaViewProps {
    onEditAppointment: (appointment: Appointment) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({ onEditAppointment }) => {
    const { appointments } = useAppointments();

    // Sort appointments by date/time
    const sortedAppointments = [...appointments].sort((a, b) =>
        new Date(a.start).getTime() - new Date(b.start).getTime()
    );

    // Group by date
    const groupedByDate = sortedAppointments.reduce((acc, appt) => {
        const dateKey = format(new Date(appt.start), 'yyyy-MM-dd');
        if (!acc[dateKey]) {
            acc[dateKey] = [];
        }
        acc[dateKey].push(appt);
        return acc;
    }, {} as Record<string, Appointment[]>);

    const today = new Date();

    return (
        <div className="flex-1 overflow-hidden flex flex-col mx-4 mb-4 glass-panel">
            {/* Header */}
            <div className="p-4 border-b border-white/10">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Calendar size={24} className="text-violet-400" />
                    Todos os Compromissos
                </h2>
                <p className="text-sm text-white/50 mt-1">
                    {sortedAppointments.length} {sortedAppointments.length === 1 ? 'compromisso agendado' : 'compromissos agendados'}
                </p>
            </div>

            {/* Appointments List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4">
                {sortedAppointments.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-white/30">
                        <Calendar size={64} className="mb-4" />
                        <p className="text-lg">Nenhum compromisso agendado</p>
                        <p className="text-sm mt-2">Use o botão + para criar um novo</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {Object.entries(groupedByDate).map(([dateKey, dayAppointments]) => {
                            const date = new Date(dateKey);
                            const isToday = isSameDay(date, today);
                            const isPastDate = isPast(date) && !isToday;

                            return (
                                <div key={dateKey} className="space-y-2">
                                    {/* Date Header */}
                                    <div className={`sticky top-0 bg-black/40 backdrop-blur-sm px-3 py-2 rounded-lg border ${isToday ? 'border-violet-500/50 bg-violet-500/10' : 'border-white/10'
                                        }`}>
                                        <div className="flex items-center gap-2">
                                            <span className={`text-sm font-semibold ${isToday ? 'text-violet-400' : 'text-white/70'
                                                }`}>
                                                {format(date, "EEEE, d 'de' MMMM", { locale: ptBR })}
                                            </span>
                                            {isToday && (
                                                <span className="text-xs bg-violet-500 text-white px-2 py-0.5 rounded-full">
                                                    Hoje
                                                </span>
                                            )}
                                            {isPastDate && (
                                                <span className="text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full">
                                                    Passado
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Appointments for this date */}
                                    <div className="space-y-2">
                                        {dayAppointments.map(appt => (
                                            <div
                                                key={appt.id}
                                                onClick={() => onEditAppointment(appt)}
                                                className={`p-4 rounded-xl border-l-4 cursor-pointer transition-all duration-200 hover:scale-[1.02] ${isPastDate ? 'opacity-60' : ''
                                                    }`}
                                                style={{
                                                    backgroundColor: `${appt.color}20`,
                                                    borderColor: appt.color,
                                                }}
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-semibold text-white text-base mb-2 truncate">
                                                            {appt.title}
                                                        </h3>

                                                        <div className="flex items-center gap-2 text-sm text-white/70">
                                                            <Clock size={14} />
                                                            <span>
                                                                {format(new Date(appt.start), 'HH:mm')} - {format(new Date(appt.end), 'HH:mm')}
                                                            </span>
                                                        </div>

                                                        {appt.description && (
                                                            <p className="mt-2 text-sm text-white/60 line-clamp-2">
                                                                {appt.description}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div
                                                        className="w-3 h-3 rounded-full shrink-0 mt-1"
                                                        style={{ backgroundColor: appt.color }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};
