<script lang="ts">
	import { enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import CurrentResults from '$lib/CurrentResults/CurrentResults.svelte';
	import MoviePoster from '$lib/MoviePoster.svelte';
	import type { IMovie } from '$lib/schema/movie.schema';
	import dayjs from 'dayjs';
	import timezone from 'dayjs/plugin/timezone';
	import utc from 'dayjs/plugin/utc';
	import RemoveableMovie from './components/RemoveableMovie.svelte';
	import EventData from './EventData.svelte';
	import MovieData from './MovieData.svelte';
	export let data: import('./$types').PageData;
	let showEventForm: boolean = false;
	let newEventMovies: IMovie[] = [];

	dayjs.extend(utc);
	dayjs.extend(timezone);
	const handleMoviesSubmit = async () => {
		const response = await fetch('/api/movies/update', {
			method: 'POST',
			body: JSON.stringify(data.movies)
		});

		invalidateAll();
	};

	const handleDelete = async (event: CustomEvent<{ movieId: string }>) => {
		const response = await fetch('/api/movies/delete', {
			method: 'POST',
			body: JSON.stringify({ id: event.detail.movieId })
		});

		invalidateAll();
	};

	const votingUnits = ['days', 'hours', 'minutes'];

	const handleAddEventButtonClick = async () => {
		showEventForm = !showEventForm;
		if (showEventForm) {
			newEventMovies = await (
				await fetch('/api/movies/get', {
					method: 'POST',
					body: JSON.stringify({
						count: 3
					})
				})
			).json();
		}
	};

	const exhangeMovie = async (index: number) => {
		const newMovie = await (
			await fetch('/api/movies/get', {
				method: 'POST',
				body: JSON.stringify({
					count: 1,
					excludedIds: newEventMovies.map((m) => m._id)
				})
			})
		).json();

		newEventMovies[index] = newMovie[0];
	};
</script>

<h1>Admin Settings</h1>

<h2>Add Event</h2>
<button on:click={handleAddEventButtonClick}>Add Event</button>
<form
	method="POST"
	action="?/newEvent"
	class="add-event-form {showEventForm} use:enhance"
	use:enhance={({ form, data, action, cancel }) => {
		showEventForm = false;
	}}
>
	<label for="date">Day of event:</label>
	<input type="date" name="date" />
	<label for="votingOffset">Voting Ends</label>
	<div>
		<input type="number" name="votingOffset" value="2" />
		<select id="voting-unit" name="offsetUnit">
			{#each votingUnits as unit}
				<option value={unit}>{unit}</option>
			{/each}
		</select>
	</div>
	<label for="votingOffset">Before event</label>
	<div class="movies_container">
		{#each newEventMovies as movie, index}
			<RemoveableMovie on:click={() => exhangeMovie(index)}>
				<div>
					<MoviePoster imageUrl={movie.poster_path} imageAlt={movie.title} width="70px" />
					<div>{movie.title}</div>
				</div>
			</RemoveableMovie>
		{/each}
	</div>
	<button type="submit">Save Event</button>
	<input type="submit" style="display: none" />
	<input value={JSON.stringify(newEventMovies)} style="display: none" name="movies" />
</form>
<div class="flex-container">
	<div class="flex-obj">
		<h2>Existing Events</h2>
		<EventData events={data.events} />
	</div>
	<div class="flex-obj">
		<h2>Current Event</h2>
		<CurrentResults />
	</div>
</div>
<h2>Movie settings</h2>
<form method="POST" on:submit|preventDefault={handleMoviesSubmit}>
	<div id="button-row">
		<button>Save</button>
	</div>
	<div id="container">
		{#each data.movies as movie, index}
			<MovieData bind:movie on:delete={handleDelete} />
		{/each}
	</div>
</form>

<style>
	.flex-obj {
		flex-grow: 1;
	}
	.flex-container {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		flex-grow: 1;
	}
	.change_movie_button {
		position: relative;
	}
	.change_movie_button::after {
		position: absolute;
		background-color: black;
		z-index: 100;
		width: 100%;
		height: 100%;
	}
	.movies_container {
		display: flex;
		gap: 16px;
	}
	[type='date'] {
		background: #fff
			url(https://cdn1.iconfinder.com/data/icons/cc_mono_icon_set/blacks/16x16/calendar_2.png) 97%
			50% no-repeat;
	}
	[type='date']::-webkit-inner-spin-button {
		display: none;
	}
	[type='date']::-webkit-calendar-picker-indicator {
		opacity: 0;
	}

	.add-event-form {
		transition: all 500ms cubic-bezier(0.28, -0.94, 0.55, 2);
		background: var(--light-gray);
		padding: 5px;
		border-radius: 10px;
		overflow: hidden;
		display: flex;
		justify-content: baseline;
		align-items: left;
		gap: 10px;
		flex-direction: column;
		font-size: 24px;
		width: fit-content;
	}
	.add-event-form input {
		border: 1px solid var(--light-gray);
		border-radius: 5px;
		padding: 3px 5px;
		box-shadow: box-shadow inset 0 3px 6px rgba(0, 0, 0, 0.1);
	}
	.add-event-form select {
		border-radius: 5px;
		padding: 3px 5px;
		border: 1px solid var(--light-gray);
	}
	.add-event-form.false {
		height: 0;
		opacity: 0;
	}

	.add-event-form.true {
		height: 410px;
	}

	.add-event-form button {
		width: fit-content;
		background-color: var(--dark-gray);
	}

	#button-row {
		display: flex;
		justify-content: center;
		margin-bottom: 20px;
	}
	button {
		padding: 5px;
		width: 5%;
		margin: 10px;
		background-color: var(--button-bg-color);
		border: none;
		border-radius: 5px;
		color: azure;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		opacity: 0.8;
	}
	button:hover {
		opacity: 1;
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
