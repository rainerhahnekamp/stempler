import getTagOperationsForEditing from './intern/get-tag-operations-for-editing';
import findById from './find-by-id';
import { getPrismaClient } from '../get-prisma-client';

const editActiveMeasurement = async (id: number, tags: string[], name: string) => {
	const measurement = await findById(id);
	const assignedTags = measurement.tags;
	const { tagsToBeAdded, tagsToBeConnected } = await getTagOperationsForEditing(assignedTags, tags);

	getPrismaClient().measurement.update({
		where: { id },
		data: { name, tags: { create: tagsToBeAdded, connect: tagsToBeConnected } }
	});
};

export default editActiveMeasurement;
