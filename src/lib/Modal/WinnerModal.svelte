<script lang="ts">
	import MoviePoster from '$lib/MoviePoster.svelte';
	import type { IParty } from '$lib/schema/party.schema';
	import { nextEvent } from '$lib/Stores';
	import { isMovieGuard } from '$lib/utils';
	import dayjs from 'dayjs';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import Modal from './Modal.svelte';

	export let showModal = false;
	let currentEvent: IParty | null = null;

	onMount(async () => {
		// case when there is an upcoming event and voting has ended for that event.
		if ($nextEvent && $nextEvent?.votingEnds < new Date() && isMovieGuard($nextEvent.winner)) {
			showModal = true;
			currentEvent = $nextEvent;
		} else {
			const mostRecentEvent = await (await fetch('/api/parties/get-last-ended')).json();
			const hoursSinceEvent = dayjs().diff(mostRecentEvent.date, 'hours');

			if (mostRecentEvent.winner && hoursSinceEvent < 8) {
				showModal = true;
				currentEvent = mostRecentEvent;
			}
		}

		// If already seen, don't show again.
		if (Cookies.get('winnerSeen') === currentEvent?._id) {
			showModal = false;
		}
	});

	const handleModalDismiss = () => {
		showModal = false;
		Cookies.set('winnerSeen', currentEvent?._id ?? '', {
			expires: 2 ^ 31
		});
	};
</script>

{#if currentEvent?.winner && isMovieGuard(currentEvent.winner)}
	<Modal show={showModal} on:click={handleModalDismiss}>
		<div>
			<h1>🎊Winner!🎊</h1>
			<MoviePoster
				imageUrl={currentEvent.winner.poster_path}
				imageAlt={`Poster for ${currentEvent.winner.title}`}
				width="100%"
			/>
			<h1>{currentEvent.winner.title}</h1>
		</div>
	</Modal>
{/if}

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	h1 {
		width: fit-content;
		text-align: center;
	}
</style>
