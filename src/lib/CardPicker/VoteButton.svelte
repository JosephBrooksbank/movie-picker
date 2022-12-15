<script lang="ts">
	import type { IMovie } from '$lib/schema/movie.schema';
	import { fade } from 'svelte/transition';
	export let nextEvent: Date | undefined;
	export let selected: string | null | undefined;
	export let alreadyVoted: boolean = false;
	export let winner: IMovie | null = null;
</script>

<div class="container">
	{#if !nextEvent}
		<div class="submit closed">
			No Events coming up. Suggest movies for future events!
		</div>
	{:else if alreadyVoted && !winner}
		<div class="submit closed">
			Already voted
			<i class="fa-solid fa-circle-check" />
		</div>
	{:else if winner}
		<div class="submit closed">
		🎊 Winner: {winner.title} 🎊
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

	.open {
		cursor: pointer;
		color: azure;
		background-color: #3ba55c;
	}
	.closed {
		background-color: #2f3136;
		color: azure;
		text-align: center;
	}

	.submit:hover {
		opacity: 1;
	}
</style>
