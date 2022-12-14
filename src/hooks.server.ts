import { building } from '$app/environment';
import { DB_PASSWORD, DB_URL, DB_USER } from "$env/static/private";
import mongoose from 'mongoose';

if (!building) {
	const mongooseUri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/movie-picker`;
    mongoose.connect(mongooseUri);
}
