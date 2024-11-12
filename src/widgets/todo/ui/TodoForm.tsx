import { ChangeEvent, FormEvent, useState } from 'react';
import { TodoInput } from '../../../entities/todo';
import useTodo from '../../../entities/todo/api/todo.query';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';
import TodoPrioritySelect from './TodoPrioritySelect';

const DEFAULT_VALUE: TodoInput = { title: '', content: '', priority: 'low' };

export default function TodoForm() {
	const [todo, setTodo] = useState<TodoInput>(DEFAULT_VALUE);

	const { createItem } = useTodo();

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createItem.mutate(todo);
	};

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
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
			<label htmlFor="priority">중요도</label>
			<TodoPrioritySelect
				name="priority"
				onChange={handleChange}
				value={todo.priority}
			/>
			<Button name="저장" />
			{createItem.error && <span>{createItem.error.message}</span>}
		</form>
	);
}
