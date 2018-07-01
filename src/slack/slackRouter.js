import createRouter from '../infrastructure/routerFactory';
import log from '../infrastructure/logger';

const { router, execute } = createRouter();

router.post(
  '/interactive',
  execute(async (req, res) => {
    try {
      log.info('request body', JSON.stringify(req.body, null, 2));

      res.status(200).json(`${req.body.user.name} ser på denne pull requesten nå`);
    } catch (error) {
      log.error('Error occurred', error);

      res.status(500).json({ error: error || 'Unknown error' });
    }
  }),
);

router.get('/hook', (req, res) => {
  res.send('<a href="https://github.com/eaardal/octobiwan">How to use the /github/hook API</a>');
});

export default router;
