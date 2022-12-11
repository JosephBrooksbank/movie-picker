<script lang="ts">
	import { scale } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	export const SEARCH_WAIT = 300;
	export let value: string = '';
	export let success = false;
	export const insertedSuccess = () => {};
	var delayTimer: NodeJS.Timeout;

	let valueWhileTyping: string;
	$: handleSearch(valueWhileTyping);
    $: valueWhileTyping = value;

	const handleStoppedTyping = (val: string) => {
		value = val;
	};

	const handleSearch = (val: string) => {
		clearTimeout(delayTimer);
		delayTimer = setTimeout(() => {
			handleStoppedTyping(val);
		}, SEARCH_WAIT);
	};
</script>

<div id="search-container">
	<input id="search-bar" bind:value={valueWhileTyping} placeholder="Add a movie" />
	<div id="icon-container">
			{#if success}
				<i
					id="success-icon"
					class="fa-solid fa-square-check fa-lg"
					transition:scale={{ delay: 250, duration: 800, easing: quintOut }}
				/>
			{:else}
				<i
					id="search-icon"
					class="fa-solid fa-magnifying-glass fa-lg"
					transition:scale={{ delay: 250, duration: 800, easing: quintOut }}
				/>
			{/if}
	</div>
</div>

<style>
	#icon-container {
		display: grid;
		grid-template-rows: 1fr;
		grid-template-columns: 1fr;
	}
	#icon-container > * {
		grid-row: 1;
		grid-column: 1;
	}
	#success-icon {
		color: #3BA55C;
	}
	#search-icon {
		color: rgb(107, 106, 106);
	}
	i {
		width: 20px;
	}

	#search-container {
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		background-color: #202225;
		display: flex;
		align-items: center;
		width: 100%;
		margin-bottom: 10px;
		border-radius: 5px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		margin: 0;
		padding: 5px;
		padding-right: 10px;
	}
	#search-bar {
		box-sizing: border-box;
		height: 100%;
		width: 100%;
		/* position: relative; */
		font-size: 12pt;
		border-radius: 5px;
		border: none;
		padding: 10px;
		padding: auto;
		padding-left: 15px;
		background-color: #202225;
		margin: 0;
		color: azure;
		z-index: 3;
	}

	#search-bar:focus {
		outline: none;
	}
</style>
