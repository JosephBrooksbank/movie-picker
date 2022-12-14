import { updateMovies } from "$lib/server/mongoose";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({request}) => {
    const response = await updateMovies(await request.json());
    return json(response);
}