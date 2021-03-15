const debug = require('debug')('app:tools:createBulkData');

const { lorem, name } = require('faker');
const mongoose = require('mongoose');
const Article = require('../src/modules/articles/Article');

const { uri, options } = require('../src/lib/mongoose/config');

const main = async () => {
  await mongoose.connect(uri, options);
  const article = new Article();

  let list = [];
  for (let i = 0; i < 100; i++) {
    const article = {
      title: lorem.sentence(),
      shortDescription: lorem.paragraph(),
      longDescription: lorem.paragraphs(),
      slug: lorem.slug(),
      author: name.firstName(),
      articleStatus: 1,
      publishedDate: Date.now(),
      createdDate: Date.now(),
    };

    list = [...list, article];
  }

  try {
    await article.bulkCreate(list);
    debug(`seeded successfully`);
  } catch (e) {
    debug(e);
    throw e;
  }
};

main().catch((err) => console.error(err));
