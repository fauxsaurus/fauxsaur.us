import {SITE, SOCIAL} from '../meta'

type IUrl = string
type IProps = {
	author: string
	description: string
	image?: IUrl
	title: string
	type: 'article' | 'website'
	url: IUrl
}

const xUsername = SOCIAL.find(social => social.name === 'x')!.username!

const escapeAttributeValue = (text: string) =>
	text.replace(/</g, ' &lt;').replace(/&/g, ' &amp;').replace(/"/g, ' &quot;')

{
	/* <meta property="og:image" content={props.image} />
<meta name="twitter:image" content={props.image} /> */
}

export const Social = (props: IProps) => {
	const author = escapeAttributeValue(props.author)
	const description = escapeAttributeValue(props.description)
	const title = escapeAttributeValue(props.title)

	return (
		<>
			{/* Facebook */}
			<meta property="og:author" content={author} />
			<meta property="og:description" content={description} />
			<meta property="og:site_name" content={SITE.title} />
			<meta property="og:title" content={title} />
			<meta property="og:type" content={props.type} />
			<meta property="og:url" content={props.url} />
			{/* X */}
			<meta name="twitter:card" content={props.type} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:url" content={props.url} />
			<meta name="twitter:site" content={xUsername} />
			<meta name="twitter:creator" content={xUsername} />
		</>
	)
}
