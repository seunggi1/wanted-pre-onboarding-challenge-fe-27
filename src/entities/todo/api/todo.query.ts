import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import {
	createTodo,
	deleteTodo,
	getTodoById,
	getTodos,
	getTodosByFilter,
	updateTodo,
} from '../model/todo.biz';

const QUERY_KEY = ['todos'];
export default function useTodo() {
	const queryClient = useQueryClient();
	const { data, error, isPending } = useQuery({
		staleTime: 1000 * 60,
		queryKey: QUERY_KEY,
		queryFn: getTodos,
	});

	const onSuccess = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: QUERY_KEY,
		});
	}, [queryClient]);

	const getAll = onSuccess;

	const getByFilter = useMutation({
		mutationFn: getTodosByFilter,
		onSuccess: (data) => {
			queryClient.setQueryData(QUERY_KEY, data);
		},
	});

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
		getByFilter,
		getById,
		createItem,
		updateItem,
		deleteItem,
		getAll,
	};
}
