import createRouter from '../infrastructure/routerFactory';
import log from '../infrastructure/logger';
import processIssueEvent from './issue';

const { router, execute } = createRouter();

const processUnhandledEvent = (req, res) => {
  res.status(406).send(`I can't handle "${req.get('X-GitHub-Event')}" events :(`);
};

router.post(
  '/hook',
  execute(async (req, res) => {
    if (!req.query.slackHook) {
      res
        .status(400)
        .send(
          'Querystring parameter "slackHook" is required. It should be set to Webhook URL as provided in the Setup Instructions when configuring a new Incoming WebHook integration in Slack.',
        );
      return;
    }

    const eventType = req.get('X-GitHub-Event');

    try {
      switch (eventType) {
        case 'issues':
          await processIssueEvent(req, res);
          break;
        default:
          processUnhandledEvent(req, res);
          break;
      }
    } catch (error) {
      log.error('Error occurred', error);

      res.status(500).json({ error: error || 'Unknown error' });
    }
  }),
);

export default router;
