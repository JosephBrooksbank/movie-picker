import { Party, type IParty } from "$lib/schema/party.schema";
import { getMovies } from "$lib/server/db";
import { loadDb } from "$lib/server/mongoose";
import type { Load } from "@sveltejs/kit";
import dayjs from "dayjs";


export const load: Load = async () => {
	await loadDb();
    const nextParty = JSON.parse(JSON.stringify(
        await Party.find({date: {$gt: new Date()}})
        .limit(1)
        .sort({date: 1})
    ))[0] as IParty;

    const partyData = {
        votingEnds: dayjs(nextParty.date).subtract(2, 'days').toDate(),
        eventDate: nextParty.date

    }

    return {
        movies: getMovies(3),
        partyData
    }
}