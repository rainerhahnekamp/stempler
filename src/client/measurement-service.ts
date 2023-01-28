import { z } from 'zod';
import { request } from './request';
import type { MeasurementsOverview } from '../server/measurement/find-for-overview';
import type { Measurement } from '../server/measurement/measurement';
import type { EditMeasurementData } from '../server/measurement/edit-measurement';

const startMeasurementSchema = z.object({
	name: z.string(),
	tags: z.array(z.string())
});

type MeasurementOverviewResponse = { active: unknown; finished: unknown[]; unfinished: unknown[] };

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
const sorter = (m1: Measurement, m2: Measurement) => m2.start.getTime() - m1.start.getTime();

function fromResponses(responses: unknown[]): Measurement[] {
	return responses.map(fromResponse).sort(sorter);
}

function fromMeasurementsOverview(response: MeasurementOverviewResponse): MeasurementsOverview {
	return {
		active: response.active === null ? null : fromResponse(response.active),
		finished: fromResponses(response.finished),
		unfinished: fromResponses(response.unfinished)
	};
}

const baseUrl = '/api/measurement';

export class MeasurementService {
	start = (startMeasurement: StartMeasurement): Promise<MeasurementsOverview> =>
		request<MeasurementOverviewResponse>(baseUrl, {
			method: 'PUT',
			body: JSON.stringify(startMeasurement)
		}).then(fromMeasurementsOverview);

	edit = (measurement: EditMeasurementData): Promise<MeasurementsOverview> =>
		request<MeasurementOverviewResponse>(baseUrl, {
			method: 'PUT',
			body: JSON.stringify(measurement)
		}).then(fromMeasurementsOverview);

	findAll = () => request<MeasurementOverviewResponse>(baseUrl).then(fromMeasurementsOverview);

	finish = (measurement: Measurement): Promise<MeasurementsOverview> => {
		return request<MeasurementOverviewResponse>(`${baseUrl}/finish`, {
			method: 'PUT',
			body: JSON.stringify(measurement)
		}).then(fromMeasurementsOverview);
	};

	remove = (id: number): Promise<Measurement[]> => {
		return request<unknown[]>(`${baseUrl}/${id}`, { method: 'DELETE' }).then(fromResponses);
	};
}
