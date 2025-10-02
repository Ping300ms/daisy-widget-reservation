/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {
          colors: {
              daisy: {
                  bg: "var(--daisy-bg)",
                  text: "var(--daisy-text)",
                  accent: "var(--daisy-accent)",
                  radius: "var(--daisy-radius)",
                  font: "var(--daisy-font)",
                  input: "var(--daisy-input)",
              },
          },
      },
  },
  plugins: [],
}