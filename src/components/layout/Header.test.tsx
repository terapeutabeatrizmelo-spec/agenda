import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header Component', () => {
    it('renders the title and date', () => {
        const mockDate = new Date('2026-01-20T12:00:00');

        render(
            <Header
                currentDate={mockDate}
                viewMode="day"
                onPrev={vi.fn()}
                onNext={vi.fn()}
                onToday={vi.fn()}
                onViewChange={vi.fn()}
                onAddClick={vi.fn()}
            />
        );

        // Check for main title
        expect(screen.getByText('Agenda Terapia com Café')).toBeInTheDocument();

        // Check for formatted date (Janeiro 2026)
        expect(screen.getByText(/janeiro 2026/i)).toBeInTheDocument();
    });

    it('renders navigation buttons', () => {
        render(
            <Header
                currentDate={new Date()}
                viewMode="day"
                onPrev={vi.fn()}
                onNext={vi.fn()}
                onToday={vi.fn()}
                onViewChange={vi.fn()}
                onAddClick={vi.fn()}
            />
        );

        expect(screen.getByText('Hoje')).toBeInTheDocument();
        expect(screen.getByText('Novo')).toBeInTheDocument();
    });
});
