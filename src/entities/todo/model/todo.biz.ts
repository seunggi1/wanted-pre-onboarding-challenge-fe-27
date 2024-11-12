import { Todo, TodoFilter, TodoInput, TodoResult } from '../api/todo.types';
import { api } from '../index';

export async function getTodos(): Promise<Todo[]> {
	const response = await api.getTodos();

	const { data } = await response.json();

	return data;
}

export async function getTodosByFilter(
	todoFilter: TodoFilter
): Promise<Todo[]> {
	const query = [];

	if (todoFilter.sort && todoFilter.order) {
		query.push(`sort=${todoFilter.sort}`, `order=${todoFilter.order}`);
	}

	if (todoFilter.priorityFilter) {
		query.push(`priorityFilter=${todoFilter.priorityFilter}`);
	}

	if (todoFilter.keyword) {
		query.push(`keyword=${todoFilter.keyword}`);
	}

	if (todoFilter.countOnly) {
		query.push(`countOnly=${todoFilter.countOnly}`);
	}

	const response = await api.getTodos(query.join('&'));

	const { data } = await response.json();

	return data;
}

export async function getTodoById(id: string) {
	const response = await api.getTodoById(id);

	const { data } = await response.json();

	return data;
}

function validTodo(todo: TodoInput): string {
	if (!todo.title || !todo.content) {
		return '입력 데이터가 올바르지 않습니다.';
	}

	return '';
}

export async function createTodo(todo: TodoInput): Promise<TodoResult> {
	const error = validTodo(todo);
	if (error) {
		return { status: 'fail', reason: error };
	}

	const response = await api.createTodo(todo);
	const data = await response.json();

	if (!response.ok) {
		return { status: 'fail', reason: data.details };
	}
	return { status: 'success', data: data.data };
}

export async function updateTodo(todo: Todo): Promise<TodoResult> {
	const error = validTodo(todo);
	if (error) {
		return { status: 'fail', reason: error };
	}

	if (!todo.id) {
		return { status: 'fail', reason: '잘못된 수정입니다.' };
	}

	const response = await api.updateTodo(todo);
	const data = await response.json();

	if (!response.ok) {
		return { status: 'fail', reason: data.details };
	}

	return { status: 'success', data: data.data };
}

export async function deleteTodo(id: string): Promise<boolean> {
	const response = await api.deleteTodo(id);

	return response.ok;
}
