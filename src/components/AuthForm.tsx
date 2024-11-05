import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { userAuth } from '../api/data';
import { Auth, AuthResult } from '../types/auth';
import { useLocation, useNavigate } from 'react-router';

export default function AuthForm() {
	const [auth, setAuth] = useState<Auth>({
		email: '',
		password: '',
	});
	const [error, setError] = useState<string>('');
	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');

		if (token) {
			navigate('/');
		}
	}, [navigate]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAuth({ ...auth, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		userAuth(
			auth,
			location.pathname === '/auth/signup' ? 'signup' : 'signin'
		).then((authResult: AuthResult) => {
			if (authResult.status === 'success') {
				navigate('/');
			} else {
				setError(authResult.reason);
			}
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<span>이메일</span>
			<input name="email" value={auth.email} onChange={handleChange} />
			<span>비밀번호</span>
			<input
				name="password"
				type="password"
				value={auth.password}
				onChange={handleChange}
			/>
			<button>
				{location.pathname === '/auth/signup' ? '회원가입' : '로그인'}
			</button>
			{error && <span>{error}</span>}
		</form>
	);
}
