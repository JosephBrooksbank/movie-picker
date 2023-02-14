import { createMovie } from '$lib/server/mongoose';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

// export const POST: RequestHandler = async ({request}) => {
//     const response =await insertMovie(await request.json());
//     return json(response);
// }

export const POST: RequestHandler = async ({request}) => {
    const response = await createMovie(await request.json());
    return json(response);
}

