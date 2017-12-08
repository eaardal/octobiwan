import Slack, { constructPullRequestReviewCommentText } from '../slack';
import { processUnhandledEvent } from './common';

const createdPullRequestReviewComment = async (req, res) => {
  const text = constructPullRequestReviewCommentText({
    headline: 'Kommenterte på pull request',
    action: 'kommenterte på pull request',
    emoji: ':sparkles:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const editedPullRequestReviewComment = async (req, res) => {
  const text = constructPullRequestReviewCommentText({
    headline: 'Oppdaterte kommentaren på pull request',
    action: 'oppdaterte kommentaren på pull request',
    emoji: ':nut_and_bolt:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const deletedPullRequestReviewComment = async (req, res) => {
  const text = constructPullRequestReviewCommentText({
    headline: 'Slettet pull request review kommentar',
    action: 'slettet pull request review kommentar',
    emoji: ':no_entry_sign:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
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
