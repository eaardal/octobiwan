import Slack, { constructIssueText } from '../slack';
import { processUnhandledEvent } from './common';

const openedIssue = async (req, res) => {
  const text = constructIssueText({
    headline: 'Ny',
    action: 'åpnet',
    emoji: ':sparkles:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const editedIssue = async (req, res) => {
  const text = constructIssueText({
    headline: 'Endret',
    action: 'endret',
    emoji: ':nut_and_bolt:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const closedIssue = async (req, res) => {
  const text = constructIssueText({
    headline: 'Lukket',
    action: 'lukket',
    emoji: ':no_entry_sign:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const reopenedIssue = async (req, res) => {
  const text = constructIssueText({
    headline: 'Gjenåpnet',
    action: 'gjenåpnet',
    emoji: ':recycle:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const processIssueEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'opened':
      await openedIssue(req, res);
      break;
    case 'edited':
      await editedIssue(req, res);
      break;
    case 'closed':
      await closedIssue(req, res);
      break;
    case 'reopened':
      await reopenedIssue(req, res);
      break;
    default:
      processUnhandledEvent(req, res);
      break;
  }
};

export default processIssueEvent;
