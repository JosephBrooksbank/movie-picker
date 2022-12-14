import { Movie, type IMovie } from "$lib/schema/movie.schema";
import type mongoose from 'mongoose';
import type { TMDBMovie } from "src/types/TMDB";


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

export const getMovies = async (count?: number) => {
    let query = Movie.find().sort({priority: 1, dateAdded: 1}).lean()
    if (count) {
        query = query.limit(count);
    } 
    return JSON.parse(JSON.stringify(await query.exec()));
}

export const updateMovies = async (documents: IMovie[]) => {
    for (const doc of documents) {
        Movie.updateOne({id: doc.id}, {$set: {votes: doc.votes, priority: doc.priority}})
    }
    return await getMovies();
}

export const insertVote = async (document: IMovie) => {
    return await Movie.updateOne({id: document.id}, {$inc: {votes: 1}});
}