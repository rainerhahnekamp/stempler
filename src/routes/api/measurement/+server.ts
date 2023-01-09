import type { RequestEvent, RequestHandler } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

export const POST: RequestHandler = async (requestEvent: RequestEvent) => {
	const client = new PrismaClient();
	const measurement = await requestEvent.request.json();
	await client.measurement.create({
		data: { name: measurement.name, startAt: measurement.startedAt, endedAt: measurement.endedAt }
	});
	return new Response(null);
};
