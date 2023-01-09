import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';
import { DATABASE_URL } from '$env/static/private';

export const load: PageServerLoad = async (context) => {
	try {
		console.log(context);
		console.log(DATABASE_URL);
		const client = new PrismaClient();
		const dbMeasurements = await client.measurement.findMany();

		const returner = dbMeasurements.map((measurement) => ({
			id: measurement.id,
			name: measurement.name,
			startedAt: measurement.startAt,
			endedAt: measurement.endedAt
		}));

		return {
			successful: true,
			measurements: returner
		};
	} catch (error: unknown) {
		if (error instanceof Error) {
			return {
				successful: false,
				measurements: [],
				error: { name: DATABASE_URL, message: error.message }
			};
		}
	}
};
