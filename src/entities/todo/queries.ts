import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
	createTodo,
	deleteTodo,
	getTodoById,
	getTodos,
	updateTodo,
} from '../../shared/api/data';
import { useCallback } from 'react';

const QUERY_KEY = ['todos'];
export default function useTodo() {
	const queryClient = useQueryClient();
	const { data, error, isPending } = useQuery({
		queryKey: QUERY_KEY,
		queryFn: getTodos,
	});

	const onSuccess = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: QUERY_KEY,
		});
	}, [queryClient]);

	const getById = useMutation({
		mutationFn: getTodoById,
		onSuccess,
	});

	const createItem = useMutation({
		mutationFn: createTodo,
		onSuccess,
	});

	const updateItem = useMutation({
		mutationFn: updateTodo,
		onSuccess,
	});

	const deleteItem = useMutation({
		mutationFn: deleteTodo,
		onSuccess,
	});

	return {
		todos: data,
		error,
		isPending,
		getById,
		createItem,
		updateItem,
		deleteItem,
	};
}
