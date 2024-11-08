import { ChangeEvent, FormEvent, useState } from 'react';
import { Todo } from '../types/todo';
import Button from './ui/Button';
import Input from './ui/Input';
import useTodo from '../hooks/useTodo';

const DEFAULT_VALUE: Todo = { id: '', title: '', content: '' };

export default function TodoForm() {
	const [todo, setTodo] = useState<Todo>(DEFAULT_VALUE);

	const { createItem } = useTodo();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createItem.mutate(todo);
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
			{createItem.error && <span>{createItem.error.message}</span>}
		</form>
	);
}
