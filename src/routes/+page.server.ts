import { Movie, type IMovie } from '$lib/schema/movie.schema';
import { Party, type IContestant } from '$lib/schema/party.schema';
import { pojo } from '$lib/utils';
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
		.sort({ date: 1 });

	const nextParty = parties[0] ?? {};

	// If the voting is over and a winner hasn't been chosen, get a winner
	if (dayjs().toDate() > nextParty.votingEnds && !nextParty?.winner) {
		const winner = await Movie.findOne().sort({ votes: 'descending' });
		if (winner) {
			await Party.updateOne({ _id: nextParty._id }, { winner: winner._id });
			winner.watched = true;

			await winner.save();
			await Party.updateMany({}, {votes: 0});
		}
		// Voting not over, return voting time
	}

	return {
		nextParty: pojo(nextParty),
		isAuth: cookies.get('isAuth')
	};
};
