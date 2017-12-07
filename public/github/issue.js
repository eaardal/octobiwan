'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slackHttpHelper = require('../infrastructure/slackHttpHelper');

var _slackHttpHelper2 = _interopRequireDefault(_slackHttpHelper);

var _logger = require('../infrastructure/logger');

var _logger2 = _interopRequireDefault(_logger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var slackifyOpenedIssue = function slackifyOpenedIssue(body) {
  return ':sparkles: *<' + body.issue.url + '|Ny issue>*\n  <' + body.issue.user.url + '|' + body.issue.user.login + '> \xE5pnet issue #' + body.issue.number + ' i <' + body.issue.repository_url + '|' + body.repository.name + '>';
};

var processOpenedIssueEvent = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var formattedText, response;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            formattedText = slackifyOpenedIssue(req.body);
            _context.prev = 1;
            _context.next = 4;
            return _slackHttpHelper2.default.postToSlackWebHook(req, formattedText);

          case 4:
            response = _context.sent;


            if (response.status === 200) {
              res.status(200).send('Posted to Slack successfully');
            } else {
              res.status(response.status).json(response);
            }
            _context.next = 12;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context['catch'](1);

            _logger2.default.error('Failed POSTing to Slack', _context.t0);

            res.status(_context.t0.status).json({
              downstreamError: _context.t0,
              message: 'Error occurred when attempting to POST the payload to Slack'
            });

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[1, 8]]);
  }));

  return function processOpenedIssueEvent(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var processUnhandledIssueEvent = function processUnhandledIssueEvent(req, res) {
  res.status(406).send('I can\'t handle "' + req.body.action + '" actions for "' + req.get('X-GitHub-Event') + '" events :(');
};

var processIssueEvent = function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
    var action;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            action = req.body.action;
            _context2.t0 = action;
            _context2.next = _context2.t0 === 'opened' ? 4 : 7;
            break;

          case 4:
            _context2.next = 6;
            return processOpenedIssueEvent(req, res);

          case 6:
            return _context2.abrupt('break', 9);

          case 7:
            processUnhandledIssueEvent(req, res);
            return _context2.abrupt('break', 9);

          case 9:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function processIssueEvent(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.default = processIssueEvent;