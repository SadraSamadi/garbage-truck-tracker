import {registerSelf} from './ioc';
import express from 'express';
import morgan from 'morgan';
import args from './args';

@registerSelf()
export default class Api {

	constructor() {
		this.exp = express();
	}

	init() {
		this.exp.set('port', args.port);
		this.exp.use(morgan('dev'));
		this.exp.use(express.json());
		this.exp.use(express.urlencoded({extended: false}));
		this.exp.get('/', ::this._index);
		return Promise.resolve();
	}

	_index(req, res) {
		res.end('Hello, World!');
	}

}
