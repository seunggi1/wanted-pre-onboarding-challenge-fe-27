import { Outlet } from 'react-router';
import Header from './components/Header';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<main className="h-screen flex flex-col items-center">
				<Header />
				<Outlet />
			</main>
		</QueryClientProvider>
	);
}

export default App;
