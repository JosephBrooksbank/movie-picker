import { Movie, type IMovie } from "$lib/schema/movie.schema";
import mongoose from 'mongoose';
import { DB_PASSWORD, DB_URL, DB_USER } from "$env/static/private";
import type { TMDBMovie } from "src/types/TMDB";

const mongooseUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/movie-picker`;
await mongoose.connect(mongooseUri);

export const createMovie = async(document: TMDBMovie) => {
    // Adding movie if it doesn't exist
    const query: mongoose.FilterQuery<IMovie> = {id: document.id};
    // starting with 0 votes and 2 priority if not specified
    const update: mongoose.UpdateQuery<IMovie> = {$setOnInsert: {votes: 0, priority: 2, ...document }};
    const options: mongoose.QueryOptions = {upsert: true, new: true, setDefaultsOnInsert: true};
    const response = await Movie.findOneAndUpdate(query, update, options);
    console.log(JSON.stringify(response));
    return response;
}