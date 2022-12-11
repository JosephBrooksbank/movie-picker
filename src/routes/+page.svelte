<script lang="ts">
	import Card from '$lib/Card.svelte';
	import CardPicker from '$lib/CardPicker.svelte';
	import Search from '$lib/Search/Search.svelte';
</script>

<div>
	<h1>Movie Picker!</h1>
	<p>Vote on which movie we should watch next week :)</p>
	<Search />
	<CardPicker />
</div>

<style>
	:root {
		--bg-color: #282c34;
		background-color: var(--bg-color);
	}
	div {
		gap: 10px;
		align-items: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
		margin: 0px;
		overflow: visible;
		padding: 0px;
	}
	h1 {
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
