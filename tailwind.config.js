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
				accepted: {
					// Greenish
					darkest: '#376e37',
					dark: '#408140',
					DEFAULT: '#4a934a',
					light: '#53a653',
					lightest: '#5cb85c',
				},
				rejected: {
					// Red
					darkest: '#d32f2f',
					dark: '#e53935',
					DEFAULT: '#f44336',
					light: '#ef5350',
					lightest: '#e57373',
				},
				pending: {
					// Yellow
					darkest: '#d48806',
					dark: '#faad14',
					DEFAULT: '#ffc53d',
					light: '#ffd666',
					lightest: '#ffe58f',
				},
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
