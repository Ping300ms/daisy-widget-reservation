import { createRoot } from "react-dom/client";
import "../index.css";
import BookingWidget from "../components/BookingWidget.tsx";

interface DaisyWidgetInitOptions {
    apiKey: string;
    selector?: string;
    onSuccess?: () => undefined;
    onError?: () => undefined;
}

interface DaisyWidgetAPI {
    init: (options: DaisyWidgetInitOptions) => void;
}

declare global {
    interface Window {
        DaisyWidget?: DaisyWidgetAPI;
    }
}

window.DaisyWidget = {
    init: ({
               apiKey,
               selector = "#daisy-widget",
               onSuccess = () => {},
               onError = () => {}
           }: DaisyWidgetInitOptions) => {
        const container = document.querySelector<HTMLElement>(selector);
        if (!container) {
            console.error("Élément introuvable :", selector);
            return;
        }

        const root = createRoot(container);
        root.render(
            <BookingWidget
                apiKey={apiKey}
                onSuccess={onSuccess}
                onError={onError}
            />
        );
    },
};
