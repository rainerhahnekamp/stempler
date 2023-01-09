import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';
import { getPrismaClient } from '../db/get-prisma-client';

export const load: PageServerLoad = async () => {
	try {
		const client = getPrismaClient();
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
