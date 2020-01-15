import util from 'util';
import localtunnel from 'localtunnel';
import {registerSelf} from './ioc';
import pkg from '../package';
import args from './args';

@registerSelf()
export default class Tunnel {

	constructor() {
		this._tunnel = null;
	}

	start() {
		let lt = util.promisify(localtunnel);
		return lt({port: args.port, subdomain: pkg.name})
			.then(tunnel => this._tunnel = tunnel);
	}

	stop() {
		this._tunnel?.close();
		return Promise.resolve();
	}

}
