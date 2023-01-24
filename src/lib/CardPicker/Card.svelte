<script lang="ts">
	import { mode } from '$lib/Stores';
	import MoviePoster from '$lib/MoviePoster.svelte';
	export let mousePos: { x: number; y: number };
	export let selected: boolean = false;
	export let overview: string;
	export let poster_path: string;
	export let title: string;
	export let showMoviePoster: boolean = true;
	let self: any;

	$: rect = self?.getBoundingClientRect() ?? { x: 0, y: 0 };
	$: m = {
		x: mousePos.x - rect.x,
		y: mousePos.y - rect.y
	};
</script>

<div
	bind:this={self}
	class="card {selected ? 'selected' : ''}"
	style="--mouse-x:{m.x}px; --mouse-y:{m.y}px"
>
	<div class="card-content" on:click>
		{#if showMoviePoster}
			<div class="overlay {$mode == 'info' ? 'show' : 'hide'}">
				<div class="left">
					<span class="quote">“</span>
				</div>
				<blockquote>
					{overview}
				</blockquote>
				<div class="right">
					<span class="quote">”</span>
				</div>
			</div>

			<MoviePoster
				imageUrl={poster_path}
				imageAlt={`A poster for the movie '${title}`}
			/>
		{:else}
			<div id="flashlight">
				<i class="fa-solid fa-arrow-up fa-9x" />
				<h1>Add movies above.</h1>
			</div>
		{/if}
	</div>
</div>

<style>
	.quote {
		font-size: 5vmin;
		padding: 0px;
	}

	blockquote {

		margin: 5%;
	}
	.left {
		width: 100%;
		display: flex;
		padding-left: 30px;
	}
	.right {
		width: 100%;
		display: flex;
		justify-content: end;
		padding-right: 30px;
	}
	.overlay {
		height: 100%;
		width: 100%;
		position: absolute;
		background: black;
		border-radius: 10px;
		transition: opacity 500ms ease;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 5%;
		font-size: 2vmin;
		overflow-y: scroll;
	}
	.overlay::-webkit-scrollbar {
		display: none;
	}
	.overlay.show {
		opacity: 90%;
	}
	.overlay.hide {
		opacity: 0%;
	}

	.selected {
		background-color: var(--green) !important;
	}
	#flashlight {
		/* position: relative; */
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
		background: radial-gradient(
			800px circle at var(--mouse-x) var(--mouse-y),
			rgba(255, 255, 255, 0.06),
			transparent 40%
		);
		background-clip: text;
		-webkit-background-clip: text;
		opacity: 0;
	}
	#flashlight > * {
		text-align: center;
		color: transparent;
		background-clip: text;
		-webkit-background-clip: text;
	}
	#flashlight > i {
		font-size: 5vmax;
	}
	#flashlight > h1 {
		font-size: 1.5vmax;
	}

	img {
		object-fit: cover;
		aspect-ratio: 67.5/100;
		width: 100%;
		border-radius: 10px;
		opacity: 0.8;
	}
	.card {
		--card-color: rgba(255, 255, 255, 0.1);
		cursor: pointer;
		border-radius: 10px;
		background-color: var(--card-color);
		aspect-ratio: 67.5 / 100;
		position: relative;
		padding: 1px;
		transition: transform 500ms ease, box-shadow 400ms ease-in-out, background-color 100ms;
		margin: 1px;
		width: 100%;
	}

	.card:hover {
		transform: translate(2px, -2px);
		box-shadow: rgba(0, 0, 0, 0.35) 0px 2px 6px;
	}

	/* glow effect */
	.card::after,
	.card::before {
		display: block;
		content: '';
		opacity: 0;
		transition: opacity 500ms;
		border-radius: inherit;
		height: 100%;
		left: 0px;
		position: absolute;
		top: 0px;
		width: 100%;
	}

	/* Main body glow effect */
	.card::before {
		background: radial-gradient(
			800px circle at var(--mouse-x) var(--mouse-y),
			rgba(255, 255, 255, 0.06),
			transparent 40%
		);
		z-index: 3;
		pointer-events: none;
	}

	/* Border glow effect */
	.card::after {
		background: radial-gradient(
			400px circle at var(--mouse-x) var(--mouse-y),
			rgba(255, 255, 255, 0.3),
			transparent 40%
		);
		z-index: 1;
		pointer-events: none;
	}

	.card:hover::before {
		opacity: 1;
	}

	/* main body color */
	.card-content {
		/* display: inline-block; */
		background-color: var(--darker-gray);
		border-radius: inherit;
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
</style>
