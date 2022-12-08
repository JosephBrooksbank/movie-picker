<script lang="ts">
	export let mousePos: { x: number; y: number };
	let self: any;

	$: rect = self?.getBoundingClientRect() ?? { x: 0, y: 0 };
	$: m = {
		x: mousePos.x - rect.x,
		y: mousePos.y - rect.y
	};
</script>

<div bind:this={self} class="card" style="--mouse-x:{m.x}px; --mouse-y:{m.y}px">
	<div class="card-content" />
</div>

<style>
	.card {
		--card-color: rgba(255, 255, 255, 0.1);
		cursor: pointer;
		border-radius: 10px;
		background-color: var(--card-color);
		aspect-ratio: 67.5 / 100;
		width: 300px;
		position: relative;
		padding: 1px;
		transition: transform 500ms ease, box-shadow 400ms ease-in-out;
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
	}

	/* Border glow effect */
	.card::after {
		background: radial-gradient(
			400px circle at var(--mouse-x) var(--mouse-y),
			rgba(255, 255, 255, 0.3),
			transparent 40%
		);
		z-index: 1;
	}

	.card:hover::before {
		opacity: 1;
	}

	/* main body color */
	.card-content {
		/* display: inline-block; */
		background-color: rgba(23, 23, 23, 1);
		border-radius: inherit;
		position: relative;
		width: 100%;
		height: 100%;
		z-index: 2;
	}
</style>
