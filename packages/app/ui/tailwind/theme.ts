import type { Config } from 'tailwindcss';

export default {
	// edit your tailwind theme here!
	// https://tailwindcss.com/docs/adding-custom-styles
	extend: {
		colors: {
			primary: '#FF6700',
			'gradient-initial': 'rgba(171, 171, 171, 1)',
			'gradient-final': 'rgba(171, 171, 171, 0.6)',
		},
		width: {
			'2xl': '624px',
		},
		maxWidth: {
			'2xl': '624px',
		},
		backgroundImage: {
			'card-gradient':
				'linear-gradient(180deg, #ABABAB 0%, rgba(171, 171, 171, 0.6) 100%)',
		},
	},
} satisfies Config['theme'];
