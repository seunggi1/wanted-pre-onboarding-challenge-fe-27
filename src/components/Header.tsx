import { Link } from 'react-router-dom';
import { signout } from '../api/data';

export default function Header() {
	return (
		<ul style={{ display: 'flex', justifyContent: 'space-between' }}>
			<Link to={'/'}>Home</Link>
			<Link to={'/auth/signup'}>회원가입</Link>
			<Link to={'/auth/signin'}>로그인</Link>
			<button onClick={() => signout()}>로그아웃</button>
		</ul>
	);
}
