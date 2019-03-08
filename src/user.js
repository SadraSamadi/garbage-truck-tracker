import {boundMethod} from 'autobind-decorator';
import uuid from 'uuid';
import {Subject} from 'rxjs';
import logger from './logger';

export class User {

	constructor(client) {
		this.id = uuid();
		this.client = client;
		this.name = null;
		this.location = null;
		this._onRegister = new Subject();
		this._onLocation = new Subject();
		this._onDisconnect = new Subject();
	}

	init() {
		logger.info('user connected: %s', this.id);
		this.client.on('register', this._register);
		this.client.on('disconnect', this._disconnect);
		return Promise.resolve();
	}

	@boundMethod
	_register(name) {
		this.name = name;
		logger.info('user registered: %s', this.id);
		logger.info('\t# %s', this.name);
		this.client.on('update:location', this._location);
		this._onRegister.next(this);
	}

	@boundMethod
	_location(location) {
		this.location = location;
		logger.info('user location updated: %s', this.id);
		logger.info('\t# %s', this.name);
		let str = JSON.stringify(this.location);
		logger.info('\t# %s', str);
		this.client.broadcast.emit('updated:location', {
			id: this.id,
			location: this.location
		});
		logger.info('updated location broadcast emitted');
		this._onLocation.next(this);
	}

	@boundMethod
	_disconnect() {
		logger.info('user disconnected: %s', this.id);
		logger.info('\t# %s', this.name);
		this.client.broadcast.emit('left', this.id);
		logger.info('left broadcast emitted');
		this._onDisconnect.next(this);
	}

	onRegister() {
		return this._onRegister.asObservable();
	}

	onLocation() {
		return this._onLocation.asObservable();
	}

	onDisconnect() {
		return this._onDisconnect.asObservable();
	}

}
