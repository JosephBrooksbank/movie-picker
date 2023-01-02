import { writable, type Writable } from "svelte/store";
import type { IParty } from "./schema/party.schema";

export const nextEvent: Writable<IParty | null> = writable(null);

export type Mode = "voting" | "info"
export const mode: Writable<Mode> = writable("voting");
