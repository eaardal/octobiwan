import createRouter from '../infrastructure/routerFactory';

const { router, execute } = createRouter();

router.post('/pull-request', execute(async (req, res) => {
  const body = req.body;

  

  res.json({ temp: 'orary' });
}));

export default router;
