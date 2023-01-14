import type { MeasurementEntity } from './measurement-repository';

export function mapMeasurement(entity: MeasurementEntity) {
	return {
		id: entity.id,
		name: entity.name,
		start: entity.start,
		end: entity.end,
		tags: entity.tags.map((tag) => tag.name)
	};
}
