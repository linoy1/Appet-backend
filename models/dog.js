const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const DogSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    breed: { type: String, required: true },
    age: { type: Number, required: true },
    organizationId: { type: Number, required: true },
    userId: { type: Number },
    status: { type: String },
    temperament: { type: String },
    lifespan: { type: String },
});

module.exports = Dog = model('dog', DogSchema);