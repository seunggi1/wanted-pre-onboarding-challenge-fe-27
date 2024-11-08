import { InputHTMLAttributes } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement>;

export default function Input(props: Props) {
	const classNames = ['text-lg border rounded-md p-3', props.className].join(
		' '
	);

	return <input className={classNames} {...props} />;
}
