const User = require('../models/user');
const Todo = require('../models/todo');
const { findTaskWithinAweek, findTodaysTasks } = require('../utils/functions');

module.exports.index = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    const all = await Todo.find({ author: user.id });
    const done = await Todo.find({ isDone: true, author: user.id })
    res.render('user/show', { user, all, done });
}

module.exports.addNewTask = async (req, res) => {
    let todo = new Todo(req.body.task);
    const backURL = req.header('Referer') || `/user/${req.params.id}`;
    todo.author = req.params.id;
    await todo.save();
    req.flash('success', 'Task added successfully')
    res.redirect(`${backURL}`);
}

module.exports.editTask = async (req, res) => {
    const { task } = req.body;
    const { id, do_id } = req.params;
    const backURL = req.header('Referer') || `/user/${req.params.id}`;
    const todo = await Todo.findByIdAndUpdate(do_id, task);
    todo.save();
    req.flash('success', 'Task updated successfully')
    res.redirect(`${backURL}`);
}

module.exports.markTaskAsDoneorUndone = async (req, res) => {
    const todo = await Todo.findById(req.params.do_id);
    const backURL = req.header('Referer') || `/user/${req.params.id}`;
    todo.isDone = !todo.isDone
    todo.save();
    req.flash('success', 'It seems you have finishied a task, congratulations')
    res.redirect(`${backURL}`)
}

module.exports.deleteTask = async (req, res) => {
    const { do_id } = req.params;
    const backURL = req.header('Referer') || `/user/${req.params.id}`;
    await Todo.findByIdAndDelete(do_id);
    req.flash('success', 'Task deleted successfully')
    res.redirect(`${backURL}`);
}

module.exports.getTasksByGroupName = async (req, res) => {
    let { g } = req.query;
    const { id } = req.params;
    const user = await User.findById(id);
    const done = await Todo.find({ isDone: true, group: g, author: id })
    const todos = await Todo.find({ group: g, author: id });
    res.render('user/group', { todos, user, g, done });
}

module.exports.getTasksByDate = async (req, res) => {
    var { d } = req.query;
    const { id } = req.params;
    const user = await User.findById(id);
    const all = await Todo.find({ author: id })
    var g = 10;
    if (d == 'today') {
        const todos = all.filter(task => findTodaysTasks(task));
        g = d;
        const done = todos.filter(task => task.isDone == true);
        res.render('user/group', { todos, user, g, done })
    } else if (d == 'week') {
        const todos = all.filter(task => findTaskWithinAweek(task));
        g = d;
        const done = todos.filter(task => task.isDone == true);
        res.render('user/group', { todos, user, g, done });
    }
}