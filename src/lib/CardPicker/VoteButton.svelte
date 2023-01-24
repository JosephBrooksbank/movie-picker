<script lang="ts">
	import { nextEvent } from '$lib/Stores';
	import { isMovieGuard } from '$lib/utils';
	import { fade } from 'svelte/transition';

	export let selected: string | null | undefined;
	export let alreadyVoted: boolean = false;
</script>

<div class="container">
	{#if !$nextEvent?.date}
		<div class="submit closed">
			No Events coming up. Suggest movies for future events!
		</div>
	{:else if $nextEvent?.winner && isMovieGuard($nextEvent.winner)}
		<div class="submit closed">
		🎊 Winner: {$nextEvent.winner.title} 🎊
		</div>
	{:else if alreadyVoted}
		<div class="submit closed">
			Already voted
			<i class="fa-solid fa-circle-check" />
		</div>
	{:else if selected}
		<button class="submit open" transition:fade={{ duration: 100 }} on:click>
			Vote for {selected}
		</button>
	{:else}
		<div class="space" />
	{/if}
</div>

<style>
	* {
		box-sizing: border-box;
	}
	.space {
		height: 45px;
	}
	.container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}

	.container > * {
		grid-row: 1;
		grid-column: 1;
		width: fit-content;
	}
	.submit {
		width: 100%;
		border-radius: 5px;
		border: none;
		font-size: 16pt;
		padding: 10px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		opacity: 0.8;
		/* transition: background-color 500ms; */
	}
	button {
		background-color: var(--green);
	}

	.open {
		cursor: pointer;
		color: azure;
	}
	.closed {
		background-color: var(--dark-gray);
		color: azure;
		text-align: center;
	}

	.submit:hover {
		opacity: 1;
	}
</style>
