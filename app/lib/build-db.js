'use strict';
const fetch = require('node-fetch');
const csv = require('csv-parser');
const path = require('path');
const dbPath = path.resolve('/data/db/fnsdb.json');
const low = require('lowdb');

const db = low(dbPath);

db.defaults({
    sites:[]
}).value();
const data_src = [{
	url: '',
	dataType: 'json'
}, {
	url: 'https://docs.google.com/spreadsheets/d/1xDDmbr54qzzG8wUrRdxQl_C1dixJSIYqQUaXVZBqsJs/export?format=csv',
	dataType: 'csv'
}]
const data_url = 'https://docs.google.com/spreadsheets/d/1xDDmbr54qzzG8wUrRdxQl_C1dixJSIYqQUaXVZBqsJs/export?format=csv'


module.exports = exports = () => {
	console.log('downloading db');
	fetch(data_url)
		.then((res) => {
			// console.log(res.headers.get('content-type'));
			
			let parse = csv({
				headers: ['site', 'category', 'Google hits', 'FB likes', 'Twitter ', 'political alignment?', 'URL', 'Notes']
			});
			res.body.pipe(parse)
				.on('headers', function (headerList) {
					console.log('First header: %s', headerList[0])
					headerList[0] = 'site';
				})
				.on('data', function (data) {
                    db.get('sites')
                    .push(data)
                    .value();
				})
                .on('end', function(){
                    let records = db.get('sites').size().value()
                    console.log(`${records} records added`);
                    
                })
		})
		.catch((err) => {
			console.log(err);
		})
}
