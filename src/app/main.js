import 'babel-polyfill';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import Logger from '../infrastructure/logger';
import githubRouter from '../github/githubRouter';
import slackRouter from '../slack/slackRouter';

const app = express();
const PORT = process.env.PORT || 8123;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send(
    `<h1><a href="https://github.com/eaardal/octobiwan">This is the API you're looking for</a></h1>
    <img src="https://octodex.github.com/images/octobiwan.jpg" alt="octobiwan" height="300">`,
  );
});

app.use('/github', githubRouter);
app.use('/slack', slackRouter);

app.listen(PORT, () => {
  Logger.info("This is the api you're looking for", { port: PORT });
});
