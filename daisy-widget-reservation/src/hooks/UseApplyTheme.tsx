import { useEffect } from "react";

export default function useApplyTheme(containerId: string) {
    useEffect(() => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const applyTheme = () => {
            const theme = container.dataset.theme ?? "light";
            const accent = container.dataset.accentColor ?? "#4f46e5";
            const bg = container.dataset.bg ?? (theme === "dark" ? "#1f2937" : "#ffffff");
            const text = container.dataset.text ?? (theme === "dark" ? "#f9fafb" : "#111827");
            const radius = container.dataset.radius ?? "8px";
            const font = container.dataset.font ?? "Inter, sans-serif";
            const input = container.dataset.input ?? (theme === "dark" ? "#111827" : "#f9fafb");

            container.style.setProperty("--daisy-bg", bg);
            container.style.setProperty("--daisy-text", text);
            container.style.setProperty("--daisy-accent", accent);
            container.style.setProperty("--daisy-radius", radius);
            container.style.setProperty("--daisy-font", font);
            container.style.setProperty("--daisy-input", input);
        };
        applyTheme();

        const observer = new MutationObserver(() => {
            applyTheme();
        });

        observer.observe(container, {
            attributes: true
        });

        return () => observer.disconnect();
    }, [containerId]);
}
