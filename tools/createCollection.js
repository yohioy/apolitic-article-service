const debug = require('debug')('app:tools:createCollection');

const mongoose = require('mongoose');
const Article = require('../src/modules/articles/Article');
const UserArticleLog = require('../src/modules/user_article_logs/UserArticleLog');

const { uri, options } = require('../src/lib/mongoose/config');

const main = async () => {
  await mongoose.connect(uri, options);
  const article = new Article();
  const userArticleLog = new UserArticleLog();

  try {
    await article.createCollection();
    debug(`created "article" collection`);
  } catch (e) {
    debug(e);
  }

  try {
    await userArticleLog.createCollection();
    debug(`created "user_article_logs" collection`);
  } catch (e) {
    debug(e);
  }
};

main().catch((err) => console.error(err));
