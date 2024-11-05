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
		<section>
			<ul>
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
		</section>
	);
}
