class Article {
  constructor() {}

  /**
   *
   * @param {String} status
   * @returns {Object<Article>}
   */
  async getAll(status) {
    return { total: 0, data: {} };
  }

  /**
   *
   * @param {String} id
   * @param {String} status
   * @returns {Object<Article>}
   */
  async getById(id, status) {
    return { data: {} };
  }

  /**
   *
   * @returns {Promise}
   */
  async createCollection() {
    return {};
  }

  /**
   *
   * @returns {Promise}
   */
  async dropCollection() {
    return {};
  }

  /**
   *
   * @param {Array} articles
   * @returns {Array<Promise>}
   */
  async bulkCreate(articles) {
    return {};
  }

  /**
   *
   * @returns {Promise}
   */
  async removeAll() {
    return {};
  }
}

module.exports = Article;
