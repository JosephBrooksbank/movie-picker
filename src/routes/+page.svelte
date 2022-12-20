<script lang="ts">
	import CardPicker from '$lib/CardPicker/CardPicker.svelte';
	import Search from '$lib/Search/Search.svelte';
	import type { PageData } from './$types';
	import CountdownClock from '$lib/CountdownClock/CountdownClock.svelte';
	import PasswordInput from '$lib/PasswordInput.svelte';
	import WinnerModal from '$lib/Modal/WinnerModal.svelte';
	export let data: PageData;
	let { movies, nextParty, isAuth } = data;
	let blur: boolean;

	// Setting up values from cookies
	let auth: boolean = isAuth === 'true';
</script>

{#if auth}
	<WinnerModal winner={nextParty?.winner} eventDate={nextParty?.date} bind:showModal={blur}/>

	<div class="outer-container {blur ? 'blur' : ''}">
		<div class="inner-container">
			<h1>Movie Picker!</h1>
			<p>Vote on which movie we should watch next week :)</p>
			<Search />
			<CardPicker movies={movies} winner={nextParty?.winner} nextEvent={nextParty.date} />
			{#if nextParty?.date} 
			<CountdownClock
				countdownDate={nextParty.votingEnds}
				eventDate={nextParty.date}
				winner={nextParty.winner}
			/>
			{/if}
		</div>
	</div>
{:else}
	<PasswordInput on:auth={() => (auth = true)} />
{/if}

<style>
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
	}
	p {
		text-align: center;
	}
</style>
