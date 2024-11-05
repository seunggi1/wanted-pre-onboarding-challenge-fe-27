import { useEffect, useState } from 'react';
import { Todo } from '../types/todo';
import { getTodoById } from '../api/data';
import { useParams } from 'react-router';

export default function TodoDetail() {
	const [todo, setTodo] = useState<Todo | undefined>();
	const { id } = useParams();

	console.log(id);

	useEffect(() => {
		if (id) {
			getTodoById(id).then(setTodo);
		}
	}, [id]);

	return (
		<>
			{todo && (
				<ul>
					<li>{todo.title}</li>
					<li>{todo.content}</li>
				</ul>
			)}
		</>
	);
}
