<script lang="ts">
	export let movies: Record<string, any>[];
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import VoteButton from './VoteButton.svelte';
	let previousVote: Record<string, string> = {};
	let selected: Record<string, any> | null;

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
		if (window) {
			previousVote = JSON.parse(localStorage.getItem('vote') ?? '{}');
		}
	});

	const handleVoteClick = async () => {
		if (selected) {
			const date = new Date();
			const day = date.getDay();
			const fromMonday = date.getDate() - day + (day == 0 ? -6 : 1); // sunday is 0 day according to date
			date.setDate(fromMonday);
			const body = {
				weekVoted: date.toLocaleDateString('en-us', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				}),
				movieInfo: selected
			};

			const response = await fetch('/api/db/add/vote', {
				method: 'POST',
				body: JSON.stringify(body)
			});

			if (response.ok) {
				 previousVote = {
					id: selected.id,
					voteTime: new Date().toString()
				}
				localStorage.setItem(
					'vote',
					JSON.stringify(previousVote)
				);
				selected = null;
				// TODO stop voting multiple times
				// TODO animation on button click
				// TODO indicator when already voted
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
		/>
	{/each}
</div>
<VoteButton selected={selected?.title} on:click={handleVoteClick} alreadyVoted={movies.some(m => m.id === previousVote.id)} />

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
</style>
