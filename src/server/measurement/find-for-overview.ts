import { currentUser } from '../user';
import { getPrismaClient } from '../get-prisma-client';
import type { Measurement } from './measurement';

export type MeasurementsOverview = {
	active: Measurement | null;
	finished: Measurement[];
	unfinished: Measurement[];
};

const findForOverview = async (): Promise<MeasurementsOverview> => {
	const userId = currentUser().id;
	const client = getPrismaClient();
	const include = { tags: { select: { id: true, name: true } } };
	let activeUserId: number[] = [];
	const userEntity = await client.user.findFirst({ where: { id: userId } });
	if (userEntity?.activeMeasurementId) {
		activeUserId = [userEntity.activeMeasurementId];
	}

	const finished: Measurement[] = await client.measurement.findMany({
		where: { userId: userId, id: { notIn: activeUserId }, end: { not: null } },
		include
	});

	const unfinished: Measurement[] = await client.measurement.findMany({
		where: { userId, id: { notIn: activeUserId }, end: null },
		include
	});

	let active: Measurement | null = null;
	if (activeUserId.length) {
		active = await client.measurement.findFirst({
			where: { id: activeUserId[0] },
			include
		});
	}

	return { active, finished, unfinished };
};

export default findForOverview;
