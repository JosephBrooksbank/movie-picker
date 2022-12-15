<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import dayjs from 'dayjs';
	import timezone from 'dayjs/plugin/timezone';
	import utc from 'dayjs/plugin/utc';
	import EventData from './EventData.svelte';
	import MovieData from './MovieData.svelte';
	export let data: import('./$types').PageData;

	dayjs.extend(utc);
	dayjs.extend(timezone);
	const handleMoviesSubmit = async () => {
		const response = await fetch('/api/db/update/movie', {
			method: 'POST',
			body: JSON.stringify(data.movies)
		});
	};

	const handleDelete = async (event: CustomEvent<{ movieId: string }>) => {
		const response = await fetch('/api/db/delete/movie', {
			method: 'POST',
			body: JSON.stringify({ id: event.detail.movieId })
		});

		invalidateAll();
	};
</script>

<h1>Admin Settings</h1>

<h2>Add Event</h2>
<form method="POST" action="?/newEvent">
	<input type="submit" style="display: none" />
	Day of event: <input type="date" name="date" />
</form>
<h2>Existing Events</h2>
<EventData events={data.events}/>

<h2>Movie settings</h2>
<form method="POST" on:submit|preventDefault={handleMoviesSubmit}>
	<div id="button-row">
		<button>Save</button>
	</div>
	<div id="container">
		{#each data.movies as movie}
			<MovieData bind:movie on:delete={handleDelete} />
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
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: auto;
		row-gap: 15px;
		justify-items: center;
		align-items: center;
	}

	h1 {
		text-align: center;
	}
</style>
