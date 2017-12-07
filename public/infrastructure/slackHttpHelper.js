'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var postToSlackWebHook = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, text) {
    var slackWebHookUrl, botName, botIcon, channel, body;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _logger2.default.debug('querystring params', req.query);

            slackWebHookUrl = req.query.slackHook;
            botName = req.query.botName;
            botIcon = req.query.botIcon;
            channel = req.query.channel;
            body = {
              payload: {
                text: text
              }
            };


            if (botName) {
              body.payload.username = botName;
            }

            if (botIcon) {
              if (botIcon[0] === ':') {
                body.payload.icon_emoji = botIcon;
              } else {
                body.payload.icon_url = botIcon;
              }
            }

            if (channel) {
              body.payload.channel = channel;
            }

            _logger2.default.debug('POST-ing to "' + slackWebHookUrl + '"', encodeURIComponent(body));

            return _context.abrupt('return', _http2.default.post(slackWebHookUrl, body));

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function postToSlackWebHook(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

exports.default = {
  postToSlackWebHook: postToSlackWebHook
};