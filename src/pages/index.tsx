import Head from 'next/head';
import { CheckoutPage } from '../frontend/pages/CheckoutPage';

export default function Home() {
	return (
		<>
			<Head>
				<title>CCCA</title>
				<meta
					name="description"
					content="Projeto do curso Clean Code e Clean Architecture"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<CheckoutPage />
		</>
	);
}
