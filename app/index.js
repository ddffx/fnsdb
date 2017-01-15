'use strict';
const db = require('./lib/db');
const fnsDBCli = (input, flags) => {
	if (input) {
		switch (input) {
			case 'builddb':
				db.builddb();
                break;
			case 'find':
				let url = flags.url || 'NOT PRESENT';
				db.find(url);
                break;
			case 'add':
				db.add();
                break;
			case 'get-first':
				db.getFirst();
                break;
			case 'get-last':
				db.getLast();
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
