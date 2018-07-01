import Slack from '../slack';
import GitHubTextBuilder from '../utils/GitHubTextBuilder';
import { processUnhandledEvent } from './common';
import { extractSlackWebHookOptions } from '../utils/requestUtils';

const openedPullRequest = async (req) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestText(
    {
      headline: 'Ny pull request',
      description: `opprettet pull requesten <${html_url}|${title}>`,
      emoji: ':sparkles:',
    },
    req.body,
  );

  const attachments = [
    {
      text: 'Behandle pull request',
      fallback: 'Gå på GitHub for å behandle pull requesten',
      callback_id: 'pull_request_review_action',
      actions: [
        {
          name: 'pr_action',
          text: ':eyes: Start review',
          type: 'button',
          style: 'primary',
          value: 'start_pull_request_review',
        },
      ],
    },
  ];

  const content = { text, attachments };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
};

const editedPullRequest = async (req) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestText(
    {
      headline: 'Oppdatert pull request',
      description: `oppdaterte pull requesten <${html_url}|${title}>`,
      emoji: ':nut_and_bolt:',
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
};

const closedPullRequest = async (req) => {
  const { title, merged, base, html_url } = req.body.pull_request;

  const headline = merged ? 'Merget pull request' : 'Lukket pull request';

  const description = merged
    ? `merget pull requesten <${html_url}|${title}> inn i ${base.ref}`
    : `lukket pull requesten <${html_url}|${title}>`;

  const emoji = merged ? ':white_check_mark:' : ':no_entry_sign:';

  const text = GitHubTextBuilder.buildPullRequestText(
    {
      headline,
      description,
      emoji,
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
};

const reopenedPullRequest = async (req) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestText(
    {
      headline: 'Gjenåpnet pull request',
      description: `gjenåpnet pull requesten <${html_url}|${title}>`,
      emoji: ':recycle:',
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
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

  res.status(200).send('Posted to Slack successfully');
};

export default processPullRequestEvent;
