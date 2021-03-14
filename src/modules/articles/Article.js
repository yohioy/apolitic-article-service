const ArticleModel = require('./article.model');

class Article {
  constructor() {
    this.model = ArticleModel;
  }

  /**
   *
   * @param {String} status
   * @returns {Object<Article>}
   */
  async getAll(status) {
    const filter = { articleStatus: String(status) };
    const response = await this.model.find(filter);
    return { total: response.length, data: response };
  }

  /**
   *
   * @param {String} id
   * @param {String} status
   * @returns {Object<Article>}
   */
  async getById(id, status) {
    const filter = { _id: String(id), articleStatus: String(status) };
    const data = this.model.find(filter);
    return { data: data };
  }

  /**
   *
   * @returns {Promise}
   */
  async createCollection() {
    return this.model.createCollection();
  }

  /**
   *
   * @returns {Promise}
   */
  async dropCollection() {
    return this.model.collection.drop();
  }

  /**
   *
   * @param {Array} articles
   * @returns {Array<Promise>}
   */
  async bulkCreate(articles) {
    return this.model.insertMany(articles);
  }

  /**
   *
   * @returns {Promise}
   */
  async removeAll() {
    return this.model.deleteMany({});
  }
}

module.exports = Article;
