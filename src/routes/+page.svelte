<script lang="ts">
	import CardPicker from '$lib/CardPicker/CardPicker.svelte';
	import Search from '$lib/Search/Search.svelte';
	import type { PageData } from './$types';
	export let data: PageData;
	import dayjs from 'dayjs';
	import relativeTime from 'dayjs/plugin/relativeTime';
	import CountdownClock from '$lib/CountdownClock/CountdownClock.svelte';
	import Modal from '$lib/Modal/Modal.svelte';
	import MoviePoster from '$lib/MoviePoster.svelte';
	import PasswordInput from '$lib/PasswordInput.svelte';
	import { onMount } from 'svelte';
	let showModal: boolean = false;
	if (data.partyData.winner) {
		showModal = true;
	}

	let auth: boolean = false;
	onMount(async () => {
		// No this is not secure. No I don't care.
		if (window) {
			if (localStorage.getItem('isAuth') === 'true') {
				auth = true;
			}
		}
	});
	dayjs.extend(relativeTime);
	const nextEvent = dayjs(data.partyData.eventDate);
	const votingEnds = dayjs(data.partyData.votingEnds);
</script>

{#if auth}
	<Modal show={showModal} on:click={() => (showModal = false)}>
		<div>
			<h1>🎊Winner!🎊</h1>
			<MoviePoster
				imageUrl={data.partyData.winner.poster_path}
				imageAlt={`Poster for ${data.partyData.winner.title}`}
				width="100%"
			/>
			<h1>{data.partyData.winner.title}</h1>
		</div>
	</Modal>

	<div class="outer-container {showModal ? blur : ''}">
		<div class="inner-container">
			<h1>Movie Picker!</h1>
			<p>Vote on which movie we should watch next week :)</p>
			<Search />
			<CardPicker movies={data.movies} winner={data.partyData.winner} />
			<CountdownClock
				countdownDate={votingEnds}
				eventDate={nextEvent}
				winner={data.partyData.winner}
			/>
		</div>
	</div>
{:else}
	<PasswordInput on:auth={() => auth = true } />
{/if}

<style>
	.blur {
		filter: blur(10px);
	}
	:root {
		--bg-color: #282c34;
		background-color: var(--bg-color);
	}
	.outer-container {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	.inner-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: min(95%, 1000px);
		gap: 8px;
	}
	h1 {
		text-align: center;
	}
	h2 {
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
