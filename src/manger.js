import {boundMethod} from 'autobind-decorator';
import {User} from './user';

export class Manager {

	constructor(io) {
		this._io = io;
		this._map = new Map();
	}

	init() {
		this._io.on('connection', this._connection);
		return Promise.resolve();
	}

	@boundMethod
	_connection(client) {
		let user = new User(client);
		this._map.set(client, user);
		user.init();
		user.onLocation()
			.subscribe(this._location);
		user.onDisconnect()
			.subscribe(this._disconnect);
	}

	@boundMethod
	_location() {
		// Empty
	}

	@boundMethod
	_disconnect(user) {
		this._map.delete(user.client);
	}

}
