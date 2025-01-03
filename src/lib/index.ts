import {getCollection} from 'astro:content'
import {rehype} from 'rehype'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeSlug from 'rehype-slug'

export const blogId2slug = (id: string) => {
	const [year, month, day, ...title] = id.split('-')
	return [year, month, day, title.join('-')].join('/')
}

export const blogId2pubDate = (id: string) => {
	const [year, month, day] = id
		.split('-')
		.slice(0, 3)
		.map(string => parseInt(string))

	const date = new Date(year, month - 1, day)

	return date.toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})
}

export const createH1 = async (heading: string) =>
	await rehype()
		.data('settings', {fragment: true})
		.use(rehypeSlug)
		.use(rehypeAutolinkHeadings, {behavior: 'wrap'})
		.process(`<h1 itemprop="name headline">${heading}</h1>`)

/** @todo make sure that these only return the given language */
export const getBlogPosts = async () =>
	(await getCollection('blog')).sort((a, b) => {
		if (a.id < b.id) return -1
		if (a.id > b.id) return 1
		return 0
	})

/** @todo need to ensure this works with other languages */
export async function getStaticPaths() {
	const posts = await getCollection('blog')

	return posts.map(post => ({
		params: {id: post.id, slug: blogId2slug(post.id)},
		props: {post},
	}))
}

export const imgMetadata2orientation = (imgMetadata: ImageMetadata) => {
	const {height: h = 0, width: w = 0} = imgMetadata
	return w > h ? 'landscape' : h > w ? 'portrait' : 'square'
}
