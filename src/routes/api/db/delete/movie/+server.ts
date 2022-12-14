import { Movie } from "$lib/schema/movie.schema";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({request}) => {
    const movieId = (await request.json()).id
    await Movie.deleteOne({id: movieId})
    return json({
        message: 'Success'
    });
}