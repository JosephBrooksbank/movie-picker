import type { IMovie } from './schema/movie.schema';
import type { IParty } from './schema/party.schema';

export const isPlainObject = (obj: unknown): obj is Record<PropertyKey, unknown> => {
    return typeof obj === 'object' && !Array.isArray(obj) && obj !== null;
};

export const pojo = <T>(obj: T): T => {
	return JSON.parse(JSON.stringify(obj));
};

// Not a full type check, but enough for my purposes
export const isMovieGuard = (obj: unknown): obj is IMovie => {
	if (!isPlainObject(obj)) return false;

	const { id, title } = obj;
	if (typeof id !== 'number') return false;
	if (typeof title !== 'string') return false;
	return true;
};

export const isPartyGuard = (obj: IParty | any): obj is IParty => {
	return obj && obj.date && obj.votingEnds && obj.contestants && obj.contestants.length > 0;
};