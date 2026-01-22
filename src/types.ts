export type AppointmentCategory = 'work' | 'personal' | 'health' | 'important' | 'other';

export interface Appointment {
  id: string;
  title: string;
  description?: string;
  start: string; // ISO String
  end: string; // ISO String
  category: AppointmentCategory;
  color: string;
  notificationSent?: boolean;
}

export type ViewMode = 'day' | 'week' | 'month';

export interface CalendarState {
  currentDate: Date;
  viewMode: ViewMode;
  selectedAppointmentId: string | null;
  isModalOpen: boolean;
}
