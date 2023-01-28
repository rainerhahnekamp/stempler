import type { RequestHandler } from '@sveltejs/kit';
import { mapMeasurement } from '../../../../server/map-measurement';
import { withAuthorized } from '../../../../server/with-authorized';
import removeMeasurement from '../../../../server/measurement/remove-measurement';
import findForOverview from '../../../../server/measurement/find-for-overview';

export const DELETE: RequestHandler = async (requestEvent) => {
	return withAuthorized(requestEvent, async () => {
		const id = Number(requestEvent.params.id);
		await removeMeasurement(id);
		const measurements = await findForOverview();
		return measurements.map(mapMeasurement);
	});
};
