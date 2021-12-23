const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');

const OrgSchema = new Schema({
  id: { type: Number },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
});

module.exports = Organization = model('organization', OrgSchema);
