import { createRoot } from "react-dom/client";
import App from "../App";

declare global {
    interface Window {
        DaisyWidget?: any;
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
