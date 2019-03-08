import 'dotenv/config';
import 'reflect-metadata';
import {container, register} from './ioc';
import {boundMethod} from 'autobind-decorator';
import {SERVER} from './server';
import {SOCKET} from './socket';
import {TUNNEL} from './tunnel';
import logger from './logger';
import args from './args';

export const GARBAGE_TRUCK_TRACKER = Symbol.for('GARBAGE_TRUCK_TRACKER');

@register(GARBAGE_TRUCK_TRACKER, [
	SERVER,
	SOCKET,
	TUNNEL
])
export class GarbageTruckTracker {

	constructor(server, socket, tunnel) {
		this._server = server;
		this._socket = socket;
		this._tunnel = tunnel;
	}

	start() {
		return Promise.resolve()
			.then(this._server.start)
			.then(ips => {
				logger.info('server started');
				for (let ip of ips)
					logger.info('\t@ http://%s:%d', ip, args.port);
			})
			.then(() => args.socket && this._socket.start()
				.then(() => logger.info('socket started')))
			.then(() => args.tunnel && this._tunnel.start()
				.then(t => logger.info('tunnel started: %s', t.url)));
	}

	@boundMethod
	stop() {
		return Promise.resolve()
			.then(() => args.tunnel && this._tunnel.stop()
				.then(() => logger.info('tunnel stopped')))
			.then(() => args.socket && this._socket.stop()
				.then(() => logger.info('socket stopped')))
			.then(this._server.stop)
			.then(() => logger.info('server stopped'))
			.then(() => process.exit());
	}

}

let gtt = container.get(GARBAGE_TRUCK_TRACKER);
gtt.start();
process.once('SIGUSR2', gtt.stop);
process.once('SIGINT', gtt.stop);
process.once('SIGTERM', gtt.stop);
