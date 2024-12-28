// @ts-check
import mdx from '@astrojs/mdx'
import solid from '@astrojs/solid-js'
import sitemap from '@astrojs/sitemap'

import {defineConfig} from 'astro/config'

import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeSlug from 'rehype-slug'

// https://astro.build/config
export default defineConfig({
	i18n: {
		defaultLocale: 'en',
		locales: ['es', 'en', 'zh'],
	},
	integrations: [solid({devtools: true}), mdx(), sitemap()],
	markdown: {
		rehypePlugins: [
			rehypeSlug,
			[rehypeAutolinkHeadings, {behavior: 'wrap'}],
			[rehypeExternalLinks, {rel: 'noopener noreferrer', target: '_blank'}],
		],
	},
	output: 'static',
	site: 'https://fauxsaur.us',
	vite: {
		server: {
			watch: {
				usePolling: true,
			},
		},
	},
})
