import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { userAuth } from '../api/data';
import { Auth, AuthResult } from '../types/auth';
import { useLocation, useNavigate } from 'react-router';
import Button from './ui/Button';
import Input from './ui/Input';

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
		<form
			className="w-96 p-4 flex flex-col items-center gap-4 border rounded-lg absolute top-[30%] left-1/2 -translate-x-1/2"
			onSubmit={handleSubmit}
		>
			<label htmlFor="email">이메일</label>
			<Input
				name="email"
				id="email"
				value={auth.email}
				onChange={handleChange}
				autoFocus
			/>
			<label htmlFor="password">비밀번호</label>
			<Input
				name="password"
				type="password"
				id="password"
				value={auth.password}
				onChange={handleChange}
				min={8}
			/>
			<Button
				name={location.pathname === '/auth/signup' ? '회원가입' : '로그인'}
			/>
			{error && <span className="text-red-500">{error}</span>}
		</form>
	);
}
