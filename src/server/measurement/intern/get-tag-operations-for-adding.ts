import { getPrismaClient } from '../../get-prisma-client';

export type TagOperationsForAdding = {
	tagsToBeAdded: { name: string; description: string }[];
	tagsToBeConnected: { id: number }[];
};

export const getTagOperationsForAdding = async (tags: string[]) => {
	const tagEntitiesToBeConnected = await getPrismaClient().tag.findMany({
		where: { name: { in: tags } }
	});
	const entityTagNames = tagEntitiesToBeConnected.map((entityTag) => entityTag.name);
	const tagsToBeAdded = tags
		.filter((name) => !entityTagNames.includes(name))
		.map((name) => ({ name, description: '' }));
	const tagsToBeConnected = tagEntitiesToBeConnected.map(({ id }) => ({ id }));

	return { tagsToBeAdded, tagsToBeConnected };
};
