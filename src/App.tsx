import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { FloatingActionButton } from './components/ui/FloatingActionButton';
import { DayView } from './views/DayView';
import { WeekView } from './views/WeekView';
import { MonthView } from './views/MonthView';
import { Modal } from './components/ui/Modal';
import { AppointmentForm } from './components/ui/AppointmentForm';
import { AppointmentProvider, useAppointments } from './context/AppointmentContext';
import { useToast } from './context/ToastContext';
import { AgendaView } from './views/AgendaView';
import type { ViewMode, Appointment } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | undefined>(undefined);

  const { addAppointment, updateAppointment, deleteAppointment } = useAppointments();
  const { addToast } = useToast();

  const handlePrevious = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() - 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    setCurrentDate(newDate);
  };

  const handleNext = () => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate.setDate(newDate.getDate() + 1);
    } else if (viewMode === 'week') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddClick = () => {
    setEditingAppointment(undefined);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: Omit<Appointment, 'id'>) => {
    if (editingAppointment) {
      updateAppointment(editingAppointment.id, data);
      addToast('Compromisso atualizado!', 'success');
    } else {
      addAppointment(data);
      addToast('Compromisso criado!', 'success');
    }
    setIsModalOpen(false);
    setEditingAppointment(undefined);
  };

  const handleDelete = (id: string) => {
    deleteAppointment(id);
    addToast('Compromisso excluído', 'info');
    setIsModalOpen(false);
    setEditingAppointment(undefined);
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        viewMode={viewMode}
        onViewChange={setViewMode}
      />

      <Header
        currentDate={currentDate}
        onPrev={handlePrevious}
        onNext={handleNext}
        onToday={handleToday}
        onMenuClick={() => setIsSidebarOpen(true)}
      />

      {viewMode === 'agenda' && <AgendaView onEditAppointment={handleEditAppointment} />}
      {viewMode === 'day' && <DayView currentDate={currentDate} onEditAppointment={handleEditAppointment} />}
      {viewMode === 'week' && <WeekView currentDate={currentDate} onEditAppointment={handleEditAppointment} />}
      {viewMode === 'month' && <MonthView currentDate={currentDate} onEditAppointment={handleEditAppointment} onPrev={handlePrevious} onNext={handleNext} />}

      <FloatingActionButton onClick={handleAddClick} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingAppointment ? 'Editar Compromisso' : 'Novo Compromisso'}>
        <AppointmentForm
          initialData={editingAppointment}
          onSubmit={handleSubmit}
          onDelete={editingAppointment ? handleDelete : undefined}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <AppointmentProvider>
      <App />
    </AppointmentProvider>
  );
}
