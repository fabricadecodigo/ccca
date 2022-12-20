import { formatMoney } from '../../infra/helpers/formatMoney';

type TotalProps = {
	id: string;
	value: number;
};

export function Total({ id, value }: TotalProps) {
	return (
		<div id={id} data-testid={id} className="total">
			{formatMoney(value)}
		</div>
	);
}
