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
        width: calc(100% - 20px);
        max-width: 1000px;
        gap: 8px;
	}
    :global(#cards:hover > .card::after) {
        opacity: 1;
    }
</style>
