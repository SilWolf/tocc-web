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
