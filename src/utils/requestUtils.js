import url from 'url';

export const constructFullUrl = req =>
  url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: req.originalUrl,
  });

export const extractSlackWebHookOptions = req => ({
  slackHook: req.query.slackHook,
  botName: req.query.botName,
  botIcon: req.query.botIcon,
  channel: req.query.channel,
});
