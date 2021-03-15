const debug = require('debug')('app:controllers:UserAccessController');

const config = require('config');

const UserArticleLog = require('../modules/user_article_logs/UserArticleLog');

class UserArticleLogController {
  async createUserLog(req, res, next) {
    debug(`create user log`);

    const { logger, cookieTokens } = req.app.locals;
    const articleId = req.params.id;

    const CookieConfig = config.get('Cookies');
    const { cookieName } = CookieConfig.GuestToken;

    const userArticleLog = new UserArticleLog();

    const validCookie = cookieTokens.filter((item) => {
      return item.name === cookieName;
    });
    const guestId = validCookie[0].value;

    const accessLog = await userArticleLog.getByGuestId(guestId);
    debug(accessLog);

    let newViewedArticles = [];
    if (accessLog) {
      accessLog.viewedArticles.push(articleId);
      newViewedArticles = accessLog.viewedArticles;
    } else {
      newViewedArticles.push(articleId);
    }

    const newData = {
      guestId: guestId,
      viewedArticles: newViewedArticles,
    };

    try {
      await userArticleLog.createOrUpdate(newData);
      debug(`update or create new access log`);
      next();
    } catch (e) {
      debug(e);
      logger.error(e.message);
      res.status(400).json({ message: 'failed creating log' });
    }
  }

  async checkAccess(req, res, next) {
    debug(`check user access logs`);

    const { logger, cookieTokens } = req.app.locals;
    const CookieConfig = config.get('Cookies');
    const { cookieName } = CookieConfig.GuestToken;

    const userArticleLog = new UserArticleLog();

    if (cookieTokens.length === 0) {
      debug(`Cannot find token`);
      logger.error(`Cannot find token`);
      return res.status(400).json({ message: 'cannot find token' });
    }

    const validCookie = cookieTokens.filter((item) => {
      return item.name === cookieName;
    });
    const guestId = validCookie[0].value;

    let accessLog;
    try {
      accessLog = await userArticleLog.getByGuestId(guestId);

      if (accessLog) {
        if (accessLog.viewedArticles.length >= 3) {
          debug(`cannot view more articles`);
          res.status(400).json({ message: 'cannot view more articles' });
        } else {
          next();
        }
      } else {
        next();
      }
    } catch (e) {
      debug(e);
      logger.error(e.message);
      res.status(400).json({ message: 'failed' });
    }
  }
}

module.exports = new UserArticleLogController();
