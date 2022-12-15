import { Party } from '$lib/schema/party.schema';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const date = (await request.json()).date;
	return json(await Party.deleteOne({ date }));
};
