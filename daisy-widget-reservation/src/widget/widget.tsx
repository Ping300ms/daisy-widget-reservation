import { createRoot } from "react-dom/client";
import App from "../App";
import "../index.css";


interface DaisyWidgetAPI {
    init: (selector?: string) => void;
}

declare global {
    interface Window {
        DaisyWidget?: DaisyWidgetAPI;
    }
}

window.DaisyWidget = {
    init: (selector = "#daisy-widget") => {
        const container = document.querySelector<HTMLElement>(selector);
        if (!container) return console.error("Element introuvable");

        const root = createRoot(container);
        root.render(<App />);
    },
};
