import { getPrismaClient } from './get-prisma-client';
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { currentUser } from './user';

export const addDataSchema = z.object({
	name: z.string(),
	start: z.string(),
	end: z.string(),
	tags: z.array(z.string())
});
export type AddData = z.infer<typeof addDataSchema>;

export type MeasurementEntity = Prisma.MeasurementGetPayload<{
	include: { tags: { select: { name: true } } };
}>;

export class MeasurementRepository {
	client = getPrismaClient();

	add = async (addData: AddData) => {
		const { tags, ...measurement } = addData;

		const entityTags = await this.client.tag.findMany({ where: { name: { in: tags } } });
		const entityTagNames = entityTags.map((entityTag) => entityTag.name);
		const newTags = tags
			.filter((name) => !entityTagNames.includes(name))
			.map((name) => ({ name, description: '' }));

		const entity = await this.client.measurement.create({
			data: {
				...measurement,
				userId: currentUser().id,
				tags: { create: newTags, connect: entityTags.map((entity) => ({ id: entity.id })) }
			}
		});

		return this.findById(entity.id);
	};

	delete = async (id: number) => {
		const entity = await this.findById(id);
		if (entity) {
			await this.client.measurement.delete({ where: { id: entity.id } });
		}
	};

	findById = async (id: number): Promise<MeasurementEntity> => {
		const entity = this.client.measurement.findFirst({
			where: { id, userId: currentUser().id },
			include: { tags: { select: { name: true } } }
		});
		if (entity == null) {
			throw new Error('cannot find Measurement with id ' + id);
		}
		return entity as unknown as MeasurementEntity;
	};

	findAll = async () => {
		const tags = await this.client.tag.findMany();
		return this.client.measurement.findMany({
			where: { userId: currentUser().id },
			include: { tags: { select: { name: true } } }
		});
	};

	isMeasurement(measurement: unknown | null): measurement is MeasurementEntity {
		return measurement !== null;
	}
}
