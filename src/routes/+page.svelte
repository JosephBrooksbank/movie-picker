<script lang="ts">
	import CardPicker from '$lib/CardPicker/CardPicker.svelte';
	import Search from '$lib/Search/Search.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import CountdownClock from '$lib/CountdownClock/CountdownClock.svelte';
	dayjs.extend(relativeTime);
	const nextEvent = dayjs(data.nextParty.date);
</script>

<div id="outer-container">
	<div id="inner-container">
		<h1>Movie Picker!</h1>
		<p>Vote on which movie we should watch next week :)</p>
		<Search />
		<CardPicker movies={data.movies} />
		<p>
			Next Event in <CountdownClock countdownDate={nextEvent} />
		</p>
	</div>
</div>

<style>
	:root {
		--bg-color: #282c34;
		background-color: var(--bg-color);
	}
	#outer-container {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	#inner-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: min(95%, 1000px);
		gap: 8px;
	}
	h1 {
		text-align: center;
	}
	p {
		text-align: center;
	}
	:global(body) {
		height: 100%;
		color: azure;
		font-family: Arial, Helvetica, sans-serif;
	}
</style>
