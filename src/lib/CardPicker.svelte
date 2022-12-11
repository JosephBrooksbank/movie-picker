<script lang="ts">
	import Card from './Card.svelte';
	import {fade} from 'svelte/transition';
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
</script>

<div id="cards" on:mousemove={handleMouseMove}>
	{#each choices as choice}
		<Card {mousePos} on:click={handleCardClick(choice)} selected={selected === choice.title} />
	{/each}
</div>
{#if selected}
	<button id="submit" transition:fade={{duration: 100}}>
		Vote for {selected}
	</button>
{/if}

<style>
	#cards {
		display: flex;
		width: 100%;
		gap: 8px;
		justify-content: space-between;
	}

	#submit {
		width: 100%;
		border-radius: 5px;
		border: none;
		font-size: 16pt;
		padding: 10px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		background-color: #3ba55c;
		opacity: 0.8;
		color: azure;
		cursor: pointer;
		transition: all 500ms;
	}

	#submit:hover {
		opacity: 1;
	}
	/* need to affect styles in individual card components for cool border-hover effect */
	:global(#cards:hover > .card::after) {
		opacity: 1;
	}
</style>
