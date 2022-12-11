<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import { fly } from 'svelte/transition';


    export let result: Record<string, any>;
    const {poster_path: posterPath, title, ...rest} = result;
	const imageBase = 'https://image.tmdb.org/t/p/original';

	const dispatch = createEventDispatcher();
	const handleClick = () => {
		dispatch('click', result);
	}

</script>

<li on:click={handleClick} in:fly="{{y: -100, duration: 500}}">
	{title}
	{#if posterPath != null}
		<img src={imageBase + posterPath} />
	{/if}
</li>

<style>
	li {
		display: flex;
		width: 120%;
		background-color: #202225;
		min-height: 70px;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		padding-left: 50px;
		position: relative;
		word-break: break-all;
	}
	li:hover {
		background-color: #2e3136;
	}
	img {
		position: absolute;
		right: 30%;
		max-height: 100%;
		aspect-ratio: initial;
		border-radius: 5px;
	}
</style>
