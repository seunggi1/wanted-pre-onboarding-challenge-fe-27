import { apiClient } from '../../../shared/api';
import { getToken } from '../../../shared/util/token';
import { Todo } from './todo.types';

async function getTodos(): Promise<Response> {
	return apiClient.GET('/todos', {
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

async function createTodo(todo: Todo): Promise<Response> {
	return apiClient.POST(`/todos`, {
		body: JSON.stringify(todo),
		headers: {
			Authorization: getToken(),
		},
	});
}

async function updateTodo(todo: Todo): Promise<Response> {
	return apiClient.PUT(`/todos`, {
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
