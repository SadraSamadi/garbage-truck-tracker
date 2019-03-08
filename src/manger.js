import {registerSelf} from './ioc';
import {boundMethod} from 'autobind-decorator';
import {User} from './user';
import logger from './logger';

@registerSelf()
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
		user.init();
		user.onRegister()
			.subscribe(this._register);
		user.onUpdate()
			.subscribe(this._update);
		user.onDisconnect()
			.subscribe(this._disconnect);
	}

	@boundMethod
	_register(user) {
		let users = [];
		this._map.forEach(user => users.push({
			id: user.id,
			name: user.name,
			location: user.location
		}));
		user.client.emit('registered', {
			id: user.id,
			users: users
		});
		this._map.set(user.id, user);
		logger.info('registration verified');
	}

	@boundMethod
	_update() {
		// Blank
	}

	@boundMethod
	_disconnect(user) {
		this._map.delete(user.id);
	}

}
