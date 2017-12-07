import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Logger from '../infrastructure/logger';
import gheRouter from '../ghe/gheRouter';

const app = express();
const PORT = process.env.port || 8123;

app.use(morgan('dev'));
app.use(bodyParser.json());

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
// };

// app.use(cors(corsOptions));

app.get('/ping', (req, res) => {
  res.send('Pong!');
});

app.use('/ghe', gheRouter);

app.listen(PORT, () => {
  Logger.info('This is the api you\'re looking for', { port: PORT });
});
