import { getPrismaClient } from '../get-prisma-client';
import { currentUser } from '../user';
import type { EditMeasurementData } from './edit-measurement';
import editMeasurement from './edit-measurement';
import findForOverview from './find-for-overview';

const finishMeasurement = async (editData: EditMeasurementData) => {
	const client = getPrismaClient();
	const userid = currentUser().id;
	await editMeasurement(editData);
	await client.measurement.update({ where: { id: editData.id }, data: { end: new Date() } });
	await client.user.update({ where: { id: userid }, data: { activeMeasurementId: undefined } });
	return findForOverview();
};

export default finishMeasurement;
