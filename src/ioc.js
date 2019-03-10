import {Container} from 'inversify';
import {helpers} from 'inversify-vanillajs-helpers';
import {makeLoggerMiddleware} from 'inversify-logger-middleware';
import args from './args';

export const container = new Container({
	defaultScope: 'Singleton'
});

if (args['log-deps']) {
	let logger = makeLoggerMiddleware();
	container.applyMiddleware(logger);
}

export const registerSelf = helpers.registerSelf(container);
