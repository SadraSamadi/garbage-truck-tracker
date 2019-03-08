import {register} from './ioc';
import {boundMethod} from 'autobind-decorator';
import {User} from './user';

export const MANAGER = Symbol.for('MANAGER');

@register(MANAGER)
export class Manager {

	constructor() {
		this._map = new Map();
	}

	init(io) {
		io.on('connection', this._connection);
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
