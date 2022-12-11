<script lang="ts">
	import { json } from '@sveltejs/kit';
	import Card from './Card.svelte';
	import VoteButton from './VoteButton.svelte';
	let choices = [{ title: 'firefly' }, { title: 'jack reacher' }, { title: 'hot fuzz' }];
	let selected: string | null = null;

	let mousePos = { x: 0, y: 0 };

	const handleMouseMove = (event: any) => {
		mousePos.x = event.clientX;
		mousePos.y = event.clientY;
	};

	const handleCardClick = (choice: any) => () => {
		if (selected === choice.title) {
			selected = null;
		} else {
			selected = choice.title;
		}
	};

	const handleVoteClick = async () => {
		const selectedObject = choices.find(c => c.title === selected)
		const date = new Date();
		const day = date.getDay();
		const fromMonday = date.getDate() - day + (day == 0 ? -6 : 1); // sunday is 0 day according to date
		date.setDate(fromMonday);
		const body = {
			weekVoted: date.toLocaleDateString('en-us', {year: 'numeric', month: '2-digit', day: '2-digit'}),
			movieInfo: selectedObject
		}

		const response = await fetch('/api/db/insert', {
			method: 'POST',
			body: JSON.stringify(body)
		});

		if (response.ok) {
			selected = null;
			// TODO stop voting multiple times
			// TODO animation on button click
			// TODO indicator when already voted
		}
	}
</script>

<div id="cards" on:mousemove={handleMouseMove}>
	{#each choices as choice}
		<Card {mousePos} on:click={handleCardClick(choice)} selected={selected === choice.title} />
	{/each}
</div>
{#if selected}
	<VoteButton {selected} on:click={handleVoteClick}/>
{/if}

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
