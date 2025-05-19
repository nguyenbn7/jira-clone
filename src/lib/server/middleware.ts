import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
import { AUTH_COOKIE } from '$lib/server/constant';

import type {
	Account as AccountType,
	Databases as DatabasesType,
	Storage as StorageType,
	Models
} from 'node-appwrite';
import { Account, Client, Databases, Storage } from 'node-appwrite';

import { getCookie } from 'hono/cookie';
import { createMiddleware } from 'hono/factory';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

type SessionEnv = {
	Variables: {
		account: AccountType;
		databases: DatabasesType;
		storage: StorageType;
		user: Models.User<Models.Preferences>;
	};
};

export const sessionMiddleware = createMiddleware<SessionEnv>(async (c, next) => {
	const client = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT)
		.setProject(PUBLIC_APPWRITE_PROJECT);

	const session = getCookie(c, AUTH_COOKIE);
	if (!session) {
		return c.json(
			{
				title: ReasonPhrases.UNAUTHORIZED,
				status: StatusCodes.UNAUTHORIZED,
				detail: 'Login required'
			},
			StatusCodes.UNAUTHORIZED
		);
	}

	client.setSession(session);

	const account = new Account(client);
	const databases = new Databases(client);
	const storage = new Storage(client);

	const user = await account.get();

	c.set('account', account);
	c.set('databases', databases);
	c.set('storage', storage);

	c.set('user', user);

	await next();
});
