import { auth } from '../auth/auth';

let token = '';
auth.subscribe((data) => (token = data.token));

export const request = async <T>(...args: Parameters<typeof fetch>): Promise<T> => {
	const options = args[1] || {};
	if ('headers' in options) {
		(options.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
	} else {
		options.headers = { Authorization: `Bearer ${token}` };
	}
	args[1] = options;

	const response = await fetch.call(this, ...args);
	return response.json() as Promise<T>;
};
