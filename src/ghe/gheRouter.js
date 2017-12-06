import createRouter from '../infrastructure/routerFactory';

const { router, execute } = createRouter();

router.get('/', execute(async (req, res) => {
  res.json({ temp: 'orary' });
}));

export default router;
