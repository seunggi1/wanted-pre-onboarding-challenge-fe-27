import { useEffect, useState } from 'react';
import { getTodos } from '../api/data';
import TodoForm from './TodoForm';
import { Todo } from '../types/todo';
import TodoItem from './TodoItem';

export default function TodoList() {
	const [todos, setTodos] = useState<Todo[]>([]);

	useEffect(() => {
		getTodos().then(setTodos);
	}, []);

	const handleSubmit = (todo: Todo) => {
		setTodos((prev) => [...prev, todo]);
	};

	const updateTodo = (updatedTodo: Todo) => {
		setTodos((prev) =>
			prev.map((t) => (t.id === updatedTodo.id ? updatedTodo : t))
		);
	};

	const deleteTodo = (id: string) =>
		setTodos((prev) => prev.filter((t) => t.id !== id));

	return (
		<>
			<h2 className="text-3xl font-bold uppercase mb-3">todo list</h2>
			<section className="w-[90rem] rounded-lg border relative">
				<div className="flex flex-col">
					<div className="flex justify-between text-center border-b p-4">
						<span className="basis-1/2">할일 목록</span>
						<span className="basis-1/2">할일 추가</span>
					</div>
					<div className="w-[1px] h-full bg-gray-200 absolute left-1/2"></div>
					<div className="flex p-4 justify-center">
						<ul className="basis-1/2">
							{todos?.map((todo) => (
								<li key={todo.id}>
									<TodoItem
										initTodo={todo}
										onUpdate={updateTodo}
										onDelete={deleteTodo}
									/>
								</li>
							))}
						</ul>
						<TodoForm onSubmit={handleSubmit} />
					</div>
				</div>
			</section>
		</>
	);
}
