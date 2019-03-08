import {Container} from 'inversify';
import {helpers} from 'inversify-vanillajs-helpers';
import {makeLoggerMiddleware} from 'inversify-logger-middleware';

const logger = makeLoggerMiddleware();

export const container = new Container({
	defaultScope: 'Singleton'
});

container.applyMiddleware(logger);

export const registerSelf = helpers.registerSelf(container);
