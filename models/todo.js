const mongoose = require('mongoose');


const todoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    note: {
        type: String
    },
    group: {
        type: String,
        enum: ['personal', 'work', 'other'],
        default: 'other'
    },
    date: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDone: {
        type: Boolean,
        default: false
    }
})


todoSchema.query.todaytasks = function (date) {
    let now = new Date().toISOString().slice(0, 10);
    if ((date.slice(8) - now.slice(8)) === 1) { return this }
};

todoSchema.query.weektasks = function (date) {
    let now = new Date().toISOString().slice(0, 10);
    if ((date.slice(8) - now.slice(8)) >= 1 && (date.slice(8) - now.slice(8) <= 7)) { return this }
};

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;