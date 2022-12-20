import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Total } from './Total';

test('Deve exibir o total formatado com moeda', () => {
	render(<Total id="test" value={1234.56} />);
	expect(document.getElementById('test')).toBeInTheDocument();
	expect(document.getElementById('test')?.textContent).toBe('$1,234.56');
});
