import { APPWRITE_API_KEY } from '$env/static/private';
import { PUBLIC_APPWRITE_ENDPOINT, PUBLIC_APPWRITE_PROJECT } from '$env/static/public';
import { Account, Client } from 'node-appwrite';

export async function createAdminClient() {
	const adminClient = new Client()
		.setEndpoint(PUBLIC_APPWRITE_ENDPOINT!)
		.setProject(PUBLIC_APPWRITE_PROJECT!)
		.setKey(APPWRITE_API_KEY);

	return {
		get account() {
			return new Account(adminClient);
		}
	};
}
