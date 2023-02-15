import dayjs from 'dayjs';
import mongoose from 'mongoose';
import type { IMovie } from './movie.schema';

export interface IParty {
    _id?: string,
    date: Date,
    votingEnds: Date,
    winner?: mongoose.Types.ObjectId | IMovie,
    contestants: mongoose.Types.ObjectId[] | IContestant[]
}

export interface IContestant {
    _id?: string,
    movie: mongoose.Types.ObjectId | IMovie;
    votes: number;
}

const contestantSchema = new mongoose.Schema<IContestant>({
    movie: {type: mongoose.Schema.Types.ObjectId, ref: 'Movie'},
    votes: {
        type: Number,
        default: 0
    }
})

export const partySchema = new mongoose.Schema<IParty>({
    date: Date,
    votingEnds: {
        type: Date,
        default: function () {
            return dayjs(this.date).subtract(2, 'days').toDate();
        }
    },
    winner: {type: mongoose.Schema.Types.ObjectId, ref: "Movie"},
    contestants: [
        contestantSchema
    ]
})

// Trick for HMR, which doesn't like defining models multiple times.
export const Party = mongoose.models['Party'] ?? mongoose.model('Party', partySchema);