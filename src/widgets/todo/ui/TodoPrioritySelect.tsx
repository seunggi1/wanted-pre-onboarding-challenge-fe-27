import { ChangeEvent } from 'react';
import { TodoInput } from '../../../entities/todo';

type Props = {
	name: string;
	value: TodoInput['priority'];
	onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const priorities: TodoInput['priority'][] = ['low', 'normal', 'urgent'];

export default function TodoPrioritySelect({ name, value, onChange }: Props) {
	return (
		<select name={name} id={name} value={value} onChange={onChange}>
			{priorities.map((p) => (
				<option value={p} key={p}>
					{p}
				</option>
			))}
		</select>
	);
}
