module.exports = {
	purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		screens: {
			tablet: '980px',
			// => @media (min-width: 980px) { ... }

			laptop: '1280px',
			// => @media (min-width: 1280px) { ... }
		},
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				tablet: '4rem',
			},
		},
		extend: {
			flex: {
				2: '2 2 0%',
			},
			colors: {
				primary: 'var(--color-primary)',
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		require('@tailwindcss/aspect-ratio'),
	],
}
