import {defineCollection, z} from 'astro:content'
import {glob} from 'astro/loaders'

const blog = defineCollection({
	loader: glob({pattern: '**\/*.md*', base: './src/en/blog/'}),
	schema: z.object({
		desc: z.string(),
		tags: z.array(z.string()),
		title: z.string(),
	}),
})

export const collections = {blog}
