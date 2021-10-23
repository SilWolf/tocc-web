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
}
