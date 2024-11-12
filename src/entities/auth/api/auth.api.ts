import { apiClient } from '../../../shared/api';
import { AuthPath } from '../config';
import { Auth } from '../index';

async function signup(auth: Auth): Promise<Response> {
	return apiClient.POST(AuthPath.signup, { body: JSON.stringify(auth) });
}
async function signin(auth: Auth): Promise<Response> {
	return apiClient.POST(AuthPath.signin, { body: JSON.stringify(auth) });
}

export const api = {
	signup,
	signin,
};
