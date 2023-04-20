//@ts-ignore must import schema to use it
import { type IMovie } from '$lib/schema/movie.schema';
import { Party, type IParty } from '$lib/schema/party.schema';
import { isContestantsGuard, isMovieGuard, isPartyGuard, pojo } from '$lib/utils';
import dayjs from 'dayjs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const parties = await Party.find({ date: { $gt: new Date() } })
		.populate<{ winner: IMovie }>('winner')
		.populate({
			path: 'contestants',
			populate: {
				path: 'movie',
				model: 'Movie'
			}
		})
		.limit(1)
		.sort({ date: 1 }) as IParty[];

	const nextParty = parties[0] ?? {};

	// If the voting is over and a winner hasn't been chosen, get a winner
	if (isPartyGuard(nextParty) && dayjs().toDate() > nextParty.votingEnds && !nextParty.winner) {
		if (!isContestantsGuard(nextParty.contestants) ) {
			return;
		}
		const winner = await nextParty.contestants.sort((a, b) => b.votes - a.votes)[0].movie;
		if (winner && isMovieGuard(winner)) {
			nextParty.winner = winner;
			await nextParty.save();
			winner.watched = true;
			await winner.save();
		}
	}

	return {
		nextParty: pojo(nextParty),
		isAuth: cookies.get('isAuth')
	};
};
