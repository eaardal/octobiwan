import Slack, { constructPullRequestReviewText } from '../slack';
import { processUnhandledEvent } from './common';

const submittedPullRequestReview = async (req, res) => {
  const text = constructPullRequestReviewText({
    headline: 'Kommenterte på pull request',
    action: 'kommenterte på pull request',
    emoji: ':sparkles:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const editedPullRequestReview = async (req, res) => {
  const text = constructPullRequestReviewText({
    headline: 'Oppdaterte kommentaren på pull request',
    action: 'oppdaterte kommentaren på pull request',
    emoji: ':nut_and_bolt:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
};

const dismissedPullRequestReview = async (req, res) => {
  const text = constructPullRequestReviewText({
    headline: 'Avsluttet pull request review',
    action: 'avsluttet pull request review',
    emoji: ':no_entry_sign:',
  }, req.body);

  await Slack.sendToWebHook(req, res, text);
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
      processUnhandledEvent(req, res);
      break;
  }
};

export default processPullRequestReviewEvent;
