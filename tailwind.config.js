import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      backgroundColor: {
        "bg-opacity-1": "rgb(0 0 0 / var(--tw-bg-opacity, 0.4))",
        "bg-opacity-2": "rgb(36 54 66  / var(--tw-bg-opacity, 0.6))",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
