import { Auth0Client, createAuth0Client, User } from '@auth0/auth0-spa-js';
import { derived, writable } from 'svelte/store';
import { browser } from '$app/environment';

const store = writable<User | undefined>(undefined);
const { subscribe, set } = store;
export const username = derived(store, ($user) => ($user ? $user.name : ''));

let instancePromise: Promise<Auth0Client> | undefined;

const createClient = async () => {
	const client = await createAuth0Client({
		domain: 'dev-xbu2-fid.eu.auth0.com',
		clientId: 'zESHptTPy8KyPY8UvOgPnNX5k0RMVLtT'
	});

	const query = window.location.search;
	if (query.includes('code=') && query.includes('state=')) {
		await client.handleRedirectCallback();
		window.history.replaceState({}, document.title, '/');
	}
	set(await client.getUser());

	return client;
};

const getClient = async () => {
	if (!instancePromise) {
		instancePromise = createClient();
	}

	return instancePromise;
};

export const login = async () => {
	const client = await getClient();
	client.loginWithRedirect({
		authorizationParams: {
			redirect_uri: window.location.origin
		}
	});
};

export const logout = async () => {
	const client = await getClient();
	await client.logout();
	set(undefined);
};

export const user = { subscribe };

if (browser) {
	getClient();
}
