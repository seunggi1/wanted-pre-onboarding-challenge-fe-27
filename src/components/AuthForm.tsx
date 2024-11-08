import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Auth } from '../types/auth';
import { useLocation, useNavigate } from 'react-router';
import Button from './ui/Button';
import Input from './ui/Input';
import useAuth from '../hooks/useAuth';

export default function AuthForm() {
	const [auth, setAuth] = useState<Auth>({
		email: '',
		password: '',
	});

	const { token, signin, signup } = useAuth();

	const location = useLocation();
	const navigate = useNavigate();

	useEffect(() => {
		if (token) {
			navigate('/');
		}
	}, [token, navigate]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setAuth({ ...auth, [e.target.name]: e.target.value });
	};

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (location.pathname === '/auth/signup') {
			signup.mutate(auth);
		} else {
			signin.mutate(auth);
		}
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
			{signin.error && (
				<span className="text-red-500">{signin.error.message}</span>
			)}
			{signup.error && (
				<span className="text-red-500">{signup.error.message}</span>
			)}
		</form>
	);
}
