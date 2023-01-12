import { injectManifest } from 'workbox-build';

injectManifest({
	globDirectory: 'dist/',
	globPatterns: [
		'**/*.js',
		'**/*.css',
		'**/*.svg'
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
})

// module.exports = { injectManifest }