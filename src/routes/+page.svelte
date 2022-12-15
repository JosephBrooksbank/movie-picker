<script lang="ts">
	import CardPicker from '$lib/CardPicker/CardPicker.svelte';
	import Search from '$lib/Search/Search.svelte';
	import type { PageData } from './$types';
	import CountdownClock from '$lib/CountdownClock/CountdownClock.svelte';
	import PasswordInput from '$lib/PasswordInput.svelte';
	import Cookies from 'js-cookie';

	import { onMount } from 'svelte';
	import WinnerModal from '$lib/Modal/WinnerModal.svelte';
	export let data: PageData;
	const { movies, partyData } = data;

	// Setting up values and then overriding with cookies if necessary
	let showModal: boolean = false;
	let auth: boolean = false;

	if (partyData?.winner) {
		showModal = true;
	}

	onMount(async () => {
		const cookies = Cookies.get();
		// No this is not secure. No I don't care.
		if (cookies.isAuth) {
			auth = true;
		}

		if (cookies.winnerSeen === partyData?.eventDate.toString()) {
			showModal = false;
		}
	});
</script>

{#if auth}
	<WinnerModal winner={partyData?.winner} eventDate={partyData?.eventDate} />

	<div class="outer-container {showModal ? blur : ''}">
		<div class="inner-container">
			<h1>Movie Picker!</h1>
			<p>Vote on which movie we should watch next week :)</p>
			<Search />
			<CardPicker movies={movies} winner={partyData?.winner} />
			<CountdownClock
				countdownDate={partyData?.votingEnds}
				eventDate={partyData?.eventDate}
				winner={partyData?.winner}
			/>
		</div>
	</div>
{:else}
	<PasswordInput on:auth={() => (auth = true)} />
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
