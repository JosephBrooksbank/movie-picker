import { Party } from '$lib/schema/party.schema';
import { getMovies } from '$lib/server/mongoose';
import type { Load } from '@sveltejs/kit';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import type { Actions } from './$types';

export const load: Load = async () => {
	return {
		movies: getMovies()
	};
};

export const actions: Actions = {
	newEvent: async ({ request }) => {
		const data = await request.formData();
		const formDate = data.get('date') as string;

        dayjs.extend(timezone);
        dayjs.extend(utc);

		let date = dayjs.tz(formDate, "America/Chicago");

        // This probably means that just a day (and no time) was supplied, default to 8 pm
        if (date.hour() == 0) {
            date = date.add(20, 'hour');
        }

        console.log(date);
		const response = await Party.create({ date });
		console.log(response);
	}
};
