import { insert } from '$lib/server/db';
import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request}) => {
    const response =await insert(await request.json());
    console.log(response);
    return json(response);
}