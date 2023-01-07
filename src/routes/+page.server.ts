import { PrismaClient } from '@prisma/client/edge';
import type { PageServerLoad } from '../../.svelte-kit/types/src/routes/$types';

export const load: PageServerLoad = async () => {
	const client = new PrismaClient();
	const dbMeasurements = await client.measurement.findMany();

	const returner = dbMeasurements.map((measurement) => ({
		id: measurement.id,
		name: measurement.name,
		startedAt: measurement.startAt,
		endedAt: measurement.endedAt
	}));

	return {
		measurements: returner
	};
};
