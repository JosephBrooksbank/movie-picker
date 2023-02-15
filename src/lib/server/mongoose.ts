import { Movie, type IMovie } from '$lib/schema/movie.schema';
import type mongoose from 'mongoose';
import type { TMDBMovie } from '../../types/TMDB';
import dayjs from 'dayjs';
import { Party } from '$lib/schema/party.schema';

export const createMovie = async (document: TMDBMovie) => {
	// Adding movie if it doesn't exist
	const query: mongoose.FilterQuery<IMovie> = { id: document.id };
	// starting with 0 votes and 2 priority if not specified
	const update: mongoose.UpdateQuery<IMovie> = {
		$setOnInsert: { votes: 0, priority: 2, ...document }
	};
	const options: mongoose.QueryOptions = { upsert: true, new: true, setDefaultsOnInsert: true };
	const response = await Movie.findOneAndUpdate(query, update, options);
	return response;
};

export const getMovies: (count?: number) => Promise<IMovie[]> = async (count?: number) => {
	let query = Movie.find().sort({ priority: -1, dateAdded: 1 }).lean();
	if (count) {
		query = query.limit(count);
	}
	return JSON.parse(JSON.stringify(await query.exec()));
};

export const pickContestantMoviesForEvent = async (count = 3, excludedIds = []) => {
	const MAX_TIME_WEIGHT = 5;
	const PRIORITY_WEIGHTING = 1;

	const selectedMovies: IMovie[] = [];

	const oldestDate = (
		await Movie.findOne({ watched: { $ne: true } })
			.sort({ dateAdded: 1 })
			.exec()
	)?.dateAdded;
	if (!oldestDate) {
		return [];
	}
	const numberOfDays = dayjs().diff(oldestDate, 'days');

	const bucketSize = numberOfDays / MAX_TIME_WEIGHT;

	/**
	 * Date: weight 1-5 (1 most recent, 5 oldest)
	 * Priority: value * 3
	 */

	for (let i = 0; i < count; i++) {
		let totalWeight = 0;
		const allMovies = await Movie.find({
			watched: { $ne: true },
			_id: { $nin: [...selectedMovies.map((m) => m._id), ...excludedIds] }
		});
		let selected = null;
		for (const movie of allMovies) {
			const timeFromAdded = dayjs().diff(movie.dateAdded, 'days');
			const dateWeight = Math.floor(timeFromAdded / bucketSize);

			const weight = dateWeight + movie.priority * PRIORITY_WEIGHTING;
			const r = Math.floor(Math.random() * (totalWeight + weight));
			if (r >= totalWeight) {
				selected = movie;
			}
			totalWeight += weight;
		}
		if (selected) {
			selectedMovies.push(selected);
		}
	}

	return selectedMovies;
};

export const updateMovies = async (documents: IMovie[]) => {
	const promises = [];
	for (const doc of documents) {
		promises.push(
			Movie.updateOne({ id: doc.id }, { $set: { votes: doc.votes, priority: doc.priority } })
		);
	}

	await Promise.all(promises);

	return await getMovies();
};

export const insertVote = async (partyId: number, contestantId: number) => {

	await Party.updateOne(
		{
			_id: partyId,
			"contestants._id": contestantId
		},
		{ $inc: { "contestants.$.votes": 1}}
	)
	return true;
};
