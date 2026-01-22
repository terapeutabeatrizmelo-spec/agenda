import { Component, type ErrorInfo, type ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0f172a] text-white p-4">
                    <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl max-w-lg w-full backdrop-blur-xl">
                        <h1 className="text-2xl font-bold text-red-400 mb-2">Ops! Algo quebrou.</h1>
                        <p className="text-white/60 mb-4">Um erro impediu a renderização da tela.</p>
                        <div className="bg-black/30 p-4 rounded-xl mb-6 overflow-auto max-h-[300px]">
                            <code className="text-sm font-mono text-red-200">
                                {this.state.error?.toString()}
                            </code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="px-6 py-2 bg-red-500 hover:bg-red-600 rounded-lg font-medium transition-colors"
                        >
                            Tentar Recarregar
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}
