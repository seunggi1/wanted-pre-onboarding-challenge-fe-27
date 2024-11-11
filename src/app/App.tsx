import { QueryClientProvider, RouterProvider } from './providers';

function App() {
	return (
		<QueryClientProvider>
			<RouterProvider />
		</QueryClientProvider>
	);
}

export default App;
