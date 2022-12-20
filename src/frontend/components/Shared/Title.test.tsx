import { render } from '@testing-library/react';
import { Title } from './Title';

test('Deve exibir o titulo', () => {
	render(<Title>Test</Title>);
	const title = document.getElementsByClassName('title');
	expect(title).toHaveLength(1);
	expect(title.item(0)?.textContent).toBe('Test');
});
