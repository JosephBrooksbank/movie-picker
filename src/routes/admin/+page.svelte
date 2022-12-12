<script lang="ts">
	import { prevent_default } from 'svelte/internal';
import MovieData from './MovieData.svelte';

	export let data: import('./$types').PageData;

	const handleSubmit = async () => {
		const response = await fetch('/api/db/update/movie', {
			method: 'POST',
			body: JSON.stringify(data.movies)
		})
		console.log(await response.json())
	}

</script>

<h1>Admin Settings</h1>

<form method="POST" on:submit|preventDefault={handleSubmit}>
	<div id='button-row'>
	<button>Save</button>
	</div>
	<div id="container">
		{#each data.movies as movie}
			<MovieData bind:movie />
		{/each}
	</div>
</form>

<style>
	#button-row {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}
	button {
		padding: 5px;
		width: 5%;
		margin: 10px;
		background-color: #626c80;
		border: none;
		border-radius: 5px;
		color: azure;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		opacity: 0.8;
	}
	button:hover {
		opacity: 1;
	}
	:root {
		--bg-color: #282c34;
		background-color: var(--bg-color);
		color: azure;
		font-family: Arial, Helvetica, sans-serif;
	}

	#container {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-template-rows: auto;
		row-gap: 15px;
		justify-items: center;
		align-items: center;
	}

	h1 {
		text-align: center;
	}
</style>
