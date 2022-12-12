<script lang="ts">
	import MoviePoster from '$lib/MoviePoster.svelte';

	export let movie: Record<string, any>;
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
</style>
