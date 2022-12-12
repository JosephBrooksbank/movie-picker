import { DB_PASSWORD, DB_URL, DB_USER } from '$env/static/private';
import { MongoClient } from 'mongodb';
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/?retryWrites=true&w=majority`;

const loadDb = async () => {
	const client = new MongoClient(uri);
	await client.connect();
	return client.db('movie-picker');
};

export const insertMovie = async (document: Record<string, any>) => {
	const db = await loadDb();
	return db.collection('movies').updateOne({id: document.id}, {$setOnInsert: {...document}}, {upsert: true});
};

export const getMovies = async (limit?: number) => {
	const db = await loadDb();
	const collection = db.collection('movies');

	let cursor = collection.find().sort({ priority: 1, dateAdded: 1 });
	if(limit) {
		cursor = cursor.limit(limit);
	}
	const movies: any[] = [];
	await cursor.forEach((obj) => {
		movies.push(JSON.parse(JSON.stringify(obj)))
	});
	return movies;
};

export const insertVote = async (document: object) => {
	const db = await loadDb();
	const collection = db.collection('votes');

	return await collection.insertOne(document);
};
