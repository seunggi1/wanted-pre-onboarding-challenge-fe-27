import { Outlet } from 'react-router';
import Header from './components/Header';

function App() {
	return (
		<main className="h-screen flex flex-col items-center">
			<Header />
			<Outlet />
		</main>
	);
}

export default App;
