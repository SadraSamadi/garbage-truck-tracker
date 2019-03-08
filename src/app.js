import express from 'express';
import morgan from 'morgan';
import {boundMethod} from 'autobind-decorator';
import args from './args';

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
	}

	@boundMethod
	_index(req, res) {
		res.end('Hello, World!');
	}

}

const app = new App();

app.init();

export default app;
