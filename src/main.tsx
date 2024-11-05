import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthForm from './components/AuthForm.tsx';
import TodoList from './components/TodoList.tsx';
import TodoDetail from './components/TodoDetail.tsx';

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

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
