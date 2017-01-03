#!/usr/bin/env node
'use strict';
const meow = require('meow');
const fnsdbCli = require('.');

const cli = meow(`
    Usage

    Build the database
    $ cli builddb

    Find a specific url
    $ fnsdb find --url http://www.cnn.com
    
    Add a single url
    $ fnsdb add --url http://100percentfedup.com

    Options
      --url url from the db
`)

fnsdbCli(cli.input[0], cli.flags);
