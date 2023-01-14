import { getPrismaClient } from './get-prisma-client';
import { z } from 'zod';
import type { Prisma } from '@prisma/client';
import { currentUser } from './user';

export const addDataSchema = z.object({
	name: z.string(),
	start: z.string(),
	end: z.string()
});
export type AddData = z.infer<typeof addDataSchema>;

export type MeasurementEntity = Prisma.MeasurementGetPayload<Record<string, never>>;

export class MeasurementRepository {
	client = getPrismaClient();

	add = async (data: AddData) => {
		return await this.client.measurement.create({
			data: { ...data, userId: currentUser().id }
		});
	};

	delete = async (id: number) => {
		const entity = await this.findById(id);
		if (entity) {
			await this.client.measurement.delete({ where: { id: entity.id } });
		}
	};

	findById = async (id: number) => {
		const entity = this.client.measurement.findFirst({
			where: { id, userId: currentUser().id }
		});
		if (!entity) {
			throw new Error('cannot find Measurement with id ' + id);
		}

		return entity;
	};

	findAll = async () => {
		return this.client.measurement.findMany({ where: { userId: currentUser().id } });
	};
}
