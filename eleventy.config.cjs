module.exports = eleventyConfig => {
	/** @todo concat if multiple scripts */
	eleventyConfig.addPassthroughCopy('src/js/*.js')
	eleventyConfig.addPassthroughCopy('src/font/*.ttf')

	/** @note _prefix denotes that these are custom filters that should hopefully not interfere with others if newer filters are added with similar names */
	/** @note this could cause issues if a person's hyphenated last name is ever used as a page name. */
	eleventyConfig.addFilter('_kebab2titleCase', function (string) {
		return string
			.split('-')
			.map(
				([letter, ...letters]) =>
					letter.toLocaleUpperCase(this.page.lang) + letters.join('')
			)
			.join(' ')
	})

	eleventyConfig.addFilter('_post2permalink', ([lang, word4blog, date, slug]) => {
		const [yyyy, mm, dd] = date.toISOString().split('T')[0].split('-')
		return ['', lang, word4blog, yyyy, mm, dd, slug, 'index.html'].join('/')
	})

	eleventyConfig.addNunjucksShortcode(
		'finePrint',
		/** @note the slice is to remove redundant paragraph tags */
		content =>
			`<p class="fine-print">${markdownIt({html: true}).render(content).slice(3, -5)}</p>`
	)


	eleventyConfig.setLayoutResolution(false)
	return {
		dir: {input: 'src', output: 'build'},
		markdownTemplateEngine: 'njk',
	}
}
