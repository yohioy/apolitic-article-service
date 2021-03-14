const debug = require('debug')('app:controllers:ArticlesController');

const Article = require('../modules/articles/Article');

class ArticlesController {
  async getAll(req, res) {
    debug(`get all articles`);
    const { logger } = req.app.locals;

    const article = new Article();

    let data;
    try {
      data = await article.getAll('1');
      debug(`total articles ${data.total}`);
      res.status(200).json(data);
    } catch (e) {
      debug(e);
      logger.error(e.message);
      res.status(400).json({ message: 'failed' });
    }
  }

  async getById(req, res) {
    debug(`get articles by ID`);
    const articleId = req.params.id;
    const { logger } = req.app.locals;
    const article = new Article();

    let data;
    try {
      data = await article.getById(articleId, '1');
      debug(`article id ${articleId}`);
      res.status(200).json(data);
    } catch (e) {
      debug(e);
      logger.error(e.message);
      res.status(400).json({ message: 'failed' });
    }
  }
}

module.exports = new ArticlesController();
