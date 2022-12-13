import { Movie, type IMovie } from "$lib/schema/movie.schema";
import mongoose from 'mongoose';
import { DB_PASSWORD, DB_URL, DB_USER } from "$env/static/private";

const mongooseUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/movie-picker`;
await mongoose.connect(mongooseUri);

export const createMovie = async(document: IMovie) => {
    const movieDoc = new Movie(document);
    const response = await movieDoc.save();
    console.log(JSON.stringify(response));
    return response;
}