import type { RequestHandler } from '@sveltejs/kit';
import { MeasurementRepository } from '../../../../server/measurement-repository';
import { mapMeasurement } from '../../../../server/map-measurement';
import { withAuthorized } from '../../../../server/with-authorized';

export const DELETE: RequestHandler = async (requestEvent) => {
	return withAuthorized(requestEvent, async () => {
		const id = Number(requestEvent.params.id);
		const repo = new MeasurementRepository();
		await repo.delete(id);

		const measurements = await repo.findAll();
		return measurements.map(mapMeasurement);
	});
};
