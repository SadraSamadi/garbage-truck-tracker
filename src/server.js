import http from 'http';
import devip from 'dev-ip';
import {registerSelf} from './ioc';
import Api from './api';
import args from './args';

@registerSelf([Api])
export default class Server {

	constructor(api) {
		this._api = api;
		this.http = null;
	}

	start() {
		return this._api.init()
			.then(() => new Promise(resolve => {
				this.http = http.createServer(this._api.exp);
				this.http.listen(args.port, () => {
					let ips = devip();
					ips.push('127.0.0.1');
					resolve(ips);
				});
			}));
	}

	stop() {
		return new Promise((resolve, reject) => {
			if (!this.http.listening)
				return resolve();
			this.http.close(err => {
				if (err)
					reject(err);
				else
					resolve();
			});
		});
	}

}
