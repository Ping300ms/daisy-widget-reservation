import { createRoot } from "react-dom/client";
import "../index.css";
import BookingWidget from "../components/BookingWidget.tsx";


interface DaisyWidgetAPI {
    init: (selector?: string, onSuccess?: () => undefined, onError?: () => undefined) => void;
}

declare global {
    interface Window {
        DaisyWidget?: DaisyWidgetAPI;
    }
}

window.DaisyWidget = {
    init: (selector = "#daisy-widget", onSuccess = () => {}, onError = () => {}) => {
        const container = document.querySelector<HTMLElement>(selector);
        if (!container) return console.error("Element introuvable");

        const root = createRoot(container);
        root.render(<BookingWidget onSuccess={onSuccess} onError={onError} />);
    },
};
