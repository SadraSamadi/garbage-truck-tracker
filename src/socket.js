import {registerSelf} from './ioc';
import {Server} from './server';
import {Manager} from './manger';
import socket_io from 'socket.io';

@registerSelf([Server, Manager])
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
			this._io.close(err => {
				if (err)
					reject(err);
				else
					resolve();
			});
		});
	}

}
