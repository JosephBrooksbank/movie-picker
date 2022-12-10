<script lang="ts">
	import Result from './Result.svelte';
    const SEARCH_WAIT = 300;

	let value: string;
	var delayTimer: NodeJS.Timeout;
	let results: Record<any, any>[] = [];

	$: handleSearch(value);

	const handleSearch = (value: string) => {
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => {
			searchMovies(value);
		}, SEARCH_WAIT);
	};

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
</script>

<input bind:value />
{#if results.length > 0}
	<div id="search-results">
		{#each results as result}
			<Result title={result.title} posterPath={result.poster_path} />
		{/each}
	</div>
{/if}

<!-- <pre>
    {JSON.stringify(results, null, 2)}
</pre> -->
<style>
	input {
		width: 100%;
		border-radius: 5px;
	}

	#search-results {
		width: 100%;
		position: absolute;
		display: flex;
		flex-direction: column;
		gap: 5px;
		background-color: white;
		border-radius: 10px;
		padding: 5px;
		z-index: 1000;
	}
</style>
