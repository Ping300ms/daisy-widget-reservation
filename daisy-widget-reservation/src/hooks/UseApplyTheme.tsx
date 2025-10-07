import { useEffect } from "react";

export default function useApplyTheme(containerId: string) {
    useEffect(() => {
        const container = document.getElementById(containerId);
        if (!container) return;

        const body = document.body;

        const getVar = (name: string, fallback: string) => {
            return (
                getComputedStyle(body)
                    .getPropertyValue(name)
                    .trim() || fallback
            );
        };

        const applyTheme = () => {
            const accent = getVar("--daisy-accent", "#4f46e5");
            const bg = getVar("--daisy-bg", "#ffffff");
            const text = getVar("--daisy-text", "#111827");
            const radius = getVar("--daisy-radius", "8px");
            const font = getVar("--daisy-font", "Inter, sans-serif");
            const input = getVar("--daisy-input", "#f9fafb");

            container.style.setProperty("--daisy-accent", accent);
            container.style.setProperty("--daisy-bg", bg);
            container.style.setProperty("--daisy-text", text);
            container.style.setProperty("--daisy-radius", radius);
            container.style.setProperty("--daisy-font", font);
            container.style.setProperty("--daisy-input", input);
        };

        applyTheme();

        const observer = new MutationObserver(() => {
            applyTheme();
        });

        observer.observe(document.body, {
            attributes: true,
        });

        return () => observer.disconnect();
    }, [containerId]);
}
