'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var post = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(url, body) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (resolve, reject) {
              var headers = {
                'Content-Type': 'application/json'
              };

              var options = {
                url: url,
                headers: headers,
                method: 'POST',
                body: body
              };

              _logger2.default.debug('Making POST request', options);

              (0, _request2.default)(options, function (error, response, responseBody) {
                _logger2.default.debug('POST Response', { error: error, response: response, body: responseBody });

                var status = response && response.statusCode ? response.statusCode : 502;

                if (status >= 200 && status < 400) {
                  resolve({ status: status, response: response });
                } else {
                  reject({ status: status, error: error, response: response });
                }
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function post(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = {
  post: post
};