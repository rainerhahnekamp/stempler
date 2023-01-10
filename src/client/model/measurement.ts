import { z } from 'zod';

export const measurementSchema = z.object({
	id: z.number(),
	name: z.string(),
	start: z.date(),
	end: z.date()
});

export type Measurement = z.infer<typeof measurementSchema>;
