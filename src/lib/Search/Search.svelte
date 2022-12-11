<script lang="ts">
	import Result from './Result.svelte';
	import SearchBar from './SearchBar.svelte';
	import { slide } from 'svelte/transition';

	let value: string;
	let success = false;
	let results: Record<any, any>[] = [];

	$: searchMovies(value);
	// TODO arrow navigation

	const searchMovies = async (searchTerm: string) => {
		if (searchTerm == null || searchTerm === '') {
			results = [];
			return;
		}
		const body = {
			URL: `/search/movie?query=${encodeURIComponent(searchTerm)}`
		};
		const data = await fetch('/api/tmdb', {
			method: 'POST',
			body: JSON.stringify(body)
		});
		results = (await data.json()).results;
	};

	const handleResultClicked = async (event: CustomEvent) => {
		const body = {
			...event.detail,
			dateAdded: Date.now(),
			priority: 2
		}

		const response = await fetch('/api/db/insert', {
			method: 'POST',
			body: JSON.stringify(body)
		});
		results = [];
		value = '';
		if (response.ok) {
			success = true;
			setTimeout(() => success = false, 3000)
		}
	};
</script>

<div id="container">
<SearchBar bind:value {success}/>
{#if results.length > 0}
	<ul id="search-results" transition:slide>
		{#key value}
		{#each results as result (result.id)}
			<Result {result} on:click={handleResultClicked}/>
		{/each}
		{/key}
	</ul>
{/if}
</div>

<!-- <pre>
    {JSON.stringify(results, null, 2)}
</pre> -->
<style>
	#container {
		min-width: 30%;
		min-height: 50px;
		position: relative;
		z-index: 100;
	}

	#search-results {
		max-height: 30vh;
		box-sizing: border-box;
		position: absolute;
		padding: 0;
		z-index: 1000;
		overflow: hidden;
		overflow-y: scroll;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		margin: 0;
		margin-top:-6px;
		border-radius: 0 0 24px 24px;
		padding-bottom: 10px;
		background-color: #202225;
		gap: 5px;
	}

	#search-results::-webkit-scrollbar {
		display: none;
	}
</style>
