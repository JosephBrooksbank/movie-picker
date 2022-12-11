<script lang="ts">
	import { fade } from 'svelte/transition';
	export let selected: string | null;
</script>

<button id="submit" transition:fade={{ duration: 100 }} on:click>
	Vote for {selected}
</button>

<style>
	#submit {
		width: 100%;
		border-radius: 5px;
		border: none;
		font-size: 16pt;
		padding: 10px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		background-color: #3ba55c;
		opacity: 0.8;
		color: azure;
		cursor: pointer;
		transition: all 500ms;
	}

	#submit:hover {
		opacity: 1;
	}
</style>
