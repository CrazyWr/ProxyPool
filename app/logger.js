'use strict';

import log4js from 'koa-log4';
import path from 'path';

const log4js_config = require('../log4js.json');
log4js.configure(log4js_config, {cwd: path.join(__dirname, '../logs')});

const error = log4js.getLogger('error');
const api = log4js.getLogger('api');
const out = log4js.getLogger('default');
const task = log4js.getLogger('task');

export default {
  error,
  api,
  out,
  task
}