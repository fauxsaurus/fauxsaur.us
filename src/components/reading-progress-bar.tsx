import {createSignal, onCleanup, onMount} from 'solid-js'

import './reading-progress-bar.css'

export const ReadingProgressBar = () => {
	const [percent, setPercent] = createSignal('0')

	const updateProgressBar = () => {
		const winScroll = document.body.scrollTop || document.documentElement.scrollTop
		const height = document.documentElement.scrollHeight - document.documentElement.clientHeight

		setPercent(((winScroll / height) * 100).toFixed(2))
	}

	onMount(() => {
		globalThis.addEventListener('resize', updateProgressBar)
		globalThis.addEventListener('scroll', updateProgressBar)
		updateProgressBar()
	})

	onCleanup(() => {
		globalThis.removeEventListener('resize', updateProgressBar)
		globalThis.removeEventListener('scroll', updateProgressBar)
	})

	return (
		<>
			<div
				data-component="reading-progress-bar"
				title={`${percent()}% complete`}
				style={`background-size: ${percent()}% 100%`}
			/>
		</>
	)
}
