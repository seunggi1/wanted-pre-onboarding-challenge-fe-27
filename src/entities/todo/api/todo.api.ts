import { apiClient } from '../../../shared/api';
import { getToken } from '../../../shared/util/token';
import { Todo, TodoInput } from './todo.types';

async function getTodos(query?: string): Promise<Response> {
	return apiClient.GET(`/todos?${query}`, {
		headers: {
			Authorization: getToken(),
		},
	});
}

async function getTodoById(id: string): Promise<Response> {
	return apiClient.GET(`/todos/${id}`, {
		headers: {
			Authorization: getToken(),
		},
	});
}

async function createTodo(todo: TodoInput): Promise<Response> {
	return apiClient.POST(`/todos`, {
		body: JSON.stringify(todo),
		headers: {
			Authorization: getToken(),
		},
	});
}

async function updateTodo(todo: Todo): Promise<Response> {
	return apiClient.PUT(`/todos/${todo.id}`, {
		body: JSON.stringify(todo),
		headers: {
			Authorization: getToken(),
		},
	});
}

async function deleteTodo(id: string): Promise<Response> {
	return apiClient.DELETE(`/todos/${id}`, {
		headers: {
			Authorization: getToken(),
		},
	});
}

export const api = {
	getTodos,
	getTodoById,
	createTodo,
	updateTodo,
	deleteTodo,
};
