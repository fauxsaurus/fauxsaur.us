const SRC = 'https://static.cloudflareinsights.com/beacon.min.js'

export const Analytics = (props: {token: string}) => (
	<script defer src={SRC} data-cf-beacon={`{"token": "${props.token}"}`} />
)
