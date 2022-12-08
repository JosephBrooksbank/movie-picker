import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TMDB_API_KEY } from '$env/static/private';


export const POST: RequestHandler = async ({ request }) => {
	const { URL, ...fetchParams } = await request.json();
	const response = await fetch(URL + `?api_key=${TMDB_API_KEY}`, {
        ...fetchParams
    });
	if (response.ok) {
        return json(await response.json());
	} else {
		throw error(400, {
			message: 'TMDB api call failed with reason ' + (await response.json())
		});
	}
};
