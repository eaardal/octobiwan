import Slack from '../slack';
import GitHubTextBuilder from '../utils/GitHubTextBuilder';
import { processUnhandledEvent } from './common';
import { extractSlackWebHookOptions } from '../utils/requestUtils';

const openedIssue = async (req) => {
  const text = GitHubTextBuilder.buildIssueText(
    {
      headline: 'Ny issue',
      description: 'åpnet issue',
      emoji: ':sparkles:',
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
};

const editedIssue = async (req) => {
  const text = GitHubTextBuilder.buildIssueText(
    {
      headline: 'Endret issue',
      description: 'endret issue',
      emoji: ':nut_and_bolt:',
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
};

const closedIssue = async (req) => {
  const text = GitHubTextBuilder.buildIssueText(
    {
      headline: 'Lukket issue',
      description: 'lukket issue',
      emoji: ':no_entry_sign:',
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
};

const reopenedIssue = async (req) => {
  const text = GitHubTextBuilder.buildIssueText(
    {
      headline: 'Gjenåpnet issue',
      description: 'gjenåpnet issue',
      emoji: ':recycle:',
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
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

  res.status(200).send('Posted to Slack successfully');
};

export default processIssueEvent;
