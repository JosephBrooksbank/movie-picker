import { Schema, model} from 'mongoose';

export interface IParty {
    date: Date,
}

export const partySchema = new Schema<IParty>({
    date: Date
})

export const Party = model('Party', partySchema);