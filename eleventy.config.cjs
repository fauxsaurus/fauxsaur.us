const {EleventyI18nPlugin} = require('@11ty/eleventy')
const Image = require('@11ty/eleventy-img')
const path = require('node:path')

module.exports = eleventyConfig => {
	/** @todo concat if multiple scripts */
	eleventyConfig.addPassthroughCopy('src/js/*.js')
	eleventyConfig.addPassthroughCopy('src/font/*.ttf')

	/** @note {defaultLanguage: any valid BCP 47 tag} */
	eleventyConfig.addPlugin(EleventyI18nPlugin, {defaultLanguage: 'en-US'})
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

	eleventyConfig.addFilter('_getLangPosts', (collection, lang) =>
		collection.filter(post => post.data.lang == lang)
	)

	eleventyConfig.addFilter('_getShareImgUrl', (absoluteUrl, imgSize = 0) => {
		if (absoluteUrl.match(/undefined$/) || !imgSize) return ''

		const [ext, ...path] = absoluteUrl.split('.').reverse()
		/** @note necessary because [`.jpg`s become `.jpeg`s...](https://github.com/11ty/eleventy-img/issues/64) */
		const fixedExt = ext === 'jpg' ? 'jpeg' : ext

		return `${path.reverse().join('.')}-${imgSize}.${fixedExt}`
	})

	eleventyConfig.addNunjucksShortcode(
		'finePrint',
		/** @note the slice is to remove redundant paragraph tags */
		content =>
			`<p class="fine-print">${markdownIt({html: true}).render(content).slice(3, -5)}</p>`
	)

	eleventyConfig.addShortcode(
		'image',
		async (filePath, alt, sizes = '(min-width: 800px) 50vw, 100vw') => {
			const metadata = await Image(path.join(eleventyConfig.dir.input, filePath), {
				widths: [400, 800, 1600],
				formats: filePath.match(/png$/) ? ['png'] : ['avif', 'svg', 'jpg'],
				outputDir: './build/img/',
				urlPath: '/img/',
				svgShortCiruit: 'size',
				// svgCompressionSize: "br",

				filenameFormat: function (_id, src, width, format, _options) {
					const extension = path.extname(src)
					const name = path.basename(src, extension)

					return `${name}-${width}.${format}`
				},
			})

			return Image.generateHTML(metadata, {alt, sizes, loading: 'eager', decoding: 'async'})
		}
	)

	eleventyConfig.setLayoutResolution(false)
	return {
		dir: {input: 'src', output: 'build'},
		markdownTemplateEngine: 'njk',
	}
}
