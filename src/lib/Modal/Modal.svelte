<script lang="ts">
	import { fade, fly } from "svelte/transition";
	import { onMount } from "svelte";



    export let show: boolean = false;

    // hacky workaround to do transition on page load 
    let ready: boolean = false;
    onMount(() => {
        ready = true;
    });

</script>

{#if ready && show}
<div id='darken' transition:fade={{duration:500}}></div>
<div id="container" on:click>
	<div id="contents"transition:fly={{y:-500, duration: 1000}}>
        <slot/>
	</div>
</div>
{/if}

<style>
    #darken {
        top: 0;
        right: 0;
        position: fixed;
        width: 100%;
        height: 100%;
        background-color: black;
        z-index: 99;
        opacity: 0.8;
    }

	#container {
        top: 0;
        right: 0;
		position: fixed;
        width: 100%;
        height: 100%;
        margin: 0px;
        display: flex;
		z-index: 100;
        justify-content: center;
	}
    #contents {
        display: flex;
        width: min(50%, 500px, 50vh);
        align-items: center;
        justify-content: center;
        /* transform: translate(-50%, -50%); */
    }
</style>
