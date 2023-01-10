import type { Measurement } from './model/measurement';
import { z } from 'zod';

const measurementResSchema = z.object({
	id: z.number(),
	name: z.string(),
	start: z.string(),
	end: z.string()
});

type MeasurementRes = z.infer<typeof measurementResSchema>;

function fromResponse(response: MeasurementRes): Measurement {
	const { id, name } = response;
	return { id, name, start: new Date(response.start), end: new Date(response.end) };
}

export class MeasurementService {
	saveMeasurement = async (measurement: Measurement) => {
		const res = await fetch('/api/measurement', {
			method: 'POST',
			body: JSON.stringify(measurement)
		});
		const response = measurementResSchema.parse(await res.json());
		return fromResponse(response);
	};

	remove = async (id: number): Promise<Measurement[]> => {
		const response = await fetch(`/api/measurement/${id}`, { method: 'DELETE' });
		const measureResponses = z.array(measurementResSchema).parse(await response.json());
		return measureResponses.map(fromResponse);
	};
}
