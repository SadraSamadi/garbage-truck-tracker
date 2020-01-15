import 'dotenv/config';
import 'reflect-metadata';
import {container} from './ioc';
import logger from './logger';
import App from './app';

logger.info('NODE_ENV=%s', process.env.NODE_ENV);

let app = container.get(App);
for (let signal of ['SIGUSR2', 'SIGINT', 'SIGTERM'])
	process.on(signal, ::app.stop);
app.start();
