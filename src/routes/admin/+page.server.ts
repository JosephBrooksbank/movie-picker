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
		movies: getMovies(),
		events: pojo(await Party.find()) as IParty[]
	};
};

export const actions: Actions = {
	newEvent: async ({ request }) => {
		const data = await request.formData();
		const formDate = data.get('date') as string;
		const formOffset = to_number(data.get('votingOffset'));
		const formUnit = data.get('offsetUnit') as ManipulateType;

        dayjs.extend(timezone);
        dayjs.extend(utc);

		let date = dayjs.tz(formDate, "America/Chicago");

        // This probably means that just a day (and no time) was supplied, default to 8 pm
        if (date.hour() == 0) {
            date = date.add(20, 'hour');
        }

		const votingEnds = date.subtract(formOffset, formUnit);
		// TODO allow overriding of this
		const contestants = await (await getMovies(3)).map(movie => movie._id);

		const response = await Party.create({ date, votingEnds, contestants });
		console.log(response);
	}
};
