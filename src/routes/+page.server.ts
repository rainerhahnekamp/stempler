import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';
import { getPrismaClient } from '../server/get-prisma-client';
import { mapMeasurement } from '../server/map-measurement';

export const load: PageServerLoad = async () => {
	try {
		const client = getPrismaClient();
		const dbMeasurements = await client.measurement.findMany();

		const returner = dbMeasurements.map(mapMeasurement);

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
