'use strict';
const db = require('./lib/db');
const fnsDBCli = (input, flags) => {
	if (input) {
		switch (input) {
			case 'builddb':
				db.builddb();
                break;
			case 'find':
				db.find();
                break;
			case 'add':
				db.add();
                break;
			default:
				console.log('no input');
		}
	} else {
		console.error(`input not provided`);
	}
	// if (flags) {
	// 	console.log(flags)
	// } else {
	// 	console.error(`flags not present`);
	// }

}
module.exports = exports = fnsDBCli;
