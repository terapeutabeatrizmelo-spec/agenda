import { useState } from 'react';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { FloatingActionButton } from './components/ui/FloatingActionButton';
import { DayView } from './views/DayView';
import { WeekView } from './views/WeekView';
import { MonthView } from './views/MonthView';
import { Modal } from './components/ui/Modal';
import { AppointmentForm } from './components/ui/AppointmentForm';
import { AppointmentProvider } from './context/AppointmentContext';
import { useToast } from './context/ToastContext';
import type { ViewMode, Appointment } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('month');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | null>(null);
  const { showToast } = useToast();

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
    setEditingAppointment(null);
    setIsModalOpen(true);
  };

  const handleEditAppointment = (appointment: Appointment) => {
    setEditingAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleSaveAppointment = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
    showToast(editingAppointment ? 'Compromisso atualizado!' : 'Compromisso criado!', 'success');
  };

  const handleDeleteAppointment = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
    showToast('Compromisso excluído', 'info');
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

      {viewMode === 'day' && <DayView currentDate={currentDate} onEditAppointment={handleEditAppointment} />}
      {viewMode === 'week' && <WeekView currentDate={currentDate} onEditAppointment={handleEditAppointment} />}
      {viewMode === 'month' && <MonthView currentDate={currentDate} onEditAppointment={handleEditAppointment} />}

      <FloatingActionButton onClick={handleAddClick} />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingAppointment ? 'Editar Compromisso' : 'Novo Compromisso'}>
        <AppointmentForm
          appointment={editingAppointment}
          onSave={handleSaveAppointment}
          onDelete={handleDeleteAppointment}
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
