import type { RequestHandler } from '@sveltejs/kit';
import { MeasurementRepository } from '../../../../server/measurement-repository';
import { mapMeasurement } from '../../../../server/map-measurement';

export const DELETE: RequestHandler = async (requestEvent) => {
	const id = Number(requestEvent.params.id);
	const repo = new MeasurementRepository();
	await repo.delete(id);

	const measurements = await repo.findAll();
	return new Response(JSON.stringify(measurements.map(mapMeasurement)));
};
