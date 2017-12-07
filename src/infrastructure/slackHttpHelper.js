import log from './logger';
import http from './http';

const postToSlackWebHook = async (req, text) => {
  const slackWebHookUrl = req.query.slackHook;
  const botName = req.query.botName;
  const botIcon = req.query.botIcon;
  const channel = req.query.channel;

  const body = {
    payload: {
      text,
    },
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

  log.debug(`POSTing to "${slackWebHookUrl}"`, encodeURIComponent(body));

  return http.post(slackWebHookUrl, encodeURIComponent(body));
};

export default {
  postToSlackWebHook,
};
