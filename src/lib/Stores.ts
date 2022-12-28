import { writable, type Writable } from "svelte/store";
import type { IMovie } from "./schema/movie.schema";
import type { IParty } from "./schema/party.schema";

export const nextEvent: Writable<IParty | null> = writable(null);
export const movies: Writable<IMovie[]> = writable([]);

export type Mode = "voting" | "info"
export const mode: Writable<Mode> = writable("voting");
