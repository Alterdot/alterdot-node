'use strict';

var createError = require('errno').create;

var AlterdotNodeError = createError('AlterdotNodeError');

var RPCError = createError('RPCError', AlterdotNodeError);

module.exports = {
  Error: AlterdotNodeError,
  RPCError: RPCError
};
