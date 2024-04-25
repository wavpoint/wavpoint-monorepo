/* eslint-disable no-undef */
import type { Config } from 'tailwindcss';
import theme from './ui/tailwind/theme';

export default {
	content: ['./**/*.{js,jsx,ts,tsx}'],
	plugins: [require('nativewind/tailwind/css')],
	important: 'html',
	darkMode: 'media',
	theme: {
		...theme,
	},
} satisfies Config;
