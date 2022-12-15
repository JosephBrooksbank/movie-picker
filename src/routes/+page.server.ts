import { Movie, type IMovie } from '$lib/schema/movie.schema';
import { Party } from '$lib/schema/party.schema';
import { getMovies } from '$lib/server/mongoose';
import { pojo } from '$lib/server/utils';
import type { Load } from '@sveltejs/kit';
import dayjs from 'dayjs';

export const load: Load = async () => {
	const parties = await Party.find({ date: { $gt: new Date() } })
		.limit(1)
		.sort({ date: 1 });
	if (parties.length > 0) {
		const nextParty = parties[0];
		let partyData: {
			eventDate: Date;
			winner?: IMovie;
			votingEnds?: Date;
		} = {
			eventDate: nextParty.date
		};

		// If there is a winner, return that
		if (nextParty.winner) {
			partyData.winner = (await Movie.findOne(nextParty.winner)) ?? undefined;

			// If the voting is over, get a winner
		} else if (dayjs().toDate() > nextParty.votingEnds) {
			const winner = await Movie.findOne().sort({ votes: 'descending' });
			if (winner) {
				nextParty.winner = winner._id;
				nextParty.save();
				partyData.winner = winner;
			}
			// Voting not over, return voting time
		} else {
			partyData = {
				eventDate: nextParty.date,
				votingEnds: nextParty.votingEnds
			};
		}
		return {
			movies: getMovies(3),
			partyData: pojo(partyData)
		};
	}
	return {
		movies: getMovies(3)
	};
};
