import {
	createBrowserRouter,
	Outlet,
	RouterProvider as ReactRouterProvider,
} from 'react-router-dom';
import { TodoListPage, TodoPage } from '../../pages/todo';
import { AuthPage } from '../../pages/auth';
import Header from '../../shared/ui/Header';

export function RouterProvider() {
	return <ReactRouterProvider router={router} />;
}

function Root() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	);
}

const router = createBrowserRouter([
	{
		element: <Root />,
		children: [
			{
				path: '/',
				children: [
					{
						index: true,
						element: <TodoListPage />,
					},
					{
						path: '/todo/:id',
						element: <TodoPage />,
					},
				],
			},
			{
				path: 'auth',
				children: [
					{
						path: 'signup',
						element: <AuthPage />,
					},
					{
						path: 'signin',
						element: <AuthPage />,
					},
				],
			},
		],
	},
]);
