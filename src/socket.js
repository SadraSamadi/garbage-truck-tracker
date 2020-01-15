import SocketIO from 'socket.io';
import {registerSelf} from './ioc';
import Server from './server';
import Manager from './manger';

@registerSelf([Server, Manager])
export default class Socket {

	constructor(server, manager) {
		this._server = server;
		this._manager = manager;
		this._io = null;
	}

	start() {
		this._io = SocketIO(this._server.http);
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
