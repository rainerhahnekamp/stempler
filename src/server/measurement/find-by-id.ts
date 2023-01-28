import { currentUser } from '../user';
import type { Measurement } from './measurement';
import { getPrismaClient } from '../get-prisma-client';

const findById = async (id: number): Promise<Measurement> => {
	const entity = getPrismaClient().measurement.findFirst({
		where: { id, userId: currentUser().id },
		include: { tags: { select: { id: true, name: true } } }
	});
	if (entity == null) {
		throw new Error('cannot find Measurement with id ' + id);
	}
	return entity as unknown as Measurement;
};

export default findById;
