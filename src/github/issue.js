import Slack from '../slack';

const sendToSlack = async (req, res, text) => {
  try {
    await Slack.sendToWebHook(req, text);

    res.status(200).send('Posted to Slack successfully');
  } catch (error) {
    const ex = new Error('Error occurred when attempting to POST the payload to Slack');
    ex.downstreamError = error;

    throw ex;
  }
};

const createIssueText = (phrases, body) =>
  `${phrases.emoji} *<${body.issue.html_url}|${phrases.headline} issue>*
  <${body.issue.user.html_url}|${body.issue.user.login}> ${phrases.action} issue #${body.issue.number} i <${
  body.repository.html_url
}|${body.repository.full_name}>`;

const processOpenedIssueEvent = async (req, res) => {
  const text = createIssueText({
    headline: 'Ny',
    action: 'åpnet',
    emoji: ':sparkles:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const processEditedIssueEvent = async (req, res) => {
  const text = createIssueText({
    headline: 'Endret',
    action: 'endret',
    emoji: ':nut_and_bolt:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const processClosedIssueEvent = async (req, res) => {
  const text = createIssueText({
    headline: 'Lukket',
    action: 'lukket',
    emoji: ':no_entry_sign:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const processReopenedIssueEvent = async (req, res) => {
  const text = createIssueText({
    headline: 'Gjenåpnet',
    action: 'gjenåpnet',
    emoji: ':recycle:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const processUnhandledIssueEvent = (req, res) => {
  res
    .status(406)
    .send(
      `I can't handle "${req.body.action}" actions for "${req.get('X-GitHub-Event')}" events :(`,
    );
};

const processIssueEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'opened':
      await processOpenedIssueEvent(req, res);
      break;
    case 'edited':
      await processEditedIssueEvent(req, res);
      break;
    case 'closed':
      await processClosedIssueEvent(req, res);
      break;
    case 'reopened':
      await processReopenedIssueEvent(req, res);
      break;
    default:
      processUnhandledIssueEvent(req, res);
      break;
  }
};

export default processIssueEvent;
