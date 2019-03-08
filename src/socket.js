import {register} from './ioc';
import {SERVER} from './server';
import {MANAGER} from './manger';
import socket_io from 'socket.io';

export const SOCKET = Symbol.for('SOCKET');

@register(SOCKET, [
	SERVER,
	MANAGER
])
export class Socket {

	constructor(server, manager) {
		this._server = server;
		this._manager = manager;
		this._io = null;
	}

	start() {
		this._io = socket_io(this._server.httpServer);
		return this._manager.init(this._io);
	}

	stop() {
		return new Promise((resolve, reject) => {
			if (!this._io.engine)
				return resolve();
			this._io.close(err => {
				if (err)
					reject(err);
				else
					resolve();
			});
		});
	}

}
