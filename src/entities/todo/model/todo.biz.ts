import { Todo, TodoResult } from '../api/todo.types';
import { api } from '../index';

export async function getTodos(): Promise<Todo[]> {
	const response = await api.getTodos();

	const { data } = await response.json();
	console.log(data);

	return data;
}

export async function getTodoById(id: string) {
	const response = await api.getTodoById(id);

	const { data } = await response.json();
	console.log(data);

	return data;
}

function validTodo(todo: Todo): string {
	if (!todo.title || !todo.content) {
		return '입력 데이터가 올바르지 않습니다.';
	}

	return '';
}

export async function createTodo(todo: Todo): Promise<TodoResult> {
	const error = validTodo(todo);
	console.log(todo);
	if (error) {
		return { status: 'fail', reason: error };
	}

	const response = await api.createTodo(todo);
	const data = await response.json();

	console.log(data);

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
