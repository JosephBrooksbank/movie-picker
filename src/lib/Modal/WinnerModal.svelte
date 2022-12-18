<script lang="ts">
	import MoviePoster from '$lib/MoviePoster.svelte';
	import type { IMovie } from '$lib/schema/movie.schema';
	import Cookies from 'js-cookie';
	import Modal from './Modal.svelte';

	export let eventDate: Date | undefined;
	export let winner: IMovie | undefined;

	export let showModal = !!winner;

	if (Cookies.get('winnerSeen') === eventDate?.toString()) {
		showModal = false;
	}

	const handleModalDismiss = () => {
		showModal = false;
		Cookies.set('winnerSeen', eventDate?.toString() ?? '', {
			expires: 2^31
		});
	};
</script>

{#if winner}
	<Modal show={showModal} on:click={handleModalDismiss}>
		<div>
			<h1>🎊Winner!🎊</h1>
			<MoviePoster
				imageUrl={winner.poster_path}
				imageAlt={`Poster for ${winner.title}`}
				width="100%"
			/>
			<h1>{winner.title}</h1>
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
