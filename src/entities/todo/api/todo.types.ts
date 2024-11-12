export type Todo = {
	id: string;
	title: string;
	content: string;
	createdAt?: string;
	updatedAt?: string;
	priority: 'urgent' | 'normal' | 'low';
};

export type TodoInput = Pick<Todo, 'title' | 'content' | 'priority'>;

export type TodoFilter = {
	sort?: keyof Pick<Todo, 'createdAt' | 'updatedAt' | 'priority'>;
	order?: '' | 'asc' | 'desc';
	priorityFilter?: Todo['priority'];
	keyword?: string;
	countOnly?: boolean;
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
