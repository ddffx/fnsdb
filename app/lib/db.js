'use strict';
const buildDB = require('./build-db');
exports.builddb = () => {
	// console.log('build db');
    buildDB();
}

exports.find = (url) => {
	console.log(`find ${url}`);
}

exports.add = (url) => {
	console.log(`add ${url}`);
}
