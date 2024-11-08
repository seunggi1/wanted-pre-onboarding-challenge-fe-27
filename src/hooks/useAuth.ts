import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getToken } from '../util/token';
import { useCallback } from 'react';
import { signin, signup } from '../api/data';

const QUERY_KEY = ['auth'];

export default function useAuth() {
	const queryClient = useQueryClient();
	const { data, error, isPending } = useQuery({
		queryKey: QUERY_KEY,
		queryFn: getToken,
	});

	const onSuccess = useCallback(() => {
		queryClient.invalidateQueries({
			queryKey: ['auth'],
		});
	}, [queryClient]);

	const userSignin = useMutation({
		mutationFn: signin,
		onSuccess,
	});

	const userSignup = useMutation({
		mutationFn: signup,
		onSuccess,
	});

	return {
		token: data,
		isPending,
		error,
		signin: userSignin,
		signup: userSignup,
	};
}
