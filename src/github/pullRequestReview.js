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
  `${phrases.emoji} *<${body.pull_request.html_url}|${phrases.headline}>*
  <${body.pull_request.user.html_url}|${body.pull_request.user.login}> ${phrases.action} #${body.pull_request.number} i <${
  body.repository.html_url}|${body.repository.full_name}>`;

const submittedPullRequestReview = async (req, res) => {
  const text = createIssueText({
    headline: 'Kommenterte på pull request',
    action: 'kommenterte på pull request',
    emoji: ':sparkles:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const editedPullRequestReview = async (req, res) => {
  const text = createIssueText({
    headline: 'Oppdaterte kommentaren på pull request',
    action: 'oppdaterte kommentaren på pull request',
    emoji: ':nut_and_bolt:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const dismissedPullRequestReview = async (req, res) => {
  const text = createIssueText({
    headline: 'Avsluttet pull request review',
    action: 'avsluttet pull request review',
    emoji: ':no_entry_sign:',
  }, req.body);

  await sendToSlack(req, res, text);
};

const processUnhandledPullRequestReviewEvent = (req, res) => {
  res
    .status(406)
    .send(
      `I can't handle "${req.body.action}" actions for "${req.get('X-GitHub-Event')}" events :(`,
    );
};

const processPullRequestReviewEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'submitted':
      await submittedPullRequestReview(req, res);
      break;
    case 'edited':
      await editedPullRequestReview(req, res);
      break;
    case 'dismissed':
      await dismissedPullRequestReview(req, res);
      break;
    default:
      processUnhandledPullRequestReviewEvent(req, res);
      break;
  }
};

export default processPullRequestReviewEvent;
