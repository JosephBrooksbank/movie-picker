<script lang="ts">
	import type { TMDBMovie } from "../../types/TMDB";
	import { createEventDispatcher } from "svelte";
	import { fly } from 'svelte/transition';

    export let result: TMDBMovie;
    const {poster_path: posterPath, title } = result;
	const imageBase = 'https://image.tmdb.org/t/p/original';

	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('click', result);
	}

</script>

<li on:click={handleClick} in:fly="{{y: -100, duration: 500, delay: 400}}" out:fly="{{y: -100, duration: 400}}">
	{title}
	{#if posterPath != null}
		<img src={imageBase + posterPath} alt={title}/>
	{/if}
</li>

<style>
	li {
		display: flex;
		width: 120%;
		background-color: var(--dark-gray);
		min-height: 70px;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		padding-left: 50px;
		position: relative;
		word-break: break-all;
	}
	li:hover {
		background-color: var(--light-gray);
	}
	img {
		position: absolute;
		right: 30%;
		max-height: 100%;
		aspect-ratio: initial;
		border-radius: 5px;
	}
</style>
