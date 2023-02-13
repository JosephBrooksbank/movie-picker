import { pickContestantMoviesForEvent } from "$lib/server/mongoose";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request}) => {

    const {count = 3, excludedIds = []} = await request.json();
    const movies = await pickContestantMoviesForEvent(count, excludedIds);
    return json(movies);

}