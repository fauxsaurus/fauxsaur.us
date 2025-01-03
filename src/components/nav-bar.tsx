import {NAV_BAR, SITE} from '../meta'

import './nav-bar.css'

/** @todo aria-hidden="true" on label/input? */

export const NavBar = ({lang}: {lang: string}) => {
	const urlPrefix = `${SITE.url}/${lang}/`

	return (
		<>
			<input hidden id="nav-bar-toggle" type="checkbox" />
			<label for="nav-bar-toggle">toggle</label>
			<nav>
				<ul>
					{Object.values(NAV_BAR[lang as keyof typeof NAV_BAR]).map(name => (
						<li>
							<a href={urlPrefix + name + '/'}>{name}</a>
						</li>
					))}
				</ul>
			</nav>
		</>
	)
}
