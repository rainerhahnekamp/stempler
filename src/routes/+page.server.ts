import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = async (context: any) => {
	try {
		console.log(context);
		const { env } = context;
		console.log(env.DATABASE_URL);
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
				error: { name: error.name, message: error.message }
			};
		}
	}
};
