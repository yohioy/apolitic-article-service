const { Router } = require('express');

/* Controllers */
const articlesController = require('../controllers/ArticlesController');
const userArticleLogController = require('../controllers/UserArticleLogController');

const router = Router();

router.get('/articles', articlesController.getAll);

router.get(
  '/articles/:id',
  userArticleLogController.checkAccess,
  userArticleLogController.createUserLog,
  articlesController.getById
);

router.get('/health', (req, res) => {
  res.status(200).json({ healthy: true });
});
module.exports = router;
