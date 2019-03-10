import {registerSelf} from './ioc';
import {App} from './app';
import http from 'http';
import devip from 'dev-ip';
import args from './args';

@registerSelf([App])
export class Server {

	constructor(app) {
		this.app = app;
		this.httpServer = null;
	}

	start() {
		return this.app.init()
			.then(() => new Promise(resolve => {
				this.httpServer = http.createServer(this.app.expressApp);
				this.httpServer.listen(args.port, () => {
					let ips = devip();
					ips.push('127.0.0.1');
					resolve(ips);
				});
			}));
	}

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
