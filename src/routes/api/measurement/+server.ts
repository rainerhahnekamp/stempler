import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { addDataSchema, MeasurementRepository } from '../../../server/measurement-repository';
import { mapMeasurement } from '../../../server/map-measurement';
import { withAuthorized } from '../../../server/with-authorized';

export const GET: RequestHandler = async (requestEvent: RequestEvent) => {
	return await withAuthorized(requestEvent, async () => {
		const repo = new MeasurementRepository();
		const entities = await repo.findAll();
		return entities.map(mapMeasurement);
	});
};

export const POST: RequestHandler = async (requestEvent: RequestEvent) => {
	return await withAuthorized(requestEvent, async () => {
		const measurement = addDataSchema.parse(await requestEvent.request.json());
		const repo = new MeasurementRepository();
		const entity = await repo.add(measurement);

		return mapMeasurement(entity);
	});
};
