import type { IMovie } from "$lib/schema/movie.schema";
import { Party } from "$lib/schema/party.schema";
import { pojo } from "$lib/utils";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async () => {
    const response = await Party
    .findOne({date: {$lt: new Date()}})
    .sort({date: 'desc'})
    .populate<{winner: IMovie}>('winner')
    .exec();

    return json(pojo(response));
}