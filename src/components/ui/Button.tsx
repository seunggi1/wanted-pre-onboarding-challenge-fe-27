import { HTMLAttributes } from 'react';

type Props = {
	name: string;
} & HTMLAttributes<HTMLButtonElement>;

export default function Button({ name, onClick }: Props) {
	return (
		<button
			className="p-2 bg-neutral-900 text-white rounded-md"
			onClick={onClick}
		>
			{name}
		</button>
	);
}
