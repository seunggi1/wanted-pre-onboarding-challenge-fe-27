import { Outlet } from 'react-router';
import './App.css';
import Header from './components/Header';

function App() {
	return (
		<main>
			<Header />
			<Outlet />
		</main>
	);
}

export default App;
