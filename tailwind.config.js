module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: false, // or 'media' or 'class'
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '4rem',
			},
		},
		ripple: (theme) => ({
			colors: theme('colors'),
		}),
		extend: {},
	},
	variants: {
		extend: {},
	},
	darkMode: 'class',
	plugins: [require('@tailwindcss/forms')],
}
