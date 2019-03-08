import yargs from 'yargs';

export default yargs
	.option('host', {
		alias: 'h',
		type: 'string',
		default: process.env.HOST || '127.0.0.1'
	})
	.option('port', {
		alias: 'p',
		type: 'number',
		default: parseInt(process.env.PORT) || 3000
	})
	.option('socket', {
		alias: 's',
		type: 'boolean',
		default: true
	})
	.option('tunnel', {
		alias: 't',
		type: 'boolean',
		default: false
	})
	.parse();
