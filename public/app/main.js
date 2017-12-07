'use strict';

require('babel-polyfill');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _logger = require('../infrastructure/logger');

var _logger2 = _interopRequireDefault(_logger);

var _gheRouter = require('../ghe/gheRouter');

var _gheRouter2 = _interopRequireDefault(_gheRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cors from 'cors';
var app = (0, _express2.default)();
var PORT = process.env.port || 8123;

app.use((0, _morgan2.default)('dev'));
app.use(_bodyParser2.default.json());

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

app.get('/ping', function (req, res) {
  res.send('Pong!');
});

app.use('/ghe', _gheRouter2.default);

app.listen(PORT, function () {
  _logger2.default.info("This is the api you're looking for", { port: PORT });
});