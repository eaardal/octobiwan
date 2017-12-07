'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _routerFactory = require('../infrastructure/routerFactory');

var _routerFactory2 = _interopRequireDefault(_routerFactory);

var _logger = require('../infrastructure/logger');

var _logger2 = _interopRequireDefault(_logger);

var _issue = require('./issue');

var _issue2 = _interopRequireDefault(_issue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _createRouter = (0, _routerFactory2.default)(),
    router = _createRouter.router,
    execute = _createRouter.execute;

var processUnhandledEvent = function processUnhandledEvent(req, res) {
  res.status(406).send('I can\'t handle "' + req.get('X-GitHub-Event') + '" events :(');
};

router.post('/hook', execute(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
    var eventType;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (req.query.slackHook) {
              _context.next = 3;
              break;
            }

            res.status(400).send('Querystring parameter "slackHook" is required. It should be set to Webhook URL as provided in the Setup Instructions when configuring a new Incoming WebHook integration in Slack.');
            return _context.abrupt('return');

          case 3:
            eventType = req.get('X-GitHub-Event');
            _context.prev = 4;
            _context.t0 = eventType;
            _context.next = _context.t0 === 'issues' ? 8 : 11;
            break;

          case 8:
            _context.next = 10;
            return (0, _issue2.default)(req, res);

          case 10:
            return _context.abrupt('break', 13);

          case 11:
            processUnhandledEvent(req, res);
            return _context.abrupt('break', 13);

          case 13:
            _context.next = 19;
            break;

          case 15:
            _context.prev = 15;
            _context.t1 = _context['catch'](4);

            _logger2.default.error('Error occurred', _context.t1);

            res.status(500).json({ error: _context.t1 || 'Unknown error' });

          case 19:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[4, 15]]);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}()));

exports.default = router;