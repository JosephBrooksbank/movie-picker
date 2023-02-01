import mongoose from 'mongoose';

export interface IMovie {
    _id?: string,
    id: number,
    adult: boolean,
    backdrop_path: string,
    dateAdded: Date,
    genreIds: [number],
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    priority: number,
    release_date: Date,
    title: string,
    video: boolean,
    vote_average: number, // tmdb votes
    vote_count: number, // tmdb votes
    votes: number,
    watched?: boolean,
}

export const movieSchema = new mongoose.Schema<IMovie>({
    id: Number,
    adult: Boolean,
    backdrop_path: String,
    dateAdded: Date,
    genreIds: [Number],
    original_language: String,
    original_title: String,
    overview: String,
    popularity: Number,
    poster_path: String,
    priority: Number,
    release_date: Date,
    title: String,
    video: Boolean,
    vote_average: Number, // TMDB votes
    vote_count: Number, // TMDB votes
    votes: Number,
    watched: Boolean,
})

// Trick for HMR, which doesn't like defining models multiple times.
export const Movie = mongoose.models['Movie'] ?? mongoose.model('Movie', movieSchema);