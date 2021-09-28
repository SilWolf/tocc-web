module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'next',
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:import/recommended',
		'plugin:import/typescript',
		'prettier',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint', 'simple-import-sort'],
	rules: {
		'linebreak-style': ['error', 'unix'],
		'react/display-name': 'off',
		'react/react-in-jsx-scope': 'off',
		indent: 'off',
		quotes: 'off',
		semi: ['error', 'never'],
		'sort-imports': 'off',
		'import/order': 'off',
		'simple-import-sort/exports': 'error',
		'simple-import-sort/imports': [
			'error',
			{
				groups: [
					['^next'],
					['^react'],
					['^types'],
					['^helpers', '^hooks'],
					['^layouts', '^components'],
					['^src', 'css$'],
				],
			},
		],
		'import/first': 'error',
		'import/newline-after-import': 'error',
		'import/no-duplicates': 'error',
		'@next/next/no-img-element': 'off',
	},
}
