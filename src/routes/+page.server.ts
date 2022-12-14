import { Party, type IParty } from "$lib/schema/party.schema";
import { getMovies } from "$lib/server/db";
import { loadDb } from "$lib/server/mongoose";
import type { Load } from "@sveltejs/kit";


export const load: Load = async () => {
	await loadDb();
    const nextParty = JSON.parse(JSON.stringify(
        await Party.find({date: {$gt: new Date()}})
        .limit(1)
        .sort({date: 1})
    ))[0] as IParty;

    return {
        movies: getMovies(3),
        nextParty
    }
}