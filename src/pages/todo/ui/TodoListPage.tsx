import { ChangeEvent, useState } from 'react';
import { Todo, TodoFilter } from '../../../entities/todo';
import useTodo from '../../../entities/todo/api/todo.query';
import Button from '../../../shared/ui/Button';
import Input from '../../../shared/ui/Input';
import TodoForm from '../../../widgets/todo/ui/TodoForm';
import TodoItem from '../../../widgets/todo/ui/TodoItem';
import TodoPrioritySelect from '../../../widgets/todo/ui/TodoPrioritySelect';

const DEFAULT_FILTER: TodoFilter = {
	sort: 'createdAt',
	order: '',
	keyword: '',
	priorityFilter: 'low',
	countOnly: false,
};

export function TodoListPage() {
	const { todos, updateItem, deleteItem, getByFilter, getAll } = useTodo();
	const [filter, setFilter] = useState<TodoFilter>(DEFAULT_FILTER);

	const updateTodo = (updatedTodo: Todo) => updateItem.mutate(updatedTodo);
	const deleteTodo = (id: string) => deleteItem.mutate(id);

	const filterTodo = () => filter && getByFilter.mutate(filter);

	const handleFilterUpdate = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFilter((f) => ({ ...f, [e.target.name]: e.target.value }));
	};

	return (
		<>
			<h2 className="text-3xl font-bold uppercase mb-3">todo list</h2>
			<div>
				<h2 className="text-2xl font-bold">필터링 조건</h2>
				<div className="flex my-4 gap-4">
					<TodoPrioritySelect
						name="priorityFilter"
						value={filter.priorityFilter || 'low'}
						onChange={handleFilterUpdate}
					/>
					<select name="sort" onChange={handleFilterUpdate} value={filter.sort}>
						<option value={'createdAt'}>생성일</option>
						<option value={'updatedAt'}>수정일</option>
						<option value={'priority'}>우선순위</option>
					</select>
					<select
						name="order"
						onChange={handleFilterUpdate}
						value={filter.order}
					>
						<option value={'asc'}>최신순</option>
						<option value={'desc'}>과거순</option>
					</select>
					<Input
						name="keyword"
						placeholder="키워드"
						onChange={handleFilterUpdate}
						value={filter.keyword}
					/>
					<Button name="필터링" onClick={filterTodo} />
					<Button name="전체보기" onClick={getAll} />
				</div>
			</div>
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
