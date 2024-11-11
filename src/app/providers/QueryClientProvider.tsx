import {
	QueryClient,
	QueryClientProvider as TanStackQueryClientProvider,
} from '@tanstack/react-query';
import { ReactNode } from 'react';

// const todoPageloader = async () => {
// 	const todos = await queryClient.ensureQueryData({
// 		queryKey:['todos'],
// 		queryFn : getTodos
// 	});

// 	return {todos : };
// }

const queryClient = new QueryClient();

type QueryClientProviderProp = {
	children: ReactNode;
};

export function QueryClientProvider({ children }: QueryClientProviderProp) {
	return (
		<TanStackQueryClientProvider client={queryClient}>
			{children}
		</TanStackQueryClientProvider>
	);
}
