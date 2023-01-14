export type User = { id: string; email: string };

let user: User | undefined;

export const currentUser = (): User => {
	if (!user) {
		throw new Error('No current User');
	}
	return user;
};

export const setUser = (value: User) => {
	user = value;
};
