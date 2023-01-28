import getTagOperationsForEditing from './intern/get-tag-operations-for-editing';
import findById from './find-by-id';
import { getPrismaClient } from '../get-prisma-client';
import { addDataSchema } from './start-measurement';
import { z } from 'zod';
import findForOverview from './find-for-overview';

export const editMeasurementSchema = addDataSchema.extend({ id: z.number() });

export type EditMeasurementData = z.infer<typeof editMeasurementSchema>;

const editActiveMeasurement = async ({ id, name, tags }: EditMeasurementData) => {
	const measurement = await findById(id);
	const assignedTags = measurement.tags;
	const { tagsToBeAdded, tagsToBeConnected, tagsToBeDisconnected } =
		await getTagOperationsForEditing(assignedTags, tags);

	await getPrismaClient().measurement.update({
		where: { id },
		data: {
			name,
			tags: { create: tagsToBeAdded, connect: tagsToBeConnected, disconnect: tagsToBeDisconnected }
		}
	});

	return findForOverview();
};

export default editActiveMeasurement;
