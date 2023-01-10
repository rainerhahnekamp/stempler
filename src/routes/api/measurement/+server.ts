import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { addDataSchema, MeasurementRepository } from '../../../server/measurement-repository';
import { mapMeasurement } from '../../../server/map-measurement';

export const POST: RequestHandler = async (requestEvent: RequestEvent) => {
	const measurement = addDataSchema.parse(await requestEvent.request.json());
	const repo = new MeasurementRepository();
	const entity = await repo.add(measurement);

	return new Response(JSON.stringify(mapMeasurement(entity)));
};
