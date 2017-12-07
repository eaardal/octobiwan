import bunyan from 'bunyan';

function MyRawStream() {}
MyRawStream.prototype.write = (rec) => {
  const data = {
    ...rec,
  };
  delete data.name;
  delete data.pid;
  delete data.msg;
  delete data.time;
  delete data.v;
  delete data.level;
  delete data.hostname;

  // eslint-disable-next-line
  console.log(
    '[%s] %s: %s. %s',
    rec.time.toISOString(),
    bunyan.nameFromLevel[rec.level],
    rec.msg,
    JSON.stringify(data),
  );
};

const logger = bunyan.createLogger({
  name: 'octobiwan',
  streams: [
    {
      level: 'debug',
      stream: new MyRawStream(),
      type: 'raw',
    },
  ],
});

logger.level('debug');

export default logger;
