export * from './books'
export * from './i18n'
export * from './social'

export const SITE = {
	analytics: 'a0f89da9564c4e919cd40568e3934d86',
	author: 'Andrew R. H. Quinn',
	description: 'The official site of Ghost Girl and the Ghost Giant.',
	title: 'Fauxsaurus',
	url: process.env.NODE_ENV === 'development' ? 'http://localhost:4321' : 'https://fauxsaur.us',
}
