import {boundMethod} from 'autobind-decorator';
import {Subject} from 'rxjs';
import logger from './logger';

export class User {

	constructor(client) {
		this.client = client;
		this.username = null;
		this.location = null;
		this._onLocation = new Subject();
		this._onDisconnect = new Subject();
	}

	init() {
		logger.info('client connected: %s', this.client.id);
		this.client.on('register', this._register);
		this.client.on('disconnect', this._disconnect);
	}

	@boundMethod
	_register(username) {
		this.username = username;
		this.client.on('update:location', this._location);
		logger.info('user registered: %s', username);
	}

	@boundMethod
	_location(location) {
		this.location = location;
		logger.info('user location: %s', this.username);
		let str = JSON.stringify(this.location);
		logger.info('\t# %s', str);
		this.client.broadcast.emit('updated:location', {
			username: this.username,
			location: this.location
		});
		logger.info('location broadcast emitted');
		this._onLocation.next(this);
	}

	@boundMethod
	_disconnect() {
		this._onDisconnect.next(this);
		logger.info('client disconnected: %s', this.client.id);
		logger.info('user unregistered: %s', this.username);
	}

	onLocation() {
		return this._onLocation.asObservable();
	}

	onDisconnect() {
		return this._onDisconnect.asObservable();
	}

}
