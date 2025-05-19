import { AUTH_COOKIE } from '$features/auth/constant';
import { loginSchema, registerSchema } from '$features/auth/schema';

import { createAdminClient } from '$lib/server/appwrite';
import { sessionMiddleware } from '$lib/server/middleware';

import { AppwriteException, ID } from 'node-appwrite';

import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import { zValidator } from '@hono/zod-validator';

const app = new Hono()
	.get('/current', sessionMiddleware, (c) => {
		const user = c.get('user');

		return c.json({ data: user });
	})
	.post('/login', zValidator('json', loginSchema), async (c) => {
		const { email, password } = c.req.valid('json');

		const { account } = await createAdminClient();

		try {
			const session = await account.createEmailPasswordSession(email, password);

			setCookie(c, AUTH_COOKIE, session.secret, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30
			});

			return c.json({ success: true });
		} catch (e) {
			const err = e as AppwriteException;

			return c.json({ success: false, error: err.message });
		}
	})
	.post('/register', zValidator('json', registerSchema), async (c) => {
		const { email, password, name } = c.req.valid('json');

		const { account } = await createAdminClient();

		try {
			const user = await account.create(ID.unique(), email, password, name);

			const session = await account.createEmailPasswordSession(user.email, password);

			setCookie(c, AUTH_COOKIE, session.secret, {
				path: '/',
				httpOnly: true,
				secure: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 30
			});

			return c.json({ success: true });
		} catch (e) {
			const err = e as AppwriteException;

			return c.json({ success: false, error: err.message });
		}
	})
	.post('/logout', sessionMiddleware, async (c) => {
		const account = c.get('account');

		setCookie(c, AUTH_COOKIE, '', {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 0
		});

		await account.deleteSession('current');

		return c.json({ success: true });
	});

export default app;
