import dayjs from 'dayjs';
import { Schema, model, Types} from 'mongoose';

export interface IParty {
    date: Date,
    votingEnds: Date,
    winner: Types.ObjectId
}

export const partySchema = new Schema<IParty>({
    date: Date,
    votingEnds: {
        type: Date,
        default: function () {
            return dayjs(this.date).subtract(2, 'days').toDate();
        }
    },
    winner: {type: Schema.Types.ObjectId, ref: "Movie"}
})

export const Party = model('Party', partySchema);