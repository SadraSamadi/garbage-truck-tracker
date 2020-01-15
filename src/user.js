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
		this._onUpdate = new Subject();
		this._onDisconnect = new Subject();
	}

	init() {
		logger.info('user connected: %s', this.id);
		this.client.on('register', ::this._register);
		this.client.on('disconnect', ::this._disconnect);
		return Promise.resolve();
	}

	_register(name) {
		this.name = name;
		logger.info('user registered: %s', this.id);
		logger.info('\t# %s', this.name);
		this.client.broadcast.emit('added', {
			id: this.id,
			name: this.name
		});
		logger.info('user added broadcast emitted');
		this.client.on('update:location', ::this._update);
		this._onRegister.next(this);
	}

	_update(location) {
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
		this._onUpdate.next(this);
	}

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

	onUpdate() {
		return this._onUpdate.asObservable();
	}

	onDisconnect() {
		return this._onDisconnect.asObservable();
	}

}
