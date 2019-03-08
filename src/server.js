import {register} from './ioc';
import {boundMethod} from 'autobind-decorator';
import {APP} from './app';
import http from 'http';
import devip from 'dev-ip';
import args from './args';

export const SERVER = Symbol.for('SERVER');

@register(SERVER, [
	APP
])
export class Server {

	constructor(app) {
		this._app = app;
		this.httpServer = null;
	}

	@boundMethod
	start() {
		return this._app.init()
			.then(() => new Promise(resolve => {
				this.httpServer = http.createServer(this._app.expressApp);
				this.httpServer.listen(args.port, args.host, () => {
					let ips = devip();
					let address = this.httpServer.address();
					ips.push(address.address);
					resolve(ips);
				});
			}));
	}

	@boundMethod
	stop() {
		return new Promise((resolve, reject) => {
			if (!this.httpServer.listening)
				return resolve();
			this.httpServer.close(err => {
				if (err)
					reject(err);
				else
					resolve();
			});
		});
	}

}
