import Datastore from '@seald-io/nedb';

const loadDb = async (dbName: string) => {
	const db = new Datastore({ filename: dbName, autoload: true });
	return db;
};

export const insertMovie = async (document: object) => {
	const db = await loadDb('Movies.db');

	return await db.insertAsync(document);
};

export const getNextThreeMovies = async () => {
	const db = await loadDb('Movies.db');

	const movies = await new Promise((resolve, reject) => {
	 db
		.findAsync({})
		.sort({ priority: 1, dateAdded: 1 })
		.limit(3)
		.exec((err, docs) => {
			resolve(docs);
		});
	})
	return movies as Record<string, any>[];
};

export const insertVote = async (document: object) => {
	const db = await loadDb('Votes.db');

	return await db.insertAsync(document);
};
