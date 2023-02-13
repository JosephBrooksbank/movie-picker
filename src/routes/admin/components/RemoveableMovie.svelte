<script lang="ts">
</script>

<button on:click type="button">
	<slot />
	<div class="delete">
		<i class="fa-solid fa-xmark fa-2xl" style="color: white" />
	</div>
</button>

<style>
	button {
        display: flex;
		position: relative;
		background-color: rgba(0, 0, 0, 0);
		border: none;
		padding: 0;
		margin: 0;
		cursor: pointer;
		width: 70px;
        aspect-ratio: 67.5/100;
	}

	.delete {
        opacity: 0;
        background-color: black;
		z-index: 1;
        width: 100%;
        height: 100%;
        border-radius: 10px;
		display: flex;
		position: absolute;
        top: 0;
        left: 0;
        justify-content: center;
        align-items: center;
	}
	.delete:hover {
        opacity: 80%;
	}
</style>
