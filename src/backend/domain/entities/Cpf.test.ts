import Cpf from './Cpf';

const validCpfs = ['987.654.321-00', '714.602.380-01', '313.030.210-72', '144.796.170-60'];

test.each(validCpfs)('Deve testar um cpf válido: %s', function (value: string) {
	const cpf = new Cpf(value);
	expect(cpf).toBeInstanceOf(Cpf);
});

const invalidCpfs = [
	'111.111.111-11',
	'222.222.222-22',
	'333.333.333-33',
	'444.444.444-44',
	'555.555.555-55',
	'666.666.666-66',
	'777.777.777-77',
	'888.888.888-88',
	'999.999.999-99',
	'987.654.321-01',
	'714.602.380-10',
	'313.030.210-70',
	'144.796.170-10',
];

test.each(invalidCpfs)('Deve testar um cpf inválido: %s', function (value: string) {
	expect(() => new Cpf(value)).toThrow(new Error('Invalid cpf'));
});

test('Deve testar um cpf com tamanho errado', function () {
	expect(() => new Cpf('123')).toThrow(new Error('Invalid cpf'));
});
