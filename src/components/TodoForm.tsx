import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from '../types/todo';
import { createTodo } from '../api/data';

type Props = {
	onSubmit: (todo: Todo) => void;
};

const INIT_VALUE: Todo = { id: '', title: '', content: '' };

export default function TodoForm({ onSubmit }: Props) {
	const [todo, setTodo] = useState<Todo>(INIT_VALUE);
	const [error, setError] = useState<string>('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createTodo(todo).then((result) => {
			if (result.status === 'success') {
				onSubmit(result.data);
				setTodo(INIT_VALUE);
			} else {
				setError(result.reason);
			}
		});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTodo((t) => ({ ...t, [e.target.name]: e.target.value }));
	};

	return (
		<form onSubmit={handleSubmit}>
			<span>할일</span>
			<input name="title" value={todo.title} onChange={handleChange} />
			<span>상세</span>
			<input name="content" value={todo.content} onChange={handleChange} />
			<button>저장</button>
			{error && <span>{error}</span>}
		</form>
	);
}
