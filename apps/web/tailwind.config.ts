import theme from '@repo/app/ui/tailwind/theme';
import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
		'../../packages/**/*.{js,jsx,ts,tsx}',
	],
	plugins: [require('nativewind/tailwind/css')],
	important: 'html',
	darkMode: 'media',
	theme: {
		...theme,
	},
};
export default config;