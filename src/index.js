import 'dotenv/config';
import server from './server';
import socket from './socket';
import tunnel from './tunnel';
import logger from './logger';
import args from './args';

function start() {
	return Promise.resolve()
		.then(server.start)
		.then(ips => {
			logger.info('server started');
			for (let ip of ips)
				logger.info('\t@ http://%s:%d', ip, args.port);
		})
		.then(() => args.socket && socket.start()
			.then(() => logger.info('socket started')))
		.then(() => args.tunnel && tunnel.start()
			.then(t => logger.info('tunnel started: %s', t.url)));
}

function stop() {
	return Promise.resolve()
		.then(() => args.tunnel && tunnel.stop()
			.then(() => logger.info('tunnel stopped')))
		.then(() => args.socket && socket.stop()
			.then(() => logger.info('socket stopped')))
		.then(server.stop)
		.then(() => logger.info('server stopped'));
}

start();
process.once('SIGUSR2', stop);
process.once('SIGINT', stop);
process.once('SIGTERM', stop);
