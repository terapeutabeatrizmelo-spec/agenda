import { useState } from 'react';
import { addDays, subDays, addWeeks, subWeeks, addMonths, subMonths } from 'date-fns';
import { useAppointments } from './context/AppointmentContext';
import { useToast } from './context/ToastContext';
import { Header } from './components/layout/Header';
import { DayView } from './views/DayView';
import { WeekView } from './views/WeekView';
import { MonthView } from './views/MonthView';
import { Modal } from './components/ui/Modal';
import { AppointmentForm } from './components/ui/AppointmentForm';
import type { ViewMode, Appointment } from './types';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('day');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] = useState<Appointment | undefined>(undefined);

  const { addAppointment, updateAppointment, deleteAppointment } = useAppointments();
  const { addToast } = useToast();

  const handlePrev = () => {
    if (viewMode === 'day') setCurrentDate(prev => subDays(prev, 1));
    if (viewMode === 'week') setCurrentDate(prev => subWeeks(prev, 1));
    if (viewMode === 'month') setCurrentDate(prev => subMonths(prev, 1));
  };

  const handleNext = () => {
    if (viewMode === 'day') setCurrentDate(prev => addDays(prev, 1));
    if (viewMode === 'week') setCurrentDate(prev => addWeeks(prev, 1));
    if (viewMode === 'month') setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddClick = () => {
    setEditingAppointment(undefined);
    setIsModalOpen(true);
  };

  const handleEditClick = (appt: Appointment) => {
    setEditingAppointment(appt);
    setIsModalOpen(true);
  };

  const handleSave = (data: Omit<Appointment, 'id'>) => {
    if (editingAppointment) {
      updateAppointment(editingAppointment.id, data);
    } else {
      addAppointment(data);
    }
    addToast('Compromisso salvo com sucesso!', 'success');
    setIsModalOpen(false);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este compromisso?')) {
      deleteAppointment(id);
      addToast('Compromisso excluído.', 'info');
      setIsModalOpen(false);
    }
  };

  return (
    <>
      <Header
        currentDate={currentDate}
        viewMode={viewMode}
        onPrev={handlePrev}
        onNext={handleNext}
        onToday={handleToday}
        onViewChange={setViewMode}
        onAddClick={handleAddClick}
      />

      <main className="flex-1 overflow-hidden flex flex-col pt-2 relative">
        {viewMode === 'day' && (
          <DayView currentDate={currentDate} onEditAppointment={handleEditClick} />
        )}
        {viewMode === 'week' && (
          <WeekView currentDate={currentDate} onEditAppointment={handleEditClick} />
        )}
        {viewMode === 'month' && (
          <MonthView currentDate={currentDate} onEditAppointment={handleEditClick} />
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAppointment ? 'Editar Compromisso' : 'Novo Compromisso'}
      >
        <AppointmentForm
          initialData={editingAppointment}
          onSubmit={handleSave}
          onDelete={editingAppointment ? handleDelete : undefined}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </>
  );
}

export default App;
