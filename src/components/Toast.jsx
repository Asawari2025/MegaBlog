export default function Toast({ message, onDismiss }) {
    if (!message) return null;

    return (
        <div className="toast-message" role="status" aria-live="polite">
            <span className="toast-icon" aria-hidden="true">✓</span>
            <span>{message}</span>
            <button type="button" className="toast-dismiss" onClick={onDismiss} aria-label="Dismiss notification">
                ×
            </button>
        </div>
    );
}
