'use strict';
const fetch = require('node-fetch');
const csv = require('csv-parser');
const path = require('path');
const dbPath = path.resolve(process.env.DB_PATH || '/data/db/', process.env.DB_NAME || 'fnsdb.json');
const low = require('lowdb');
// console.log(dbPath);
const db = low(dbPath);
const db_state = {
	sites: {
		data: [],
		lastUpdated: ''
	}
};

// const data_src = [{
// 	url: '',
// 	dataType: 'json'
// }, {
// 	url: 'https://docs.google.com/spreadsheets/d/1xDDmbr54qzzG8wUrRdxQl_C1dixJSIYqQUaXVZBqsJs/export?format=csv',
// 	dataType: 'csv'
// }]
const data_url = 'https://docs.google.com/spreadsheets/d/1xDDmbr54qzzG8wUrRdxQl_C1dixJSIYqQUaXVZBqsJs/export?format=csv'

const initDB = () => {

	db.defaults(db_state).value();
}
const dbExists = () => {
	if (db.has('sites').value()) {
		// console.log(db.get('sites.data').size().value());
		return true;
	}
	return false;
}

if (!dbExists()) {
	// console.log(`db not found, creating at ${dbPath}`);
	initDB();
} else{
	// console.log(`db found at ${dbPath}`);
}
module.exports = exports = () => {

	console.log('Dropping / deleting old database');
	db.setState(db_state); // drop old one if it is there


	console.log('downloading db');
	fetch(data_url)
		.then((res) => {
			console.log(res.headers.get('content-type'));
			// console.log(res.body);
			let parse = csv({
				headers: ['site', 'category', 'Google hits', 'FB likes', 'Twitter ', 'political alignment?', 'URL', 'Notes']
			});
			res.body.pipe(parse)
				.on('headers', function (headerList) {
					console.log('First header: %s', headerList[0])
					headerList[0] = 'site';
				})
				.on('data', function (data) {
					if (data.Notes.indexOf('data retrieved') > -1) {
						let lastUpdated = data.Notes.split('data retrieved')[1];
						db.set('sites.lastUpdated', lastUpdated)
							.value()
					} else {
						if (data.URL !== 'URL') {
							db.get('sites.data')
								.push(data)
								.value();
						}
					}


				})
				.on('end', function () {
					let records = db.get('sites.data').size().value();
					let lastUpdated = db.get('sites.lastUpdated').value();
					console.log(`${records} records added`);
					console.log(`Remote was last updated on: ${lastUpdated} `);

				})
				.on('error', function (err) {
					console.log(err);
				})
		})
		.catch((err) => {
			console.log(err);
		})
}
