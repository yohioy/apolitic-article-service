const UserArticleLogModel = require('./userArticleLog.model');

class UserArticleLog {
  constructor() {
    this.model = UserArticleLogModel;
  }

  /**
   *
   * @returns {Object<Promise>}
   */
  async removeAll() {
    return this.model.deleteMany({});
  }

  /**
   *
   * @param {Object} newData
   * @returns {Object<Promise>}
   */
  async createOrUpdate(newData) {
    const query = { guestId: newData.guestId };
    const update = { $set: newData };
    const options = { upsert: true };
    return this.model.updateOne(query, update, options);
  }

  /**
   *
   * @param {String} guestId
   * @returns {Object<Promise>}
   */
  async getByGuestId(guestId) {
    const filter = { guestId: String(guestId) };
    return this.model.findOne(filter);
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
}

module.exports = UserArticleLog;
