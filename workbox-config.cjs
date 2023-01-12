
module.exports = {
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.{js,css,html,svg}'
	],
	swDest: 'dist/sw.js',
	swSrc: 'src/sw-template.js',
	/*
	Se usa en la configuración predeterminada
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	*/
};