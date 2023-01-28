import { getTagOperationsForAdding } from './intern/get-tag-operations-for-adding';
import { currentUser } from '../user';
import { getPrismaClient } from '../get-prisma-client';
import { z } from 'zod';
import findForOverview from './find-for-overview';
import getOrMakeCurrentUser from '../user/get-or-make-current-user';

export const addMeasurementSchema = z.object({
	name: z.string(),
	tags: z.array(z.string())
});
export type AddData = z.infer<typeof addMeasurementSchema>;

const startMeasurement = async (addData: AddData) => {
	const client = getPrismaClient();
	const userId = currentUser().id;
	const now = new Date();
	const { tags, ...measurement } = addData;
	const { tagsToBeConnected, tagsToBeAdded } = await getTagOperationsForAdding(tags);

	await getOrMakeCurrentUser();

	const entity = await client.measurement.create({
		data: {
			...measurement,
			start: now,
			userId,
			tags: {
				create: tagsToBeAdded,
				connect: tagsToBeConnected
			}
		}
	});

	await client.user.update({ where: { id: userId }, data: { activeMeasurementId: entity.id } });

	return findForOverview();
};

export default startMeasurement;
