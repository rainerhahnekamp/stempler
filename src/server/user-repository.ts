import { getPrismaClient } from './get-prisma-client';

export class UserRepository {
	client = getPrismaClient();

	findById = (id: string) => this.client.user.findFirst({ where: { id } });
}
