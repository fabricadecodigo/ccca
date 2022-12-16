import { HttpMethod } from './HttpMethod';
import { NextApiRequest, NextApiResponse } from 'next';
import Checkout from '../application/Checkout';

export class CheckoutController {
	protected router: {
		[method: string]: (query?: any, body?: any) => Promise<any>;
	} = {};

	constructor(readonly checkout: Checkout) {
		this.router = {
			[HttpMethod.POST]: async (query?: any, body?: any) => {
				const output = await checkout.execute(body);
				return output;
			},
		};
	}

	async execute(req: NextApiRequest, res: NextApiResponse): Promise<any> {
		try {
			const callback = this.getCallback(req.method);

			const response = await callback(req.query, req.body);
			if (response) {
				return res.status(200).json(response);
			} else {
				return res.status(200).json('');
			}
		} catch (error: any) {
			return res.status(422).json({
				message: error.message,
			});
		}
	}

	private getCallback(method: string | undefined): (query?: any, body?: any) => Promise<any> {
		if (!method) {
			throw new Error('Method not allowed');
		}
		const callback = this.router[method];
		if (!callback) {
			throw new Error('Method not allowed');
		}
		return callback;
	}
}
