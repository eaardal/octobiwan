export const constructPullRequestText = (phrases, body) =>
  `${phrases.emoji} *<${body.pull_request.html_url}|${phrases.headline} pull request>*
  <${body.pull_request.user.html_url}|${body.pull_request.user.login}> ${phrases.action} pull request #${body.pull_request.number} ${body.pull_request.title} i <${
  body.repository.html_url}|${body.repository.full_name}>`;

export const constructClosedPullRequestText = (phrases, body) =>
  `${phrases.emoji} *<${body.pull_request.html_url}|${phrases.headline}>*
  <${body.pull_request.user.html_url}|${body.pull_request.user.login}> ${phrases.action}`;

export const constructIssueText = (phrases, body) =>
  `${phrases.emoji} *<${body.issue.html_url}|${phrases.headline} issue>*
  <${body.issue.user.html_url}|${body.issue.user.login}> ${phrases.action} issue #${body.issue.number} i <${
  body.repository.html_url}|${body.repository.full_name}>`;

export const constructPullRequestReviewText = (phrases, body) =>
  `${phrases.emoji} *<${body.pull_request.html_url}|${phrases.headline}>*
  <${body.review.user.html_url}|${body.review.user.login}> ${phrases.action} ${body.pull_request.title} i <${
  body.repository.html_url}|${body.repository.full_name}>`;

export const constructPullRequestReviewCommentText = (phrases, body) =>
  `${phrases.emoji} *<${body.pull_request.html_url}|${phrases.headline}>*
  <${body.review.user.html_url}|${body.review.user.login}> ${phrases.action} ${body.pull_request.title} i <${
  body.repository.html_url}|${body.repository.full_name}>`;
