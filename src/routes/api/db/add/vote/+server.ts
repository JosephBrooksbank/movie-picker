import { insertVote } from '$lib/server/mongoose';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request}) => {
    const response =await insertVote(await request.json());
    return json(response);
}