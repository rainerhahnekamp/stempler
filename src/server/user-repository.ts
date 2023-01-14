import { getPrismaClient } from './get-prisma-client';

export class UserRepository {
	client = getPrismaClient();
}
