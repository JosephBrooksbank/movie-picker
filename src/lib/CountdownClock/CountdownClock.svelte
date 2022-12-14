<script lang="ts">
	import dayjs from 'dayjs';
	import { onMount } from 'svelte';
	import CountdownNumber from './CountdownNumber.svelte';
	export let countdownDate: dayjs.Dayjs;

	let time = dayjs();
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

<div>
	({countdownDate.format('MMMM D, h:mmA')})
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: 8px;
	}
	.animation-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
</style>
