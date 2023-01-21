import type { RequestEvent } from '@sveltejs/kit';
import type { D1Database } from '@cloudflare/workers-types';

export function getDb(event: RequestEvent): D1Database {
	if (event.platform?.env?.db === undefined) {
		throw new Error('D1 Database not available');
	}
	return event.platform.env.db;
}
