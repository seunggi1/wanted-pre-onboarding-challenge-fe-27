import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Todo } from '../../../entities/todo';

export function TodoPage() {
	const [todo, setTodo] = useState<Todo | undefined>();
	const { id } = useParams();

	console.log(id);

	useEffect(() => {
		if (id) {
			// getTodoById(id).then(setTodo);
		}
	}, [id]);

	return (
		<>
			{todo && (
				<>
					<ul className="flex flex-col justify-between border rounded-lg p-4 text-md">
						<li>{`제목 : ${todo.title}`}</li>
						<li>{`내용 : ${todo.content}`}</li>
						<li>{`생성일 : ${todo.createdAt}`}</li>
						<li>{`마지막 수정일 : ${todo.updatedAt}`}</li>
					</ul>
				</>
			)}
		</>
	);
}
