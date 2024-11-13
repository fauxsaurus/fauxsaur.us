export default () => {
	const isProduction = process.env.MY_ENVIRONMENT === 'production'

	return {
		analytics: 'a0f89da9564c4e919cd40568e3934d86',
		description: '',
		title: 'Fauxsaurus',
		url: isProduction ? 'https://fauxsaur.us' : 'http://localhost:8080',
	}
}
