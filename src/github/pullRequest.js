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
  `${phrases.emoji} *<${body.pull_request.html_url}|${phrases.headline} pull request>*
  <${body.pull_request.user.html_url}|${body.pull_request.user.login}> ${phrases.action} pull request #${body.pull_request.number} i <${
  body.repository.html_url}|${body.repository.full_name}>`;

const createClosedPullRequestText = (phrases, body) =>
  `${phrases.emoji} *<${body.pull_request.html_url}|${phrases.headline}>*
  <${body.pull_request.user.html_url}|${body.pull_request.user.login}> ${phrases.action}`;

const processOpenedPullRequestEvent = async (req, res) => {
  const text = createIssueText({
    headline: 'Ny pull request',
    action: 'åpnet pull request',
    emoji: ':sparkles:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const processEditedPullRequestEvent = async (req, res) => {
  const text = createIssueText({
    headline: 'Oppdatert pull request',
    action: 'oppdaterte pull request',
    emoji: ':nut_and_bolt:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const processClosedPullRequestEvent = async (req, res) => {
  const { title, merged, base } = req.body.pull_request;

  const text = createClosedPullRequestText({
    headline: merged ? 'Merget pull request' : 'Lukket pull request',
    action: merged ? `merget pull request "${title}" inn i ${base.ref}` : 'lukket pull request',
    emoji: merged ? ':white_check_mark:' : ':no_entry_sign:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const processReopenedPullRequestEvent = async (req, res) => {
  const text = createIssueText({
    headline: 'Gjenåpnet',
    action: 'gjenåpnet',
    emoji: ':recycle:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const processUnhandledPullRequestEvent = (req, res) => {
  res
    .status(406)
    .send(
      `I can't handle "${req.body.action}" actions for "${req.get('X-GitHub-Event')}" events :(`,
    );
};

const processPullRequestEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'opened':
      await processOpenedPullRequestEvent(req, res);
      break;
    case 'edited':
      await processEditedPullRequestEvent(req, res);
      break;
    case 'closed':
      await processClosedPullRequestEvent(req, res);
      break;
    case 'reopened':
      await processReopenedPullRequestEvent(req, res);
      break;
    default:
      processUnhandledPullRequestEvent(req, res);
      break;
  }
};

export default processPullRequestEvent;
