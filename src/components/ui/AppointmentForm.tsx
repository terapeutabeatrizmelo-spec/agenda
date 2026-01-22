import React, { useState, useEffect } from 'react';
import type { Appointment, AppointmentCategory } from '../../types';
import { Button } from '../ui/Button';

interface AppointmentFormProps {
    initialData?: Partial<Appointment>;
    onSubmit: (data: Omit<Appointment, 'id'>) => void;
    onDelete?: (id: string) => void;
    onCancel: () => void;
}

const CATEGORIES: { value: AppointmentCategory; label: string; color: string }[] = [
    { value: 'work', label: 'Trabalho', color: '#8b5cf6' },
    { value: 'personal', label: 'Pessoal', color: '#06b6d4' },
    { value: 'health', label: 'Saúde', color: '#10b981' },
    { value: 'important', label: 'Importante', color: '#f43f5e' },
    { value: 'other', label: 'Outro', color: '#64748b' },
];

export const AppointmentForm: React.FC<AppointmentFormProps> = ({
    initialData,
    onSubmit,
    onDelete,
    onCancel,
}) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        start: '',
        end: '',
        category: 'work' as AppointmentCategory,
        color: CATEGORIES[0].color,
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title || '',
                description: initialData.description || '',
                start: initialData.start || '',
                end: initialData.end || '',
                category: initialData.category || 'work',
                color: initialData.color || CATEGORIES[0].color,
            });
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            // Auto-update color if category changes
            if (name === 'category') {
                const catValue = value as AppointmentCategory;
                const cat = CATEGORIES.find(c => c.value === catValue);
                // Explicitly return the new state to satisfy TS
                return {
                    ...prev,
                    category: catValue,
                    color: cat ? cat.color : prev.color
                };
            }
            return { ...prev, [name]: value };
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Título</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Ex: Reunião de Projeto"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Início</label>
                    <input
                        type="datetime-local"
                        name="start"
                        value={formData.start}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors [color-scheme:dark]"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-white/70 mb-1">Fim</label>
                    <input
                        type="datetime-local"
                        name="end"
                        value={formData.end}
                        onChange={handleChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-violet-500 transition-colors [color-scheme:dark]"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Categoria</label>
                <div className="grid grid-cols-3 gap-2">
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.value}
                            type="button"
                            onClick={() => setFormData(prev => ({ ...prev, category: cat.value, color: cat.color }))}
                            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${formData.category === cat.value
                                ? 'bg-white/10 border-white/40 text-white shadow-lg'
                                : 'bg-transparent border-white/5 text-white/50 hover:bg-white/5'
                                }`}
                            style={{ borderColor: formData.category === cat.value ? cat.color : undefined }}
                        >
                            {cat.label}
                        </button>
                    ))}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-white/70 mb-1">Descrição</label>
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/30 focus:outline-none focus:border-violet-500 transition-colors"
                    placeholder="Detalhes adicionais..."
                />
            </div>

            <div className="flex items-center gap-3 pt-4">
                {onDelete && (
                    <Button type="button" variant="danger" onClick={() => onDelete(initialData?.id!)} className="px-4">
                        Excluir
                    </Button>
                )}
                <div className="flex-1" />
                <Button type="button" variant="glass" onClick={onCancel}>
                    Cancelar
                </Button>
                <Button type="submit" variant="primary">
                    Salvar
                </Button>
            </div>
        </form>
    );
};
