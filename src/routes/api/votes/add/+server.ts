import { insertVote } from '$lib/server/mongoose';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request}) => {
    const {partyId, contestantId} = (await request.json());

    const response = await insertVote(partyId, contestantId);
    return json(response);
}