const fs = require('fs')

let proxy = {}
fs.readdirSync(__dirname)
	.some(filename => {
		if (filename !== 'index.js') {
			proxy = Object.assign(proxy, require('./' + filename))
		}
	})
module.exports = proxy;
