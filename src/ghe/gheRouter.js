import createRouter from '../infrastructure/routerFactory';
import processIssueEvent from './issue';

const { router, execute } = createRouter();

const processUnhandledEvent = (req, res) => {
  res.status(406).send(`I can't handle "${req.get('X-GitHub-Event')}" events :(`);
};

router.post('/hook', execute(async (req, res) => {
  const eventType = req.get('X-GitHub-Event');

  switch (eventType) {
    case 'issues':
      processIssueEvent(req, res);
      break;
    default:
      processUnhandledEvent(req, res);
      break;
  }
}));

export default router;
