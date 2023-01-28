import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { withAuthorized } from '../../../../server/with-authorized';
import finishMeasurement from '../../../../server/measurement/finish-measurement';
import { editMeasurementSchema } from '../../../../server/measurement/edit-measurement';

export const PUT: RequestHandler = async (requestEvent: RequestEvent) => {
	return await withAuthorized(requestEvent, async () => {
		const measurement = editMeasurementSchema.parse(await requestEvent.request.json());
		return await finishMeasurement(measurement);
	});
};
