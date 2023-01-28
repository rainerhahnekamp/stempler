import type { Measurement } from './measurement/measurement';

export function mapMeasurement(entity: Measurement) {
	return {
		id: entity.id,
		name: entity.name,
		start: entity.start,
		end: entity.end,
		tags: entity.tags.map((tag) => tag.name)
	};
}
