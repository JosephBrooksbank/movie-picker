<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import CountdownNumber from './CountdownNumber.svelte';
	export let countdownDate: dayjs.Dayjs;
	export let eventDate: dayjs.Dayjs;

	let time = dayjs();
	$: days = (time.diff(countdownDate, 'days') *-1);
	$: hours = (time.diff(countdownDate, 'hours') * -1) % 60;
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
	<div>Voting ends in</div>
	<div class="time-container">
		{#if days > 0}
			<CountdownNumber n={days} label={'day'}/>
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
	<div class="full-date">
		(Party happens {eventDate.format('MMMM D, h:mmA')})
	</div>
</div>

<style>
	.container {
		margin-top: 20px;
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
	}
	.time-container {
		margin: -8px;
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
</style>
