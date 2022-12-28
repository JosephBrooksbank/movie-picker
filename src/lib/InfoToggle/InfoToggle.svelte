<script lang="ts">
	import { mode } from '$lib/Stores';
	const handleClick = () => {
		if ($mode == 'voting') {
			mode.set('info');
		} else {
			mode.set('voting');
		}
	};
</script>

<i class="fa-solid fa-circle-info fa-lg" on:click={handleClick} />

<style>
	i:hover {
		filter: brightness(50%);
	}
	i {
		cursor: pointer;
		margin: 0;
	}
</style>
