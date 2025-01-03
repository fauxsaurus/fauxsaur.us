import rss from '@astrojs/rss'
import {blogId2pubDate, blogId2slug, getBlogPosts} from '../../lib'
import {SITE} from '../../meta'

/** @todo move this out to meta for i18n */
const metadata = {
	subtitle: 'Short stories, media analysis, tech writeups, and more.',
	author: {
		name: 'Andrew R. H. Quinn',
	},
}

const posts = await getBlogPosts()

export function GET(context) {
	return rss({
		// `<title>` field in output xml
		title: `${SITE.title} Blog`,
		// `<description>` field in output xml
		description: metadata.subtitle,
		// Pull in your project "site" from the endpoint context
		// https://docs.astro.build/en/reference/api-reference/#site
		site: context.site,
		// Array of `<item>`s in output xml
		// See "Generating items" section for examples using content collections and glob imports
		items: posts
			.slice()
			.reverse()
			.map(post => ({
				description: post.data.desc,
				link: `/en/blog/${blogId2slug(post.id)}/`,
				pubDate: new Date(blogId2pubDate(post.id)),
				title: post.data.title,
			})),
	})
}
