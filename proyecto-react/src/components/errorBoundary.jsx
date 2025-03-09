import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
    super(props);
    this.state = { hasError: false };
    }

static getDerivedStateFromError(error) {
    return { hasError: true };
    }

componentDidCatch(error, errorInfo) {
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
}

render() {
    if (this.state.hasError) {
        return (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
            <h2 className="font-bold">¡Algo salió mal!</h2>
            <p>Por favor, recarga la página o intenta nuevamente más tarde.</p>
        </div>
        );
    }

    return this.props.children;
}
}

export default ErrorBoundary;