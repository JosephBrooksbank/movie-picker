<script lang="ts">
	import { nextEvent } from '$lib/Stores';
	import { isMovieGuard } from '$lib/utils';
	import { createEventDispatcher } from 'svelte';
	import { fade } from 'svelte/transition';

	export let selected: string | null | undefined;
	export let alreadyVoted: boolean = false;
	let activeClass = '';

	const dispatch = createEventDispatcher();

	const handleClick = (e: Event) => {
		const animationTiming = 1000;
		const waitTime = 1000;
		activeClass = 'active';
		setTimeout(() => {
			activeClass = 'finished';
			setTimeout(() => {
				dispatch('click', e);
			}, waitTime);
		}, animationTiming);
	};
</script>

<div class="container">
	{#if !$nextEvent?.date}
		<div class="submit closed">No Events coming up. Suggest movies for future events!</div>
	{:else if $nextEvent?.winner && isMovieGuard($nextEvent.winner)}
		<div class="submit closed">
			🎊 Winner: {$nextEvent.winner.title} 🎊
		</div>
	{:else if alreadyVoted}
		<div class="submit closed">
			Already voted
			<i class="fa-solid fa-circle-check" />
		</div>
	{:else if selected}
		<button class="submit open" transition:fade={{ duration: 100 }} on:click={handleClick}>
			<span class="buttonText {activeClass}">
				Vote for {selected}
			</span>
			<span class="loading anim {activeClass}">
				<i class="fa-solid fa-arrow-rotate-right" />
			</span>
			<span class="end anim {activeClass}">
				<i class="fa-solid fa-check" />
			</span>
		</button>
	{:else}
		<div class="space" />
	{/if}
</div>

<style>	
	.anim {
		opacity: 0;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.loading {
		transition: opacity 200ms;
	}
	.loading i {
		animation: loading 500ms linear infinite;
	}
	.loading.active {
		opacity: 1;
	}
	.end.finished {
		opacity: 1;
	}
	.end.finished i {
		animation: scale 500ms linear; 
	}
	.buttonText.active {
		opacity: 0;
	}
	.buttonText.finished {
		opacity: 0;
	}
	* {
		box-sizing: border-box;
	}
	.space {
		height: 45px;
	}
	.container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}

	.container > * {
		grid-row: 1;
		grid-column: 1;
		width: fit-content;
	}
	.submit {
		width: 100%;
		border-radius: 5px;
		border: none;
		font-size: 16pt;
		padding: 10px;
		box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
		opacity: 0.8;
		/* transition: background-color 500ms; */
	}
	button {
		position: relative;
		background-color: var(--green);
	}

	.open {
		cursor: pointer;
		color: azure;
	}
	.closed {
		background-color: var(--dark-gray);
		color: azure;
		text-align: center;
	}

	.submit:hover {
		opacity: 1;
	}

	@keyframes loading {
		100% {
			transform: rotate(360deg);
		}
	}
	@keyframes scale {
		0% {
			transform: scale(10);
		}
		50% {
			transform: scale(0.2);
		}
		70% {
			transform: scale(1.2);
		}
		90% {
			transform: scale(0.7);
		}
		100% {
			transform: scale(1);
		}
	}
</style>
