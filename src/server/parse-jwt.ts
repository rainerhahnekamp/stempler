import * as jose from 'jose';
import { auth0Jwks } from './auth0-jwks';
import type { User } from './user';
import { setUser } from './user';

export class JwtParserError extends Error {}

export const parseJwt = async (request: Request): Promise<User> => {
	if (!request.headers.has('authorization')) {
		throw new JwtParserError('Authorization Header is missing');
	}

	const header = request.headers.get('authorization') || '';
	const matches = header.match(/Bearer (.*)$/);
	if (!matches) {
		throw new JwtParserError('Invalid JWT Format');
	}
	const token = matches[1];

	const jwks = jose.createLocalJWKSet(auth0Jwks);
	const {
		payload: { sub, email }
	} = await jose.jwtVerify(token, jwks, {
		issuer: 'https://dev-xbu2-fid.eu.auth0.com/',
		audience: 'zESHptTPy8KyPY8UvOgPnNX5k0RMVLtT'
	});

	if (!sub) {
		throw new JwtParserError('sub property in JWT is missing');
	}

	const user = { id: sub, email: String(email) || '' };

	setUser(user);
	return user;
};
