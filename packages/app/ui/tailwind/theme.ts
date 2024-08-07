import type { Config } from "tailwindcss";

export default {
	// edit your tailwind theme here!
	// https://tailwindcss.com/docs/adding-custom-styles
	extend: {
		colors: {
			primary: "#FF6700",
			"gradient-initial": "rgba(171, 171, 171, 1)",
			"gradient-final": "rgba(171, 171, 171, 0.6)",
		},
		width: {
			xs: "600px",
			"2xl": "624px",
		},
		maxWidth: {
			xs: "600px",
			"2xl": "624px",
		},
		backgroundImage: {
			"card-gradient":
				"linear-gradient(180deg, #ABABAB 0%, rgba(171, 171, 171, 0.6) 100%)",
		},
		animation: {
			marquee: "marquee 10s linear infinite",
			marquee2: "marquee2 10s linear infinite",
		},
		keyframes: {
			marquee: {
				"0%": { transform: "translateX(0%)" },
				"100%": { transform: "translateX(-100%)" },
			},
			marquee2: {
				"0%": { transform: "translateX(100%)" },
				"100%": { transform: "translateX(0%)" },
			},
		},
	},
} satisfies Config["theme"];
