import './header.css'

// @todo i18n skipto

type IText2display = string
type IUrl = string
type IProps = {
	links: Record<IText2display, IUrl>
	skipto: string
}

export const Header = (props: IProps) => {
	const [[homeText, homepageUrl], ...links] = Object.entries(props.links)

	return (
		<header data-component="site-header">
			<a class="skip-to-link" children={props.skipto} href="#main" />
			<a href={homepageUrl}>
				<span class="icon"></span>
				{homeText}
			</a>
			<input aria-hidden="true" hidden id="nav-bar-toggle" type="checkbox" />
			<label aria-hidden="true" for="nav-bar-toggle">
				toggle
			</label>
			<nav>
				<ul>
					{links.map(([children, href]) => (
						<li>
							<a {...{children, href}} />
						</li>
					))}
				</ul>
			</nav>
		</header>
	)
}
