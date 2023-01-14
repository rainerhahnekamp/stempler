import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Auth = {
	username: string;
	profile: string;
	token: string;
	isReady: boolean;
};
const store = writable<Auth>({ username: '', profile: '', token: '', isReady: false });
const { subscribe, set } = store;

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
	await updateStore(client);

	return client;
};

const getClient = async () => {
	if (!instancePromise) {
		instancePromise = createClient();
	}

	return instancePromise;
};

const updateStore = async (client: Auth0Client) => {
	const claims = await client.getIdTokenClaims();
	const auth: Auth = {
		username: claims?.preferred_username || claims?.name || '',
		profile: claims?.picture || '',
		token: claims?.__raw || '',
		isReady: true
	};
	set(auth);
};
export const login = async () => {
	const client = await getClient();
	await client.loginWithRedirect({
		authorizationParams: {
			redirect_uri: window.location.origin
		}
	});
};

export const logout = async () => {
	const client = await getClient();
	await client.logout();
	await updateStore(client);
};

export const auth = { subscribe };

if (browser) {
	getClient();
}
