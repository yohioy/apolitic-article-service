const mongoose = require('mongoose');
const { Schema } = mongoose;

const userArticleLogSchema = new Schema({
  guestId: { type: String, required: true },
  viewedArticles: { type: Array, required: true },
});

module.exports = mongoose.model('user_article_logs', userArticleLogSchema);
