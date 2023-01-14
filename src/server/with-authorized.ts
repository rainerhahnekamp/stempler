import type { RequestEvent } from '@sveltejs/kit';
import { JwtParserError, parseJwt } from './parse-jwt';
import type { User } from './user';

export const withAuthorized = async (
	{ request }: RequestEvent,
	processor: (user: User) => Promise<unknown>
) => {
	try {
		const user = await parseJwt(request);
		const responseBody = await processor(user);
		return new Response(JSON.stringify(responseBody));
	} catch (error: unknown) {
		if (error instanceof JwtParserError) {
			return new Response(null, { status: 401, statusText: error.message });
		} else {
			return new Response(null, { status: 500 });
		}
	}
};
