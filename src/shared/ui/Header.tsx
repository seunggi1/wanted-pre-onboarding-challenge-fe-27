import { Link } from 'react-router-dom';
import { setToken } from '../util/token';

export default function Header() {
	return (
		<header className="w-full border-b-[1px] py-3 mb-5">
			<ul className="max-w-5xl mx-auto flex justify-between">
				<li>
					<Link to={'/'}>홈</Link>
				</li>
				<li>
					<Link to={'/auth/signup'}>회원가입</Link>
				</li>
				<li>
					<Link to={'/auth/signin'}>로그인</Link>
				</li>
				<li>
					<button onClick={() => setToken('')}>로그아웃</button>
				</li>
			</ul>
		</header>
	);
}
