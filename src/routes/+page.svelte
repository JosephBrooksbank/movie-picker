<script lang="ts">
	import Card from '$lib/Card.svelte';
	import CardPicker from '$lib/CardPicker.svelte';
</script>

<h1>Movie Picker!</h1>
<p>Vote on which movie we should watch next week :)</p>

<div>
	<CardPicker>
	</CardPicker>
</div>

<style>
    :root {
        --bg-color: #282c34;
        background-color: var(--bg-color);
    }
    div {
        align-items: center;
        display: flex;
        justify-content: center;
        height: 100%;
        margin: 0px;
        overflow: visible ;
        padding: 0px;
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
