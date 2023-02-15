<script lang="ts">
	import MoviePoster from '$lib/MoviePoster.svelte';
	import type { IParty } from '$lib/schema/party.schema';
	import { isContestantGuard, isPartyGuard } from '$lib/utils';
	import { onMount } from 'svelte';
	let currentEvent: IParty;
	let max = 0;
	let animDelay = true;
	setTimeout(() => {
		animDelay = false;
	}, 800);

	onMount(async () => {
		currentEvent = (await (await fetch('/api/parties/get-current')).json()) as IParty;
	});

	$: currentEvent?.contestants.map((c) => {
		if (isContestantGuard(c)) {
			if (c.votes > max) {
				max = c.votes + 2;
			}
		}
	});
</script>

<div class="rows">
	{#if isPartyGuard(currentEvent)}
		{#each currentEvent.contestants as contestant}
			{#if isContestantGuard(contestant)}
				<div class="row">
					<div title={contestant.movie.title}>
						<MoviePoster
							imageUrl={contestant.movie.poster_path}
							imageAlt={contestant.movie.title}
							width={'min(50px, 20vw)'}
						/>
					</div>
					<div class="bar-container">
						<div
							class="bar"
							style="flex-grow: {animDelay ? 0 : contestant.votes}"
							title={`${contestant.votes}`}
						/>
						<div class="space" style="flex-grow: {max - contestant.votes}" />
					</div>
				</div>
			{/if}
		{/each}
	{/if}
</div>

<style>
	.bar-container {
		display: flex;
		width: 100%;
		height: 100%;
	}
	.rows {
		display: flex;
		flex-direction: column;
		width: 400px;
	}
	.row {
		display: flex;
		align-items: center;
		gap: 8px;
	}
	.bar {
		background-color: var(--green);
		width: 0%;
		height: 30px;
		border-radius: 0px 5px 5px 0px;
		transition: all cubic-bezier(0.42, 0, 0.58, 1) 1s;
	}
</style>
