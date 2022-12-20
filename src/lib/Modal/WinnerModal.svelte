<script lang="ts">
	import MoviePoster from '$lib/MoviePoster.svelte';
	import { nextEvent } from '$lib/Stores';
	import { isMovieGuard } from '$lib/utils';
	import Cookies from 'js-cookie';
	import Modal from './Modal.svelte';

	export let showModal = !!$nextEvent?.winner;

	if (Cookies.get('winnerSeen') === $nextEvent?.date.toString()) {
		showModal = false;
	}

	const handleModalDismiss = () => {
		showModal = false;
		Cookies.set('winnerSeen', $nextEvent?.date.toString() ?? '', {
			expires: 2^31
		});
	};
</script>

{#if $nextEvent?.winner && isMovieGuard($nextEvent.winner)}
	<Modal show={showModal} on:click={handleModalDismiss}>
		<div>
			<h1>🎊Winner!🎊</h1>
			<MoviePoster
				imageUrl={$nextEvent.winner.poster_path}
				imageAlt={`Poster for ${$nextEvent.winner.title}`}
				width="100%"
			/>
			<h1>{$nextEvent.winner.title}</h1>
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
