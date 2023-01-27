import dayjs from 'dayjs';
import { Schema, model, Types, models} from 'mongoose';
import type { IMovie } from './movie.schema';

export interface IParty {
    _id?: string,
    date: Date,
    votingEnds: Date,
    winner?: Types.ObjectId | IMovie,
    contestants: Types.ObjectId[] | IMovie[]
}

export const partySchema = new Schema<IParty>({
    date: Date,
    votingEnds: {
        type: Date,
        default: function () {
            return dayjs(this.date).subtract(2, 'days').toDate();
        }
    },
    winner: {type: Schema.Types.ObjectId, ref: "Movie"},
    contestants: [{ type: Schema.Types.ObjectId, ref: 'Movie'}]
})

// Trick for HMR, which doesn't like defining models multiple times.
export const Party = models['Party'] ?? model('Party', partySchema);