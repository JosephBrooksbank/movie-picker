<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import dayjs from 'dayjs';
	import timezone from 'dayjs/plugin/timezone';
	import utc from 'dayjs/plugin/utc';
	import EventData from './EventData.svelte';
	import MovieData from './MovieData.svelte';
	export let data: import('./$types').PageData;
	let showEventForm: boolean = true;

	dayjs.extend(utc);
	dayjs.extend(timezone);
	const handleMoviesSubmit = async () => {
		const response = await fetch('/api/db/update/movie', {
			method: 'POST',
			body: JSON.stringify(data.movies)
		});

		invalidateAll();
	};

	const handleDelete = async (event: CustomEvent<{ movieId: string }>) => {
		const response = await fetch('/api/db/delete/movie', {
			method: 'POST',
			body: JSON.stringify({ id: event.detail.movieId })
		});

		invalidateAll();
	};

	const votingUnits = [
		'days',
		'hours',
		'minutes'
	]
</script>

<h1>Admin Settings</h1>

<h2>Add Event</h2>
<button on:click={() => (showEventForm = !showEventForm)}>Add Event</button>
<form method="POST" action="?/newEvent" class="add-event-form {showEventForm} use:enhance">
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
	<button type="submit">Save Event</button>
	<input type="submit" style="display: none" />
</form>
<h2>Existing Events</h2>
<EventData events={data.events} />

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
		height: 300px;
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
