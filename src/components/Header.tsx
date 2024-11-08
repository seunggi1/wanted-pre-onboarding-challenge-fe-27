import { Link } from 'react-router-dom';
import { signout } from '../api/data';

export default function Header() {
	return (
		<header className="w-full border-b-[1px] py-3 mb-5">
			<ul className="max-w-5xl mx-auto flex justify-between">
				<Link to={'/'}>Home</Link>
				<Link to={'/auth/signup'}>회원가입</Link>
				<Link to={'/auth/signin'}>로그인</Link>
				<button onClick={() => signout()}>로그아웃</button>
			</ul>
		</header>
	);
}
