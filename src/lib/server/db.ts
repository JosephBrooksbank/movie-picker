import Datastore from '@seald-io/nedb';

const loadDb = async () => {
	const db = new Datastore({ filename: 'Database.db', autoload: true});
	return db;
}

export const insert = async (document: object) => {
	const db = loadDb();

	return await (await db).insertAsync(document);
}