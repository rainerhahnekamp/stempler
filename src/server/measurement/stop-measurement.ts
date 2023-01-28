import { getPrismaClient } from '../get-prisma-client';
import { currentUser } from '../user';

const stopMeasurement = async (id: number) => {
	const client = getPrismaClient();
	const userid = currentUser().id;
	await client.measurement.update({ where: { id }, data: { end: new Date() } });
	await client.user.update({ where: { id: userid }, data: { activeMeasurementId: undefined } });
};

export default stopMeasurement;
