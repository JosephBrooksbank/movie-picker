import type { IMovie } from '$lib/schema/movie.schema';
import { Party } from '$lib/schema/party.schema';
import { pojo } from '$lib/utils';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const response = await Party.findOne({ date: { $gt: new Date() } })
		.sort({ date: 'asc' })
		.populate<{ winner: IMovie }>('winner')
		.populate({
			path: 'contestants',
			populate: {
				path: 'movie',
				model: 'Movie'
			}
		})
		.limit(1)
		.exec();
        console.log(response)

	return json(pojo(response));
};
