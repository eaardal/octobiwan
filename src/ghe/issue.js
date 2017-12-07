import SlackHttpHelper from '../infrastructure/slackHttpHelper';
import log from '../infrastructure/logger';

const slackifyOpenedIssue = body =>
  `:sparkles: *<${body.issue.url}|Ny issue>*
  <${body.issue.user.url}|${body.issue.user.login}> åpnet issue #${body.issue.number} i <${body.issue.repository_url}|${body.repository.name}>`
  ;

const processOpenedIssueEvent = async (req, res) => {
  log.debug('processing opened issue event');

  const formattedText = slackifyOpenedIssue(req.body);
  log.debug('formatted text', formattedText);

  try {
    const response = await SlackHttpHelper.postToSlackWebHook(req, formattedText);
    log.debug('received response from Slack', response);

    if (response.status === 200) {
      res.status(200).send('Posted to Slack successfully');
    } else {
      res.status(response.status).json(response);
    }
  } catch (error) {
    log.error('Failed POST-ing to Slack', error);

    res.status(error.status).json({
      downstreamError: error.error,
      message: 'Error occurred when attempting to POST the payload to Slack',
    });
  }
};

const processUnhandledIssueEvent = (req, res) => {
  res.status(406).send(`I can't handle "${req.body.action}" actions for "${req.get('X-GitHub-Event')}" events :(`);
};

const processIssueEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'opened':
      await processOpenedIssueEvent(req, res);
      break;
    default:
      processUnhandledIssueEvent(req, res);
      break;
  }
};

export default processIssueEvent;
