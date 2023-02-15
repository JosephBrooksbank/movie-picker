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

<div>
<i class="fa-solid fa-circle-info fa-lg" on:click={handleClick} />
<p>👈🏻click this!</p>
</div>
<style>
	div {
		display: flex;
		align-items: center;
		gap: 2px;
	}
	i:hover {
		filter: brightness(50%);
	}
	i {
		cursor: pointer;
		margin: 0;
		margin-left: 10px;
	}
</style>
