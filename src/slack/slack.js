import SlackWebhook from 'slack-webhook';
import log from '../infrastructure/logger';

const sendToWebHook = async (req, text) => {
  const slackWebHookUrl = req.query.slackHook;
  const botName = req.query.botName;
  const botIcon = req.query.botIcon;
  const channel = req.query.channel;

  const body = {
    text,
  };

  if (botName) {
    body.username = botName;
  }

  if (botIcon) {
    if (botIcon[0] === ':') {
      body.icon_emoji = botIcon;
    } else {
      body.icon_url = botIcon;
    }
  }

  if (channel) {
    body.channel = channel;
  }

  log.debug(`POSTing to "${slackWebHookUrl}"`, body);


  const slack = new SlackWebhook(slackWebHookUrl);

  return slack.send(body);
};

export default {
  sendToWebHook,
};
