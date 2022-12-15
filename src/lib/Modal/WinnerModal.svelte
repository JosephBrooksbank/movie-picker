<script lang="ts">
	import MoviePoster from '$lib/MoviePoster.svelte';
	import type { IMovie } from '$lib/schema/movie.schema';
	import Cookies from 'js-cookie';
	import Modal from './Modal.svelte';

	export let eventDate: Date | undefined;
	export let winner: IMovie | undefined;
	let showModal = !!winner;

	const handleModalDismiss = () => {
		showModal = false;
		Cookies.set('winnerSeen', eventDate?.toString() ?? '');
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
