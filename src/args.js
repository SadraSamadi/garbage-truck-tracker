import yargs from 'yargs';

export default yargs
	.option('port', {
		alias: 'p',
		type: 'number',
		default: parseInt(process.env.PORT) || 3000,
		description: 'server port number.'
	})
	.option('socket', {
		alias: 's',
		type: 'boolean',
		default: true,
		description: 'should enable socket server or not'
	})
	.option('tunnel', {
		alias: 't',
		type: 'boolean',
		default: false,
		description: 'should enable tunnel for remote access or not'
	})
	.option('log-deps', {
		alias: 'l',
		type: 'boolean',
		default: false,
		description: 'show dependency injection graph'
	})
	.parse();
