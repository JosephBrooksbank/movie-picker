import { Movie, type IMovie } from '$lib/schema/movie.schema';
import { Party } from '$lib/schema/party.schema';
import { getMovies } from '$lib/server/mongoose';
import { pojo } from '$lib/server/utils';
import dayjs from 'dayjs';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({cookies}) => {
	const parties = await Party.find({ date: { $gt: new Date() } })
		.populate<{ winner?: IMovie }>('winner')
		.limit(1)
		.sort({ date: 1 });

	const nextParty = parties[0] ?? {};

		// If the voting is over and a winner hasn't been chosen, get a winner
		if (dayjs().toDate() > nextParty.votingEnds && !nextParty?.winner) {
			console.log('here!');
			const winner = await Movie.findOne().sort({ votes: 'descending' });
			if (winner) {
				console.log('herest')
				const response = await Party.updateOne({_id: nextParty._id}, {winner: winner._id});
			}
			// Voting not over, return voting time
		}

	return {
		movies: getMovies(3),
		nextParty: pojo(nextParty),
		isAuth: cookies.get('isAuth')
	};
};
