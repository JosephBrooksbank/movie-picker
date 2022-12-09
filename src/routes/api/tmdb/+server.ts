import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { TMDB_API_KEY } from '$env/static/private';

export const POST: RequestHandler = async ({ request }: {request: Request}) => {
	const { URL, ...fetchParams } = await request.json();
	let queryCharacter = '?';
	if (URL.includes('?')) {
		queryCharacter = '&';
	}
	const response = await fetch('https://api.themoviedb.org/3' + URL + `${queryCharacter}api_key=${TMDB_API_KEY}`, {
        ...fetchParams
    });
	if (response.ok) {
        return json(await response.json());
	} else {
		throw error(400, {
			message: await response.text()
		});
	}
};
