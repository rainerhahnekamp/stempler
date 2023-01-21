import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { getDb } from '../../../server/get-db';

export const GET: RequestHandler = async (event: RequestEvent) => {
	const db = getDb(event);
	console.log('database');
	console.log(db);

	const result = await db.prepare('SELECT * FROM Customers').all();
	console.log(result);
	// const { results } = await request.platform.env.stempler
	// 	.prepare('SELECT * FROM Customers')
	// 	.bind('Bs Beverages')
	// 	.all();
	return new Response(null, { status: 200 });
};
