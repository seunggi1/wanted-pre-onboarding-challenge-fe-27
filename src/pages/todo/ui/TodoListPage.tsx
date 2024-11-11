import { Todo } from '../../../entities/todo';
import useTodo from '../../../entities/todo/queries';
import TodoForm from './TodoForm';
import TodoItem from './TodoItem';

export function TodoListPage() {
	const { todos, updateItem, deleteItem } = useTodo();

	const updateTodo = (updatedTodo: Todo) => updateItem.mutate(updatedTodo);
	const deleteTodo = (id: string) => deleteItem.mutate(id);

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
						<TodoForm />
					</div>
				</div>
			</section>
		</>
	);
}
