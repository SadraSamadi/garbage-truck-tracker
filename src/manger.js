import {registerSelf} from './ioc';
import {User} from './user';
import logger from './logger';

@registerSelf()
export class Manager {

	constructor() {
		this._map = new Map();
	}

	init(io) {
		io.on('connection', ::this._connection);
		return Promise.resolve();
	}

	_connection(client) {
		let user = new User(client);
		user.onRegister()
			.subscribe(::this._register);
		user.onUpdate()
			.subscribe(::this._update);
		user.onDisconnect()
			.subscribe(::this._disconnect);
		user.init();
	}

	_register(user) {
		let users = [];
		this._map.forEach(u => users.push({
			id: u.id,
			name: u.name,
			location: u.location
		}));
		user.client.emit('registered', {
			id: user.id,
			users: users
		});
		this._map.set(user.id, user);
		logger.info('registration verified');
	}

	_update() {
		// Blank
	}

	_disconnect(user) {
		this._map.delete(user.id);
	}

}
