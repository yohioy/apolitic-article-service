const debug = require('debug')('app:tools:removeAll');

const mongoose = require('mongoose');
const UserArticleLog = require('../src/modules/user_article_logs/UserArticleLog');

const { uri, options } = require('../src/lib/mongoose/config');

const main = async () => {
  await mongoose.connect(uri, options);
  const userArticleLog = new UserArticleLog();

  try {
    await userArticleLog.removeAll();
    debug(`cleared all`);
  } catch (e) {
    debug(e);
    throw e;
  }
};

main().catch((err) => console.error(err));
