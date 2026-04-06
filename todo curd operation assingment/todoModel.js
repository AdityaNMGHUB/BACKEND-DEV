const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "Pending" }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
