import { ChangeEvent, useState } from 'react';
import { deleteTodo, updateTodo } from '../api/data';
import { Todo } from '../types/todo';
import { Link } from 'react-router-dom';

type Props = {
	initTodo: Todo;
	onUpdate: (updatedTodo: Todo) => void;
	onDelete: (id: string) => void;
};

export default function TodoItem({ initTodo, onUpdate, onDelete }: Props) {
	const [todo, setTodo] = useState<Todo>(initTodo);
	const [error, setError] = useState<string>('');

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTodo((t) => ({ ...t, [e.target.name]: e.target.value }));
	};

	const handleUpdate = () => {
		updateTodo(todo).then((result) => {
			if (result.status === 'success') {
				onUpdate(result.data);
			} else {
				setError(result.reason);
			}
		});
	};

	const handleDelete = (id: string) => {
		deleteTodo(id).then((result) => result && onDelete(id));
	};

	return (
		<>
			<input name="title" onChange={handleChange} value={todo.title} />
			<input name="content" onChange={handleChange} value={todo.content} />
			<Link to={`/todo/${todo.id}`}>상세보기</Link>
			<button onClick={() => handleUpdate()}>업데이트</button>
			<button onClick={() => handleDelete(todo.id)}>삭제</button>
			{error && <span>error</span>}
		</>
	);
}
