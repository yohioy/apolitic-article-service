const debug = require('debug')('app:tools:dropCollections');

const mongoose = require('mongoose');
const Article = require('../src/modules/articles/Article');
const UserArticleLog = require('../src/modules/user_article_logs/UserArticleLog');

const { uri, options } = require('../src/lib/mongoose/config');

const main = async () => {
  await mongoose.connect(uri, options);
  const article = new Article();
  const userArticleLog = new UserArticleLog();

  debug(`Start dropping collections. `);
  await article.dropCollection();
  await userArticleLog.dropCollection();
  debug(`Done.`);
};

main().catch((err) => console.error(err));
