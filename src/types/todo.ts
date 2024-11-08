export type Todo = {
	id: string;
	title: string;
	content: string;
	createdAt?: string;
	updatedAt?: string;
};

export type TodoSuccessResult = {
	status: 'success';
	data: Todo;
};

export type TodoFailResult = {
	status: 'fail';
	reason: string;
};

export type TodoResult = TodoSuccessResult | TodoFailResult;
