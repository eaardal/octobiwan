/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */

import bunyan from 'bunyan';

const LOG_LEVEL = 'info';

class ConsoleLogTextStream {
  write(rec) {
    const time = rec.time.toISOString();
    const msg = rec.msg;

    const data = {
      ...rec,
    };

    // Deleting bunyan properties so that only custom log message properties are printed
    delete data.name;
    delete data.pid;
    delete data.msg;
    delete data.time;
    delete data.v;
    delete data.level;
    delete data.hostname;

    console.log(
      '[%s] %s: %s. %s',
      time,
      bunyan.nameFromLevel[rec.level],
      msg,
      JSON.stringify(data),
    );
  }
}

const logger = bunyan.createLogger({
  name: 'octobiwan',
});

// Can't pipe logs to bunyan (in package.json) when using Heroku, so have to format logs to text
// manually to get understandable logging
if (process.env.NODE_ENV === 'production') {
  logger.streams = [
    {
      level: LOG_LEVEL,
      stream: new ConsoleLogTextStream(),
      type: 'raw',
    },
  ];
}

logger.level(LOG_LEVEL);

export default logger;
