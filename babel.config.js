module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			[
				'@babel/preset-env',
				{
					useBuiltIns: 'usage'
				}
			]
		],
		plugins: [
			[
				'@babel/plugin-transform-runtime'
			],
			[
				'@babel/plugin-proposal-decorators',
				{
					legacy: true
				}
			]
		]
	};
};
