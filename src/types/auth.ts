export type Auth = {
	email: string;
	password: string;
};

export type AuthSuccess = {
	status: 'success';
	token: string;
};

export type AuthFail = {
	status: 'fail';
	reason: string;
};

export type AuthResult = AuthSuccess | AuthFail;
