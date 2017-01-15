'use strict';
const path = require('path');
const dbPath = path.resolve(process.env.DB_PATH || '/data/db/', process.env.DB_NAME || 'fnsdb.json');
const low = require('lowdb');

const db = low(dbPath);
const buildDB = require('./build-db');
const url = require('url');
/** Model example
 * {
      "site": "Zero Hedge",
      "category": "conspiracy  ",
      "Google hits": "2,740,000",
      "FB likes": "14,833",
      "Twitter ": "373,000",
      "political alignment?": "",
      "URL": "http://www.zerohedge.com/",
      "Notes": ""
    }
 */

exports.builddb = () => {
	// console.log('build db');
	buildDB();
}

exports.find = (URL) => {
	// console.log(`find ${URL}`);
	let hostName = url.parse(URL).hostname;
	let site;
	// console.log(db.get('sites.data').size().value());
	site = db.get('sites.data')
		// .find({
		// 	URL: URL
		// })
		.find(function (s, i) {
			if(s.URL.indexOf(hostName) > -1){
				return s;
			}
		})
		.value();

	console.log(site || 'not found');
	return site;
}

exports.add = (url) => {
	console.log(`add ${url}`);
}
exports.getFirst = () =>{
	return db.get('sites').first().value();
}
exports.getLast = () =>{
	return db.get('sites').last().value();
}
