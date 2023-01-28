import type { Prisma } from '@prisma/client';

export type User = Prisma.UserGetPayload<Record<string, never>>;
