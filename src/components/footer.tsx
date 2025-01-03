import './footer.css'

type ICopyrightStatement = string
type IUrl = string

type IProps = {
	children: ICopyrightStatement
	socialLinks: Record<string, IUrl>
}

export const Footer = (props: IProps) => (
	<footer data-component="site-footer">
		<nav>
			{Object.entries(props.socialLinks).map(([name, url]) => (
				<a data-icon={name} href={url} target="_blank" title={name}></a>
			))}
		</nav>
		<span>{props.children}</span>
	</footer>
)
