import {registerSelf} from './ioc';
import {boundMethod} from 'autobind-decorator';
import express from 'express';
import morgan from 'morgan';
import args from './args';

@registerSelf()
export class App {

	constructor() {
		this.expressApp = express();
	}

	init() {
		this.expressApp.set('port', args.port);
		this.expressApp.use(morgan('dev'));
		this.expressApp.use(express.json());
		this.expressApp.use(express.urlencoded({extended: false}));
		this.expressApp.get('/', this._index);
		return Promise.resolve();
	}

	@boundMethod
	_index(req, res) {
		res.end('Hello, World!');
	}

}
