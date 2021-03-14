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
   * @returns {Object<Promise>}
   */
  async getById(id, status) {
    return { data: {} };
  }
}

module.exports = Article;
