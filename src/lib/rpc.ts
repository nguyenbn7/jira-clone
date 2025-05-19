import type { APIAppType } from '$lib/server/router';
import { PUBLIC_APP_URL } from '$env/static/public';
import { hc } from 'hono/client';

export const client = hc<APIAppType>(PUBLIC_APP_URL);
