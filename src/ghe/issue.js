const processOpenedIssueEvent = (req, res) => {

};

const processUnhandledIssueEvent = (req, res) => {
  res.status(406).send(`I can't handle "${req.body.action}" actions for "${req.get('X-GitHub-Event')}" events :(`);
};

const processIssueEvent = (req, res) => {
  const action = req.body.action;

  switch (action) {
    case 'opened':
      processOpenedIssueEvent(req, res);
      break;
    default:
      processUnhandledIssueEvent(req, res);
      break;
  }
};

export default processIssueEvent;
