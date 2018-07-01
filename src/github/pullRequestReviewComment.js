import Slack from '../slack';
import GitHubTextBuilder from '../utils/GitHubTextBuilder';
import { processUnhandledEvent } from './common';
import { extractSlackWebHookOptions } from '../utils/requestUtils';

const createdPullRequestReviewComment = async (req) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestReviewCommentText(
    {
      headline: 'Kommentar i pull request diskusjon',
      description: `kommenterte i diskusjonen på pull requesten <${html_url}|${title}>`,
      emoji: ':thinking_face:',
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
};

const editedPullRequestReviewComment = async (req) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestReviewCommentText(
    {
      headline: 'Oppdatert kommentar i pull request diskusjon',
      description: `oppdaterte sin kommentar i diskusjonen på pull requesten <${html_url}|${title}>`,
      emoji: ':sweat_smile:',
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
};

const deletedPullRequestReviewComment = async (req) => {
  const { title, html_url } = req.body.pull_request;

  const text = GitHubTextBuilder.buildPullRequestReviewCommentText(
    {
      headline: 'Slettet kommentar i pull request diskusjon',
      description: `slettet sin kommentar i diskusjonen på pull requesten <${html_url}|${title}>`,
      emoji: ':grin:',
    },
    req.body,
  );

  const content = { text };
  const options = extractSlackWebHookOptions(req);

  await Slack.sendToWebHook(content, options);
};

const processPullRequestReviewEvent = async (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'created':
      await createdPullRequestReviewComment(req, res);
      break;
    case 'edited':
      await editedPullRequestReviewComment(req, res);
      break;
    case 'deleted':
      await deletedPullRequestReviewComment(req, res);
      break;
    default:
      processUnhandledEvent(req, res);
      break;
  }
};

export default processPullRequestReviewEvent;
