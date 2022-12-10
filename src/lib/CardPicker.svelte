<script lang="ts">
	import Card from "./Card.svelte";


	let mousePos = { x: 0, y: 0 };

	const handleMouseMove = (event: any) => {
		mousePos.x = event.clientX;
		mousePos.y = event.clientY;
	};
</script>

<div id="cards" on:mousemove={handleMouseMove}>
		<Card {mousePos}/>
		<Card {mousePos}/>
		<Card {mousePos}/>
</div>

<style>
	div {
        display: flex ;
        flex-grow: 1 1 0;
		width: 100%;
        gap: 8px;
		justify-content: center;
	}
    :global(#cards:hover > .card::after) {
        opacity: 1;
    }
</style>
