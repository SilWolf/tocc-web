module.exports = {
	async redirects() {
		return [
			{
				source: '/auth/connect/:provider/authorize',
				destination: process.env.API_ENDPOINT + '/connect/:provider',
				permanent: true,
			},
		]
	},
	async rewrites() {
		return [
			{
				source: '/api/upload',
				destination: process.env.API_ENDPOINT + '/upload',
			},
		]
	},
}
