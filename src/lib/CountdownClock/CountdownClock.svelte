<script lang="ts">
	import type { IMovie } from '$lib/schema/movie.schema';
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import CountdownNumber from './CountdownNumber.svelte';
	import { nextEvent } from '$lib/Stores';

	const countdownDate = $nextEvent?.votingEnds;
	let time = dayjs();
	$: days = time.diff(countdownDate, 'days') * -1;
	$: hours = (time.diff(countdownDate, 'hours') * -1) % 24;
	$: minutes = (time.diff(countdownDate, 'minutes') * -1) % 60;
	$: seconds = (time.diff(countdownDate, 'seconds') * -1) % 60;

	onMount(() => {
		const interval = setInterval(() => {
			time = dayjs();
		}, 500);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="container">
	{#if !$nextEvent?.winner}
		<div>Voting ends in</div>
		<div class="time-container">
			{#if days > 0}
				<CountdownNumber n={days} label={'day'} />
			{/if}
			{#if hours > 0}
				<CountdownNumber n={hours} label={'hour'} />
			{/if}
			{#if minutes > 0}
				<CountdownNumber n={minutes} label={'minute'} />
			{/if}
			{#if seconds >= 0}
				<CountdownNumber n={seconds} label={'second'} />
			{/if}
		</div>
	{:else}
		<div>Voting Ended!</div>
	{/if}
	<div class="full-date">
		(Party happens {dayjs($nextEvent?.date).format('MMMM D, h:mmA')})
	</div>
</div>

<style>
	.container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.time-container {
		margin: -8px;
		display: flex;
		gap: 8px;
	}
</style>
