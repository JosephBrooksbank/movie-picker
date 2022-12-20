<script lang="ts">
	import { fly } from 'svelte/transition';

	export let n: number;
	export let label: string;

</script>

<div class="container">
	<div class="animation-container">
		{#key n}
			<p in:fly={{y: -50}} out:fly={{y: 50}}>
				{n}
			</p>
		{/key}
	</div>
    {n === 1 ? label : label + 's'}
</div>

<style>
	* {
		font-size: min(2.5vmax, 24pt);
	}
    .container {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .animation-container {
        display: grid;
        grid-template-columns: 1fr;
        grid-template-rows: 1fr;
    }

	.animation-container > * {
		grid-row: 1;
		grid-column: 1;
	}
</style>
