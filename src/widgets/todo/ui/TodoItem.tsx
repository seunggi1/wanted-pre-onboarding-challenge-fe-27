import { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Todo } from '../../../entities/todo';
import Input from '../../../shared/ui/Input';
import Button from '../../../shared/ui/Button';
import { deleteTodo, updateTodo } from '../../../entities/todo/model/todo.biz';

type Props = {
	initTodo: Todo;
	onUpdate: (updatedTodo: Todo) => void;
	onDelete: (id: string) => void;
};

export default function TodoItem({ initTodo, onUpdate, onDelete }: Props) {
	const [todo, setTodo] = useState<Todo>(initTodo);
	const [error, setError] = useState<string>('');

	const navigate = useNavigate();

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
		<div className="flex justify-between p-4">
			<div className="flex gap-2">
				<Input name="title" onChange={handleChange} value={todo.title} />
				<Input name="content" onChange={handleChange} value={todo.content} />
			</div>
			<div className="flex gap-2">
				<Button
					className="p-2 bg-neutral-900 text-white rounded-md"
					onClick={() => navigate(`/todo/${todo.id}`)}
					name="상세보기"
				/>
				<Button onClick={() => handleUpdate()} name="업데이트" />
				<Button onClick={() => handleDelete(todo.id)} name="삭제" />
			</div>
			{error && <span>error</span>}
		</div>
	);
}
