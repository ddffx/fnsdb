#!/usr/bin/env node
'use strict';
const meow = require('meow');
const fnsdbCli = require('.');

const cli = meow(`
    Usage
    $ fnsdb find --url http://www.cnn.com
    $ fnsdb add --url http://100percentfedup.com

    Options
      --url url from the db
`)

fnsdbCli(cli.input[0], cli.flags);
