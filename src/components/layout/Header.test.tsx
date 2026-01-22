import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Header } from './Header';

describe('Header', () => {
    it('renders the header with menu button', () => {
        const mockOnPrev = vi.fn();
        const mockOnNext = vi.fn();
        const mockOnToday = vi.fn();
        const mockOnMenuClick = vi.fn();

        render(
            <Header
                currentDate={new Date('2024-01-15')}
                onPrev={mockOnPrev}
                onNext={mockOnNext}
                onToday={mockOnToday}
                onMenuClick={mockOnMenuClick}
            />
        );

        expect(screen.getByLabelText('Menu')).toBeInTheDocument();
        expect(screen.getByText('Hoje')).toBeInTheDocument();
    });

    it('displays the current month and year', () => {
        const mockOnPrev = vi.fn();
        const mockOnNext = vi.fn();
        const mockOnToday = vi.fn();
        const mockOnMenuClick = vi.fn();

        render(
            <Header
                currentDate={new Date('2024-01-15')}
                onPrev={mockOnPrev}
                onNext={mockOnNext}
                onToday={mockOnToday}
                onMenuClick={mockOnMenuClick}
            />
        );

        expect(screen.getByText(/janeiro 2024/i)).toBeInTheDocument();
    });
});
