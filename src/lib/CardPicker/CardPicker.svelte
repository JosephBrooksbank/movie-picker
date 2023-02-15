<script lang="ts">
	import Cookies from 'js-cookie';
	import { nextEvent } from '$lib/Stores';
	import { onMount } from 'svelte';
	import Card from './Card.svelte';
	import VoteButton from './VoteButton.svelte';
	import { isContestantGuard, isMovieGuard } from '$lib/utils';
	import type { IContestant } from '$lib/schema/party.schema';

	interface ICastVote {
		contestantId?: string;
		eventDate?: Date;
	}

	let previousVote: ICastVote = {};
	let selected: IContestant | null;

	let mousePos = { x: 0, y: 0 };

	const handleMouseMove = (event: any) => {
		mousePos.x = event.clientX;
		mousePos.y = event.clientY;
	};

	const handleCardClick = (choice: IContestant) => () => {
		if (selected?._id === choice._id) {
			selected = null;
		} else {
			selected = choice;
		}
	};

	onMount(async () => {
		previousVote = JSON.parse(Cookies.get('vote') ?? '{}');
	});

	const handleVoteClick = async () => {
		if (selected) {
			previousVote = {
				contestantId: selected._id,
				eventDate: $nextEvent?.date
			};
			Cookies.set('vote', JSON.stringify(previousVote), {
				expires: 2 ^ 31
			});

			const date = new Date();
			const day = date.getDay();
			const fromMonday = date.getDate() - day + (day == 0 ? -6 : 1); // sunday is 0 day according to date
			date.setDate(fromMonday);
			const body = {
				partyId: $nextEvent?._id,
				contestantId: selected._id
			};

			const response = await fetch('/api/votes/add', {
				method: 'POST',
				body: JSON.stringify(body)
			});

			selected = null;
			if (!response.ok) {
				// TODO some sort of error handling
			}
		}
	};

	const fakeCard = {
		overview: 'No movies at this time!',
		title: '',
		poster_path: ''
	};
	const cardsArray = [1, 2, 3];
</script>

<div id="cards" on:mousemove={handleMouseMove}>
	{#if $nextEvent?.contestants}
		{#each $nextEvent.contestants as contestant}
		{#if isContestantGuard(contestant)}
			{#if isMovieGuard(contestant.movie)}
				<Card
					{mousePos}
					on:click={handleCardClick(contestant)}
					selected={selected?._id === contestant._id}
					overview={contestant.movie.overview}
					title={contestant.movie.title}
					poster_path={contestant.movie.poster_path}
					showMoviePoster={!!$nextEvent?.date}
				/>
			{/if}
			{/if}
		{/each}
	{:else}
		{#each [0,1,2] as n}
			<Card {mousePos} selected={false} {...fakeCard} showMoviePoster={false} />
		{/each}
	{/if}
</div>
<VoteButton
	selected={isMovieGuard(selected?.movie) ? selected?.movie.title : null}
	on:click={handleVoteClick}
	alreadyVoted={$nextEvent?.date == previousVote.eventDate}
/>

<style>
	#cards {
		display: flex;
		width: 100%;
		gap: 8px;
		justify-content: space-between;
	}

	/* need to affect styles in individual card components for cool border-hover effect */
	:global(#cards:hover > .card::after) {
		opacity: 1;
	}
	:global(#cards:hover #flashlight) {
		opacity: 1;
	}
</style>
