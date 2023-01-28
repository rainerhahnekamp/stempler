import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { withAuthorized } from '../../../server/with-authorized';
import findForOverview from '../../../server/measurement/find-for-overview';
import startMeasurement, { addDataSchema } from '../../../server/measurement/start-measurement';
import editMeasurement, {
	editMeasurementSchema
} from '../../../server/measurement/edit-measurement';

export const GET: RequestHandler = async (requestEvent: RequestEvent) =>
	await withAuthorized(requestEvent, () => findForOverview());

export const PUT: RequestHandler = async (requestEvent: RequestEvent) =>
	await withAuthorized(requestEvent, async () => {
		const measurement = editMeasurementSchema.parse(await requestEvent.request.json());
		return editMeasurement(measurement);
	});

export const POST: RequestHandler = async (requestEvent: RequestEvent) =>
	await withAuthorized(requestEvent, async () => {
		const measurement = addDataSchema.parse(await requestEvent.request.json());
		return startMeasurement(measurement);
	});
