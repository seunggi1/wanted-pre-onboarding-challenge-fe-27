import { Auth, AuthResult } from '../types/auth';
import { Todo, TodoResult } from '../types/todo';
import { getToken, setToken } from '../util/token';

class APIClient {
	constructor(private baseURL: string) {}

	private fetchData<T>(
		path: string,
		method: 'GET' | 'POST' | 'PUT' | 'DELETE',
		body?: T,
		token?: string
	): Promise<Response> {
		const request: RequestInit = {
			method,
			headers: {
				'Content-Type': 'application/json',
				Authorization: token || '',
			},
		};

		if (body && method !== 'GET') {
			request.body = JSON.stringify(body);
		}

		return fetch(`${this.baseURL}${path}`, request);
	}

	async signup(auth: Auth): Promise<Response> {
		return this.fetchData('/users/create', 'POST', auth);
	}

	async signin(auth: Auth): Promise<Response> {
		return this.fetchData('/users/login', 'POST', auth);
	}

	async getTodos(): Promise<Response> {
		return this.fetchData('/todos', 'GET', undefined, getToken());
	}

	async getTodoById(id: string): Promise<Response> {
		return this.fetchData(`/todos/${id}`, 'GET', undefined, getToken());
	}

	async createTodo(todo: Todo): Promise<Response> {
		return this.fetchData(`/todos`, 'POST', todo, getToken());
	}

	async updateTodo(todo: Todo): Promise<Response> {
		return this.fetchData(`/todos/${todo.id}`, 'PUT', todo, getToken());
	}

	async deleteTodo(id: string): Promise<Response> {
		return this.fetchData(`/todos/${id}`, 'DELETE', undefined, getToken());
	}
}

const apiClient = new APIClient('http://localhost:8080');

export async function userAuth(
	auth: Auth,
	authType: 'signup' | 'signin'
): Promise<AuthResult> {
	if (!/^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,6}$/.test(auth.email)) {
		return {
			status: 'fail',
			reason: '이메일 형식이 올바르지 않습니다.',
		};
	}

	if (auth.password.length < 8) {
		return { status: 'fail', reason: '비밀번호는 최소 8자 이상 입력해주세요.' };
	}

	const authFunc = authType === 'signup' ? apiClient.signup : apiClient.signin;

	const response = await authFunc.call(apiClient, auth);
	const data = await response.json();

	if (!response.ok) {
		return { status: 'fail', reason: data.details };
	}

	setToken(data.token);
	return { status: 'success', token: data.token };
}

export async function signout() {
	setToken('');
}

export async function getTodos(): Promise<Todo[]> {
	const response = await apiClient.getTodos();

	const { data } = await response.json();
	console.log(data);

	return data;
}

export async function getTodoById(id: string) {
	const response = await apiClient.getTodoById(id);

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
	if (error) {
		return { status: 'fail', reason: error };
	}

	const response = await apiClient.createTodo(todo);
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

	const response = await apiClient.updateTodo(todo);
	const data = await response.json();

	if (!response.ok) {
		return { status: 'fail', reason: data.details };
	}

	return { status: 'success', data: data.data };
}

export async function deleteTodo(id: string): Promise<boolean> {
	const response = await apiClient.deleteTodo(id);

	return response.ok;
}
