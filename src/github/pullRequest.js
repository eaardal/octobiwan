import Slack, { constructClosedPullRequestText, constructPullRequestText } from '../slack';
import { processUnhandledEvent } from './common';

const openedPullRequest = async (req, res) => {
  const text = constructPullRequestText({
    headline: 'Ny',
    action: 'åpnet',
    emoji: ':sparkles:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const editedPullRequest = async (req, res) => {
  const text = constructPullRequestText({
    headline: 'Oppdatert',
    action: 'oppdaterte',
    emoji: ':nut_and_bolt:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const closedPullRequest = async (req, res) => {
  const { title, merged, base } = req.body.pull_request;

  const text = constructClosedPullRequestText({
    headline: merged ? 'Merget pull request' : 'Lukket pull request',
    action: merged ? `merget pull request "${title}" inn i ${base.ref}` : 'lukket pull request',
    emoji: merged ? ':white_check_mark:' : ':no_entry_sign:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const reopenedPullRequest = async (req, res) => {
  const text = constructPullRequestText({
    headline: 'Gjenåpnet',
    action: 'gjenåpnet',
    emoji: ':recycle:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const processPullRequestEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'opened':
      await openedPullRequest(req, res);
      break;
    case 'edited':
      await editedPullRequest(req, res);
      break;
    case 'closed':
      await closedPullRequest(req, res);
      break;
    case 'reopened':
      await reopenedPullRequest(req, res);
      break;
    default:
      processUnhandledEvent(req, res);
      break;
  }
};

export default processPullRequestEvent;
