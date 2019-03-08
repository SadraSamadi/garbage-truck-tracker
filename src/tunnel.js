import {registerSelf} from './ioc';
import localtunnel from 'localtunnel';
import util from 'util';
import args from './args';
import pkg from '../package';

@registerSelf()
export class Tunnel {

	constructor() {
		this._tunnel = null;
	}

	start() {
		let lt = util.promisify(localtunnel);
		return lt(args.port, {subdomain: pkg.name})
			.then(tunnel => this._tunnel = tunnel);
	}

	stop() {
		if (this._tunnel)
			this._tunnel.close();
		return Promise.resolve();
	}

}
