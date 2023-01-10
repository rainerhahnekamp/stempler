import { getPrismaClient } from './get-prisma-client';
import { z } from 'zod';
import type { Prisma } from '@prisma/client';

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
			data
		});
	};

	delete = async (id: number) => {
		await this.client.measurement.delete({ where: { id } });
	};

	findAll = async () => {
		return this.client.measurement.findMany();
	};
}
