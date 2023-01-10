import { DATABASE_URL } from '$env/static/private';
import { PrismaClient } from '@prisma/client/edge';

let instance: PrismaClient;

export function getPrismaClient(): PrismaClient {
	if (!instance) {
		instance = new PrismaClient({ datasources: { db: { url: DATABASE_URL } } });
	}

	return instance;
}
