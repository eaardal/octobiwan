import SlackWebhook from 'slack-webhook';
import log from '../infrastructure/logger';

const sendToWebHook = async (content, options) => {
  const slackWebHookUrl = options.slackHook;
  const botName = options.botName;
  const botIcon = options.botIcon;
  const channel = options.channel;

  const body = {
    text: content.text || 'NO_TEXT_ERR',
    attachments: content.attachments || [],
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

  try {
    await slack.send(body);
  } catch (error) {
    const ex = new Error('Error occurred when attempting to POST the payload to Slack');
    ex.downstreamError = error;
    throw ex;
  }
};

export default {
  sendToWebHook,
};
