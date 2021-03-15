const debug = require('debug')('app:tools:removeAll');

const mongoose = require('mongoose');
const Article = require('../src/modules/articles/Article');

const { uri, options } = require('../src/lib/mongoose/config');

const main = async () => {
  await mongoose.connect(uri, options);
  const article = new Article();

  try {
    await article.removeAll();
    debug(`cleared all`);
  } catch (e) {
    debug(e);
    throw e;
  }
};

main().catch((err) => console.error(err));
