import type { IMovie } from "./schema/movie.schema";
import type { IParty } from "./schema/party.schema";

export const pojo = <T>(obj: T): T => {
    return JSON.parse(JSON.stringify(obj)); 
}

// Not a full type check, but enough for my purposes
export const isMovieGuard = (obj: IMovie | any): obj is IMovie => {
    return (obj && obj.id && obj.title);
}

export const isPartyGuard = (obj: IParty | any): obj is IParty => {
    return (obj && obj.date && obj.votingEnds);
}