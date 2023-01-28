import { z } from 'zod';

export const measurementSchema = z.object({
	id: z.number(),
	name: z.string(),
	start: z.date(),
	end: z.nullable(z.date()),
	tags: z.array(z.object({ id: z.number(), name: z.string() }))
});

export type Measurement = z.infer<typeof measurementSchema>;
