import { z } from 'zod';
import { request } from './request';
import type { MeasurementsOverview } from '../server/measurement/find-for-overview';
import type { Measurement } from '../server/measurement/measurement';
import { measurementSchema } from '../server/measurement/measurement';

const startMeasurementSchema = z.object({
	name: z.string(),
	tags: z.array(z.string())
});

const measurementResSchema = z.object({
	id: z.number(),
	name: z.string(),
	start: z.string(),
	end: z.nullable(z.string()),
	tags: z.array(z.object({ id: z.number(), name: z.string() }))
});

type StartMeasurement = z.infer<typeof startMeasurementSchema>;

function fromResponse(response: unknown): Measurement {
	const record = measurementResSchema.parse(response);
	const { id, name, tags } = record;
	return {
		id,
		name,
		start: new Date(record.start),
		end: record.end ? new Date(record.end) : null,
		tags
	};
}

function fromResponses(responses: unknown[]): Measurement[] {
	return responses.map(fromResponse);
}

function fromMeasurementsOverview(response: {
	active: unknown;
	finished: unknown[];
	unfinished: unknown[];
}): MeasurementsOverview {
	return {
		active: response.active === null ? null : fromResponse(response.active),
		finished: fromResponses(response.finished),
		unfinished: fromResponses(response.unfinished)
	};
}

export class MeasurementService {
	start = (startMeasurement: StartMeasurement) =>
		request('/api/measurement', { method: 'PUT', body: JSON.stringify(startMeasurement) });

	findAll = () =>
		request<{ active: unknown; finished: unknown[]; unfinished: unknown[] }>(
			'/api/measurement'
		).then(fromMeasurementsOverview);

	saveMeasurement = (measurement: Measurement): Promise<Measurement> => {
		return request('/api/measurement', {
			method: 'PUT',
			body: JSON.stringify(measurement)
		}).then(fromResponse);
	};

	remove = (id: number): Promise<Measurement[]> => {
		return request<unknown[]>(`/api/measurement/${id}`, { method: 'DELETE' }).then(fromResponses);
	};
}
