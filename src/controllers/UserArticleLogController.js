const debug = require('debug')('app:controllers:UserAccessController');

const UserArticleLog = require('../modules/user_article_logs/UserArticleLog');

class UserArticleLogController {

  async createUserLog(req, res, next) {
    debug(`create user log`);

    const { logger, guestToken } = req.app.locals;
    const articleId = req.params.id;
    const userArticleLog = new UserArticleLog();

    const accessLog = await userArticleLog.getByGuestId(guestToken);

    let newViewedArticles = [];
    if (accessLog) {
      accessLog.viewedArticles.push(articleId);
      newViewedArticles = accessLog.viewedArticles;
    } else {
      newViewedArticles.push(articleId);
    }

    const newData = {
      guestId: guestToken,
      viewedArticles: newViewedArticles,
    };

    try {
      await userArticleLog.createOrUpdate(newData);
      debug(`update or create new access log`);
      next();
    } catch (e) {
      debug(e);
      res.status(400).json({ message: 'failed creating log' });
    }
  }
}

module.exports = new UserArticleLogController();
