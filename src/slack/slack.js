import SlackWebhook from 'slack-webhook';
import log from '../infrastructure/logger';

const sendToWebHook = async (req, res, text) => {
  const slackWebHookUrl = req.query.slackHook;
  const botName = req.query.botName;
  const botIcon = req.query.botIcon;
  const channel = req.query.channel;

  const body = {
    text,
    attachments: [
      {
        text: 'Behandle pull request',
        fallback: 'Gå på GitHub for å behandle pull requesten',
        // callback_id: 'review_pull_request',
        // color: '#3AA3E3',
        // attachment_type: 'default',
        actions: [
          {
            name: 'pr_action',
            text: 'Start review',
            type: 'button',
            value: 'start_pull_request_review',
            style: 'primary',
          },
          {
            name: 'pr_action',
            text: ':heavy_check_mark: Godkjenn',
            type: 'button',
            value: 'approve_pull_request',
            style: 'good',
          },
          {
            name: 'pr_action',
            text: 'Avslå',
            type: 'button',
            // value: 'reject_pull_request',
            url: 'https://www.vg.no',
            style: 'danger',
          },
        ],
      },
    ],
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
    await slack.send(text);
    res.status(200).send('Posted to Slack successfully');
  } catch (error) {
    const ex = new Error('Error occurred when attempting to POST the payload to Slack');
    ex.downstreamError = error;
    throw ex;
  }
};

export default {
  sendToWebHook,
};
