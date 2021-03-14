const mongoose = require('mongoose');
const { Schema } = mongoose;

const modelName = 'articles';

const articleSchema = new Schema({
  title: { type: String, required: true },
  shortDescription: String,
  longDescription: String,
  slug: String,
  author: String,
  articleStatus: { type: Number, required: true },
  publishedDate: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now },
});

let model;
try {
  model = mongoose.model(modelName);
} catch {
  model = mongoose.model(modelName, articleSchema);
}

module.exports = model;
