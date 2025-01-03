export const DEFAULT_LANGUAGE = 'en'

export const LANGUAGES = {
	en: 'English',
	es: 'Español', // Spanish
	zh: '简体中文', // Simplified Chinese
}

export type ISupportedLanguages = keyof typeof LANGUAGES

export const NAV_BAR = {
	en: {
		blog: 'blog',
		// apps
		// books: 'books',
		// music
		// games
		about: 'about',
	},
}

export const ACCESSIBILITY = {
	en: {
		emailIssues: 'Note: if you run into any issues on this site, please email ',
		skipTo: 'Skip To Content',
	},
}
