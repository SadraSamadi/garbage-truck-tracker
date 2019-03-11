module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			['@babel/preset-env', {useBuiltIns: 'usage'}]
		],
		plugins: [
			['@babel/plugin-transform-runtime'],
			['@babel/plugin-proposal-decorators', {legacy: true}],
			['@babel/plugin-proposal-class-properties', {loose: true}],
			['@babel/plugin-proposal-private-methods', {loose: true}],
			['@babel/plugin-proposal-function-bind'],
			['@babel/plugin-proposal-optional-chaining'],
			['@babel/plugin-proposal-nullish-coalescing-operator'],
			['@babel/plugin-proposal-numeric-separator']
		]
	};
};
