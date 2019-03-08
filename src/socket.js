import socket_io from 'socket.io';
import server from './server';
import {Manager} from './manger';

export class Socket {

	constructor() {
		this._io = null;
		this._manager = null;
	}

	start() {
		this._io = socket_io(server.httpServer);
		this._manager = new Manager(this._io);
		return this._manager.init();
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

export default new Socket();
