import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import TodoList from '../components/TodoList';
import TodoDetail from '../components/TodoDetail';
import AuthForm from '../components/AuthForm';
import App from '../App';

// 라우터 분리
const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				path: '/',
				children: [
					{
						index: true,
						element: <TodoList />,
					},
					{
						path: '/todo/:id',
						element: <TodoDetail />,
					},
				],
			},
			{
				path: 'auth',
				children: [
					{
						path: 'signup',
						element: <AuthForm />,
					},
					{
						path: 'signin',
						element: <AuthForm />,
					},
				],
			},
		],
	},
]);

export default function Router() {
	return <RouterProvider router={router} />;
}
