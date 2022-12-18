<script lang="ts">
	import type { IMovie } from '$lib/schema/movie.schema';
	import Cookies from 'js-cookie';
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import VoteButton from './VoteButton.svelte';

	export let movies: IMovie[];
	export let winner: IMovie | null = null;
	export let nextEvent: Date;

	interface ICastVote {
		movieId?: number;
		eventDate?: Date;
	}

	let previousVote: ICastVote = {};
	let selected: IMovie | null;

	let mousePos = { x: 0, y: 0 };

	const handleMouseMove = (event: any) => {
		mousePos.x = event.clientX;
		mousePos.y = event.clientY;
	};

	const handleCardClick = (choice: any) => () => {
		if (selected?.id === choice.id) {
			selected = null;
		} else {
			selected = choice;
		}
	};

	onMount(async () => {
		previousVote = JSON.parse(Cookies.get('vote') ?? '{}');
	});

	const handleVoteClick = async () => {
		if (selected) {
			previousVote = {
				movieId: selected.id,
				eventDate: nextEvent
			};
			Cookies.set('vote', JSON.stringify(previousVote), {
				expires: 2^31
			});

			const date = new Date();
			const day = date.getDay();
			const fromMonday = date.getDate() - day + (day == 0 ? -6 : 1); // sunday is 0 day according to date
			date.setDate(fromMonday);
			const body = {
				...selected
			};

			const response = await fetch('/api/db/add/vote', {
				method: 'POST',
				body: JSON.stringify(body)
			});

			selected = null;
			if (!response.ok) {
				// TODO some sort of error handling
			}
		}
	};
</script>

<div id="cards" on:mousemove={handleMouseMove}>
	{#each movies as movie}
		<Card
			{mousePos}
			on:click={handleCardClick(movie)}
			selected={selected?.id === movie.id}
			{movie}
			showMoviePoster={!!nextEvent}
		/>
	{/each}
</div>
<VoteButton
	selected={selected?.title}
	on:click={handleVoteClick}
	alreadyVoted={movies.some((m) => m.id === previousVote.movieId)}
	{winner}
	{nextEvent}
/>

<style>
	#cards {
		display: flex;
		width: 100%;
		gap: 8px;
		justify-content: space-between;
	}

	/* need to affect styles in individual card components for cool border-hover effect */
	:global(#cards:hover > .card::after) {
		opacity: 1;
	}
	:global(#cards:hover #flashlight) {
		opacity: 1;
	}
</style>
