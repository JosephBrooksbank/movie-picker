import { Movie } from "$lib/schema/movie.schema";
import { loadDb } from "$lib/server/mongoose";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request}) => {
    await loadDb();
    const movieId = (await request.json()).id
    await Movie.deleteOne({id: movieId})
    return json({
        message: 'Success'
    });
}