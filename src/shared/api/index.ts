import { backEndBaseURL } from '../config';

class APIClient {
	constructor(private baseURL: string) {}

	private async fetchData(
		path: string,
		method: 'GET' | 'POST' | 'PUT' | 'DELETE',
		requestInit?: RequestInit
	) {
		return fetch(`${this.baseURL}${path}`, {
			method,
			...requestInit,
			headers: {
				'Content-Type': 'application/json',
				...requestInit?.headers,
			},
		});
	}

	async GET(path: string, requestInit: RequestInit) {
		return this.fetchData(path, 'GET', requestInit);
	}

	async POST(path: string, requestInit: RequestInit) {
		return this.fetchData(path, 'POST', requestInit);
	}

	async PUT(path: string, requestInit: RequestInit) {
		return this.fetchData(path, 'PUT', requestInit);
	}

	async DELETE(path: string, requestInit: RequestInit) {
		return this.fetchData(path, 'DELETE', requestInit);
	}
}

export const apiClient = new APIClient(backEndBaseURL);
