'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bunyanLogger = require('./bunyanLogger');

var _bunyanLogger2 = _interopRequireDefault(_bunyanLogger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bunyanLog = function bunyanLog(level, message, data) {
  if (data) {
    _bunyanLogger2.default[level](data, message);
  } else {
    _bunyanLogger2.default[level](message);
  }
};

var Logger = function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, null, [{
    key: 'debug',

    /**
     * Log verbose information for debug or tracing purposes
     * @param {String} message The info message to log
     * @param {Object} data Optional extra data to log with the info message
     */
    value: function debug(message, data) {
      bunyanLog('debug', message, data);
    }

    /**
     * Log information about user actions and important events etc
     * @param {String} message The warning message to log
     * @param {Object} data Optional extra data to log with the warning message
     */

  }, {
    key: 'info',
    value: function info(message, data) {
      bunyanLog('info', message, data);
    }

    /**
     * Log important deviations or unexpected events which should be fixed but are not critical
     * @param {String} message The text message to log
     * @param {Object} data Optional extra data to log with the message
     */

  }, {
    key: 'warning',
    value: function warning(message, data) {
      bunyanLog('warning', message, data);
    }

    /**
     * Log errors that made the current request or workflow fail
     * @param {String} message The error message to log
     * @param {Object} data Optional extra data to log with the error message
     */

  }, {
    key: 'error',
    value: function error(message, data) {
      bunyanLog('error', message, data);
    }

    /**
     * Log critical errors tha made the application fail and not recover
     * @param {String} message The fatal error message
     * @param {Object} data Optional extra data to log with the fatal error message
     */

  }, {
    key: 'fatal',
    value: function fatal(message, data) {
      bunyanLog('fatal', message, data);
    }
  }]);

  return Logger;
}();

exports.default = Logger;