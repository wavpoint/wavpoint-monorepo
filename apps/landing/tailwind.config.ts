import theme from "@wavpoint/app/ui/tailwind/theme";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		...theme,
	},
	plugins: [],
};
