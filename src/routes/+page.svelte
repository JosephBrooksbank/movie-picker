<script lang="ts">
	import Card from '$lib/Card.svelte';
	import CardPicker from '$lib/CardPicker.svelte';
	import Search from '$lib/Search/Search.svelte';
</script>

<div id="outer-container">
<div id="inner-container">
	<h1>Movie Picker!</h1>
	<p>Vote on which movie we should watch next week :)</p>
	<Search />
	<CardPicker />
</div>
</div>

<style>
	:root {
		--bg-color: #282c34;
		background-color: var(--bg-color);
	}
	#outer-container {
		width: 100%;
		display: flex;
		justify-content: center;
	}
	#inner-container {
		display: flex;
		flex-direction: column;
		width: 100%;
		max-width: 50%;
		gap: 8px;
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
