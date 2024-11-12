import { setToken } from '../../../shared/util/token';
import { api } from '../api/auth.api';
import { Auth, AuthResult } from '../api/auth.types';

async function userAuth(
	auth: Auth,
	authType: 'signup' | 'signin'
): Promise<AuthResult> {
	if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(auth.email)) {
		return {
			status: 'fail',
			reason: '이메일 형식이 올바르지 않습니다.',
		};
	}

	if (auth.password.length < 8) {
		return { status: 'fail', reason: '비밀번호는 최소 8자 이상 입력해주세요.' };
	}

	const authFunc = authType === 'signup' ? api.signup : api.signin;

	const response = await authFunc(auth);
	const data = await response.json();

	if (!response.ok) {
		return { status: 'fail', reason: data.details };
	}

	setToken(data.token);
	return { status: 'success', token: data.token };
}

export async function signup(auth: Auth) {
	return userAuth(auth, 'signup');
}

export async function signin(auth: Auth) {
	return userAuth(auth, 'signin');
}

export async function signout() {
	setToken('');
}
