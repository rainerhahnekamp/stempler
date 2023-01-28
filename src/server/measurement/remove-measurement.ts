import { getPrismaClient } from '../get-prisma-client';
import findById from './find-by-id';

const removeMeasurement = async (id: number) => {
	const entity = await findById(id);
	if (entity) {
		await getPrismaClient().measurement.delete({ where: { id: entity.id } });
	}
};
export default removeMeasurement;
