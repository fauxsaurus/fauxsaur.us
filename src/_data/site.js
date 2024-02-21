module.exports = () => {
	const isProduction = process.env.MY_ENVIRONMENT === 'production'

	return {
		analytics: '85283400-1',
		description: '',
		title: 'Minifyre',
		url: isProduction ? 'https://minify.re' : 'http://localhost:8080',
	}
}
