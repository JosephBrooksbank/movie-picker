<script lang="ts">
	import CardPicker from '$lib/CardPicker/CardPicker.svelte';
	import Search from '$lib/Search/Search.svelte';
	import type { PageData } from './$types';
	import CountdownClock from '$lib/CountdownClock/CountdownClock.svelte';
	import PasswordInput from '$lib/PasswordInput.svelte';
	import WinnerModal from '$lib/Modal/WinnerModal.svelte';
	import { onMount } from 'svelte';
	import { movies, nextEvent } from '$lib/Stores';
	import { isMovieGuard, isPartyGuard } from '$lib/utils';
	import InfoToggle from '$lib/InfoToggle/InfoToggle.svelte';
	export let data: PageData;
	let blur: boolean;

	onMount(() => {
		if (isPartyGuard(data.nextParty)) {
			nextEvent.set(data.nextParty);
		}
		if (isMovieGuard(data.movies[0])) {
			movies.set(data.movies);
		}
	});

	// Setting up values from cookies
	let auth: boolean = data.isAuth === 'true';
</script>

{#if auth}
	<WinnerModal bind:showModal={blur} />

	<div class="outer-container {blur ? 'blur' : ''}">
		<div class="inner-container">
			<div id="toolbar">
				<h1>Movie Picker!</h1>
				<InfoToggle />
			</div>
			<p>Vote on which movie we should watch next week :)</p>
			<Search />
			<CardPicker />
			{#if $nextEvent?.date}
				<CountdownClock />
			{/if}
		</div>
	</div>
{:else}
	<PasswordInput on:auth={() => (auth = true)} />
{/if}

<style>
	#toolbar {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 16px;
	}
	:root {
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
		margin: 0;
	}
	p {
		text-align: center;
	}
</style>
