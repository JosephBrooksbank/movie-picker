import { DB_PASSWORD, DB_URL, DB_USER } from '$env/static/private';
import { MongoClient } from 'mongodb';
const uri = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}/?retryWrites=true&w=majority`;

const loadDb = async () => {
	const client = new MongoClient(uri);
	await client.connect();
	return client.db('movie-picker');
};

export const insertMovie = async (document: object) => {
	const db = await loadDb();
	return db.collection('movies').insertOne(document);
};

export const getNextThreeMovies = async () => {
	const db = await loadDb();
	const collection = db.collection('movies');

	const cursor = collection.find().sort({ priority: 1, dateAdded: 1 }).limit(3);
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
