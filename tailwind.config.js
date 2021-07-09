module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		screens: {
			tablet: '640px',
			// => @media (min-width: 640px) { ... }

			laptop: '1024px',
			// => @media (min-width: 1024px) { ... }
		},
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
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
}
