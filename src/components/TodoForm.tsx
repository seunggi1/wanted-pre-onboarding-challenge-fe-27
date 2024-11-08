import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from '../types/todo';
import { createTodo } from '../api/data';
import Button from './ui/Button';
import Input from './ui/Input';

type Props = {
	onSubmit: (todo: Todo) => void;
};

const DEFAULT_VALUE: Todo = { id: '', title: '', content: '' };

export default function TodoForm({ onSubmit }: Props) {
	const [todo, setTodo] = useState<Todo>(DEFAULT_VALUE);
	const [error, setError] = useState<string>('');

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		createTodo(todo).then((result) => {
			if (result.status === 'success') {
				onSubmit(result.data);
				setTodo(DEFAULT_VALUE);
			} else {
				setError(result.reason);
			}
		});
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTodo((t) => ({ ...t, [e.target.name]: e.target.value }));
	};

	return (
		<form
			className="basis-1/2 flex flex-col items-center gap-4"
			onSubmit={handleSubmit}
		>
			<label htmlFor="title">할일</label>
			<Input
				name="title"
				id="title"
				value={todo.title}
				onChange={handleChange}
			/>
			<label htmlFor="content">내용</label>
			<Input
				name="content"
				id="content"
				value={todo.content}
				onChange={handleChange}
			/>
			<Button name="저장" />
			{error && <span>{error}</span>}
		</form>
	);
}
