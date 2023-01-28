import { getPrismaClient } from '../get-prisma-client';
import { currentUser } from '../user';
import type { User } from './user';

const getOrMakeCurrentUser = async () => {
	const client = getPrismaClient();
	const user = currentUser();
	const userEntity: User | null = await client.user.findFirst({
		where: { id: user.id }
	});
	if (userEntity === null) {
		await client.user.create({ data: { id: user.id, email: user.email } });
	}
};

export default getOrMakeCurrentUser;
