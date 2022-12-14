<script lang="ts">
	import MoviePoster from '$lib/MoviePoster.svelte';
	import type { IMovie } from '$lib/schema/movie.schema';
	import {createEventDispatcher} from 'svelte';

	const dispatch = createEventDispatcher();

	const handleDelete = () => {
		dispatch('delete', {
			movieId: movie.id
		});
	}

	export let movie: IMovie;
</script>

<div id="container">
	<div>
		<MoviePoster imageUrl={movie.poster_path} imageAlt={movie.title} width="70px" />
	</div>
	<div>
		{movie.title}
	</div>
	<div>
		Votes: 
        <input bind:value={movie.votes} type="number">
	</div>
	<div>
        Priority:
        <input bind:value={movie.priority} type="number">
	</div>
	<div id="actions">
		<span>Actions</span>	
		<button on:click={handleDelete}>Delete</button>
	</div>
</div>

<style>
	div {
		width: 100%;
		height: 100%;
        text-align: center;
	}
	#container {
		position: relative;
		display: contents;
		z-index: 3;
	}

	#container:hover > * {
		background-color: #3f4552;
	}
	#actions {
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	#actions > button {
		padding: 5px;
		width: 30%;
		margin: 10px;
		background-color: #626c80;
		border: none;
		border-radius: 5px;
		color: azure;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		opacity: 0.8;
		cursor: pointer;
	}
	 
	#actions > button:hover {
		opacity: 1;
	}
</style>
