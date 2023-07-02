/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				'astro-blue': '#0f4c81',
				'astro-blue-light': '#1d6fa5',
				'astro-blue-dark': '#0c3a5b',
				'astro-blue-darker': '#0a2c44',
				'astro-blue-darkest': '#081f2d',
			},
		},
	},
	plugins: [],
}
