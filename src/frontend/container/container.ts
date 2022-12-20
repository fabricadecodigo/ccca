import CheckoutGatewayHttp from '../infra/gateway/CheckoutGatewayHttp';
import FetchAdapter from '../infra/http/FetchAdapter';

const checkoutGateway = new CheckoutGatewayHttp(new FetchAdapter(), 'http://localhost:3000/api');

export { checkoutGateway };
