'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _requestUtils = require('../utils/requestUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var asyncMiddleware = function asyncMiddleware(fn) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(function (err) {
      _logger2.default.error('Request to ' + (0, _requestUtils.constructFullUrl)(req) + ' failed', err);
      next(err);
    });
  };
};

var createRouter = function createRouter() {
  return {
    router: _express2.default.Router(),
    execute: asyncMiddleware
  };
};

exports.default = createRouter;