'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructFullUrl = undefined;

var _url = require('url');

var _url2 = _interopRequireDefault(_url);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var constructFullUrl = exports.constructFullUrl = function constructFullUrl(req) {
  return _url2.default.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl
  });
};