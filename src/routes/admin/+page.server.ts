import type { IMovie } from '$lib/schema/movie.schema';
import { Party, type IParty } from '$lib/schema/party.schema';
import { getMovies } from '$lib/server/mongoose';
import { pojo } from '$lib/utils';
import type { Load } from '@sveltejs/kit';
import dayjs, { type ManipulateType } from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { to_number } from 'svelte/internal';
import type { Actions } from './$types';

export const load: Load = async () => {
	return {
		movies: (await getMovies()).sort((a,b) => {
			if (a.votes > b.votes) {
				return -1;
			} else if (a.votes < b.votes) {
				return 1;
			} else {
				// equal votes
				if (a.dateAdded > b.dateAdded) {
					return -1;
				} else if (a.dateAdded < b.dateAdded) {
					return 1;
				} else {
					return 0;
				}
			}
		}),
		events: pojo(await Party.find({date: {$gt: new Date()}})) as IParty[]
	};
};

export const actions: Actions = {
	newEvent: async ({ request }) => {
		const data = await request.formData();
		const formDate = data.get('date') as string;
		const formOffset = to_number(data.get('votingOffset'));
		const formUnit = data.get('offsetUnit') as ManipulateType;
		const contestants = JSON.parse(data.get('movies') as string).map((m: IMovie) => m._id) as IMovie[];

        dayjs.extend(timezone);
        dayjs.extend(utc);

		let date = dayjs.tz(formDate, "America/Chicago");

        // This probably means that just a day (and no time) was supplied, default to 8 pm
        if (date.hour() == 0) {
            date = date.add(20, 'hour');
        }

		const votingEnds = date.subtract(formOffset, formUnit);

		await Party.create({ date, votingEnds, contestants: contestants.map(c => ({movie: c, votes: 0})) });
	}
};
