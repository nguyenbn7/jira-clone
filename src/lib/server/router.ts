import auth from '$features/auth/server/router';

import { Hono } from 'hono';
import { requestId } from 'hono/request-id';

const app = new Hono().use(requestId()).basePath('/api').route('/auth', auth);

export default app;

export type APIAppType = typeof app;
