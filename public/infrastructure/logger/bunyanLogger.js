'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _bunyan = require('bunyan');

var _bunyan2 = _interopRequireDefault(_bunyan);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function MyRawStream() {}
MyRawStream.prototype.write = function (rec) {
  var data = _extends({}, rec);
  delete data.name;
  delete data.pid;
  delete data.msg;
  delete data.time;
  delete data.v;
  delete data.level;
  delete data.hostname;

  // eslint-disable-next-line
  console.log('[%s] %s: %s. %s', rec.time.toISOString(), _bunyan2.default.nameFromLevel[rec.level], rec.msg, JSON.stringify(data));
};

var logger = _bunyan2.default.createLogger({
  name: 'octobiwan',
  streams: [{
    level: 'debug',
    stream: new MyRawStream(),
    type: 'raw'
  }]
});

logger.level('debug');

exports.default = logger;