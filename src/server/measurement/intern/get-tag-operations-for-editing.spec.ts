import { describe, expect, it, vi } from 'vitest';
import type { PrismaClient } from '@prisma/client/edge';
import * as getPrismaClient from '../../get-prisma-client';
import getTagOperationsForEditing from './get-tag-operations-for-editing';

vi.mock('$env/static/private', () => ({
	DATABASE_URL: ''
}));

describe('getTagOperationsForEditing', () => {
	it('should be able to reconstruct tags to be removed, updated and created', async () => {
		const mango = { id: 2, name: 'mango', description: '' };
		const [apple, banana, peach, orange] = ['apple', 'banana', 'peach', 'orange'].map(
			(name, ix) => ({ id: ix + 1, name })
		);

		vi.spyOn(getPrismaClient, 'getPrismaClient').mockReturnValue({
			tag: { findMany: async () => [mango] }
		} as unknown as PrismaClient);
		const assignedTags = [apple, banana, peach, orange];
		const enteredTags = ['peach', 'apple', 'grapes', 'mango'];

		expect(await getTagOperationsForEditing(assignedTags, enteredTags)).toEqual({
			tagsToBeDisconnected: [{ id: banana.id }, { id: orange.id }],
			tagsToBeAdded: [{ name: 'grapes', description: '' }],
			tagsToBeConnected: [{ id: 2 }]
		});
	});
});
