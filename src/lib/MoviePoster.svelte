<script lang="ts">
	const imageBase = 'https://image.tmdb.org/t/p/w500';
    export let imageUrl: string;
    export let imageAlt: string;
    export let width: string = "100%";
</script>

<img src={imageBase + imageUrl} alt={imageAlt} style='width: {width}' draggable="false"/>

<style>
    img {
        object-fit: cover;
        aspect-ratio: 67.5/100;
        width: 100%;
        border-radius: 10px;
    }
</style>