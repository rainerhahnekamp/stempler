import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { withAuthorized } from '../../../server/with-authorized';
import findForOverview from '../../../server/measurement/find-for-overview';
import startMeasurement, { addDataSchema } from '../../../server/measurement/start-measurement';

export const GET: RequestHandler = async (requestEvent: RequestEvent) => {
	return await withAuthorized(requestEvent, () => findForOverview());
};

export const PUT: RequestHandler = async (requestEvent: RequestEvent) => {
	return await withAuthorized(requestEvent, async () => {
		const measurement = addDataSchema.parse(await requestEvent.request.json());
		return await startMeasurement(measurement);
	});
};

export const POST: RequestHandler = async (requestEvent: RequestEvent) => {
	return await withAuthorized(requestEvent, async () => {
		const measurement = addDataSchema.parse(await requestEvent.request.json());
		const entity = await startMeasurement(measurement);

		return entity;
	});
};
