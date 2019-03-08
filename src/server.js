import http from 'http';
import app from './app';
import {boundMethod} from 'autobind-decorator';
import devip from 'dev-ip';
import args from './args';

export class Server {

	constructor() {
		this.httpServer = http.createServer(app.expressApp);
	}

	@boundMethod
	start() {
		return new Promise(resolve => {
			this.httpServer.listen(args.port, args.host, () => {
				let ips = devip();
				let address = this.httpServer.address();
				ips.push(address.address);
				resolve(ips);
			});
		});
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

export default new Server();
