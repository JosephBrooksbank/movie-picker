import { DB_PASSWORD, DB_URL, DB_USER } from '$env/static/private';
import { MongoClient } from 'mongodb';
import type { IMovie } from '$lib/schema/movie.schema';
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/?retryWrites=true&w=majority`;

const loadDb = async () => {
	const client = new MongoClient(uri);
	await client.connect();
	return client.db('movie-picker');
};

export const insertMovie = async (document: IMovie) => {
	const db = await loadDb();
	return db.collection('movies').updateOne({id: document.id}, {$setOnInsert: {...document, votes: 0}}, {upsert: true});
};

export const getMovies = async (limit?: number) => {
	const db = await loadDb();
	const collection = db.collection('movies');

	let cursor = collection.find().sort({ priority: 1, dateAdded: 1 });
	if(limit) {
		cursor = cursor.limit(limit);
	}
	const movies: IMovie[] = [];
	await cursor.forEach((obj) => {
		movies.push(JSON.parse(JSON.stringify(obj)))
	});
	return movies;
};


export const insertVote = async (document: IMovie) => {
	const db = await loadDb();
	const collection = db.collection('movies');
	console.log(document);

	return await collection.updateOne({id: document.id}, {$inc: {votes: 1}} );
};

export const updateMovies = async (documents: IMovie[]) => {
	const db = await loadDb();
	const collection = db.collection('movies');
	for (const doc of documents) {
		collection.updateOne({id: doc.id}, {$set: {votes: doc.votes, priority: doc.priority}})
	}

	return await getMovies();
}