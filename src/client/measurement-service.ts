import type { Measurement } from './model/measurement';
import { z } from 'zod';
import { request } from './request';

const measurementResSchema = z.object({
	id: z.number(),
	name: z.string(),
	start: z.string(),
	end: z.string(),
	tags: z.array(z.string())
});

function fromResponse(response: unknown): Measurement {
	const record = measurementResSchema.parse(response);
	const { id, name, tags } = record;
	return { id, name, start: new Date(record.start), end: new Date(record.end), tags };
}

function fromResponses(responses: unknown[]): Measurement[] {
	return responses.map(fromResponse);
}

export class MeasurementService {
	findAll = () => request<unknown[]>('/api/measurement').then(fromResponses);

	saveMeasurement = (measurement: Measurement): Promise<Measurement> => {
		return request('/api/measurement', {
			method: 'POST',
			body: JSON.stringify(measurement)
		}).then(fromResponse);
	};

	remove = (id: number): Promise<Measurement[]> => {
		return request<unknown[]>(`/api/measurement/${id}`, { method: 'DELETE' }).then(fromResponses);
	};
}
