<script lang="ts">
	import { slide } from 'svelte/transition';

	export let n: number;
	export let label: string;

</script>

<div class="container">
	<div class="animation-container">
		{#key n}
			<p transition:slide>
				{n}
			</p>
		{/key}
	</div>
    {n === 1 ? label : label + 's'}
</div>

<style>
	* {
		font-size: 24px;
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
</style>
