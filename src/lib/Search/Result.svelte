<script lang="ts">
	export let title: string;
    export let posterPath: string;
    const imageBase = 'https://image.tmdb.org/t/p/original'
</script>

<div>
	{title}
    {#if posterPath != null}
    <img src={imageBase + posterPath}>
    {/if}
</div>

<style>
	div {
        display: flex;
		background-color: white;
        color: black;
        align-items: center;
        justify-content: space-between;
        padding: 1% 5%;
        border-bottom: gray solid;
	}
    img {
        width: 50px
    }
</style>
