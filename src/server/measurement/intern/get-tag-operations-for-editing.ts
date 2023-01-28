import type { TagOperationsForAdding } from './get-tag-operations-for-adding';
import { getTagOperationsForAdding } from './get-tag-operations-for-adding';

export type TagOperationsForEditing = {
	tagsToBeDisconnected: { id: number }[];
} & TagOperationsForAdding;

const getTagOperationsForEditing = async (
	assignedTags: { name: string; id: number }[],
	updatedTags: string[]
): Promise<TagOperationsForEditing> => {
	const assignedTagNames = assignedTags.map(({ name }) => name);
	const tagsToBeAdded = updatedTags.filter((updatedTag) => !assignedTagNames.includes(updatedTag));
	const tagsToBeDisconnected = assignedTags
		.filter((assignedTag) => !updatedTags.includes(assignedTag.name))
		.map(({ id }) => ({ id }));

	return {
		...(await getTagOperationsForAdding(tagsToBeAdded)),
		tagsToBeDisconnected
	};
};
export default getTagOperationsForEditing;
